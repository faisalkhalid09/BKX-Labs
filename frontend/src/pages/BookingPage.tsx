import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';

interface Slot {
  start: string;
  end: string;
  time_label: string;
}

interface SlotsResponse {
  slots: Record<string, Slot[]>;
  timezone: string;
}

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [slotsData, setSlotsData] = useState<Record<string, Slot[]>>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [slotsError, setSlotsError] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string>('');
  const [verificationMessage, setVerificationMessage] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [codeSending, setCodeSending] = useState(false);
  const [codeVerifying, setCodeVerifying] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [timezone, setTimezone] = useState<string>('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    website_url: '',
    codebase_state: '',
  });

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    setSlotsError('');
    try {
      const response = await fetch('/api/booking/slots');
      if (!response.ok) {
        throw new Error('Unable to load time slots right now. Please refresh or contact support.');
      }

      const data: SlotsResponse = await response.json();
      setSlotsData(data.slots);
      setTimezone(data.timezone || '');
      
      const dates = Object.keys(data.slots);
      if (dates.length > 0) {
        setSelectedDate(dates[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setSlotsError('Unable to load available slots right now. Please try again in a few minutes.');
      setLoading(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !emailVerified) return;

    setSubmitError('');
    setSubmitting(true);
    try {
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          start_time: selectedSlot.start,
        }),
      });

      let result: { status?: string; message?: string; error?: string; success_token?: string } = {};
      const responseType = response.headers.get('content-type') || '';
      if (responseType.includes('application/json')) {
        result = await response.json();
      }

      if (response.ok && result.status === 'success' && result.success_token) {
        navigate(`/appointment-success?token=${encodeURIComponent(result.success_token)}`);
      } else {
        setSubmitError(result.message || 'Booking could not be completed right now. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setSubmitError('Network error while booking. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const sendVerificationCode = async () => {
    if (!formData.email) {
      setVerificationError('Enter your email first.');
      return;
    }

    setVerificationError('');
    setVerificationMessage('');
    setCodeSending(true);

    try {
      const response = await fetch('/api/booking/email/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email }),
      });

      const result: { status?: string; message?: string } = await response.json();

      if (!response.ok || result.status !== 'success') {
        setVerificationError(result.message || 'Could not send code. Try again.');
        return;
      }

      setCodeSent(true);
      setVerificationMessage('Verification code sent. Please check your inbox.');
    } catch {
      setVerificationError('Network error while sending code. Please try again.');
    } finally {
      setCodeSending(false);
    }
  };

  const verifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setVerificationError('Enter the 6-digit code sent to your email.');
      return;
    }

    setVerificationError('');
    setVerificationMessage('');
    setCodeVerifying(true);

    try {
      const response = await fetch('/api/booking/email/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email, code: verificationCode }),
      });

      const result: { status?: string; message?: string } = await response.json();

      if (!response.ok || result.status !== 'success') {
        setVerificationError(result.message || 'Invalid code. Please try again.');
        return;
      }

      setEmailVerified(true);
      setCodeSent(false);
      setVerificationCode('');
      setVerificationMessage('Email verified. You can proceed to booking.');
    } catch {
      setVerificationError('Network error while verifying code. Please try again.');
    } finally {
      setCodeVerifying(false);
    }
  };

  if (loading) {
    return (
      <div id="bkx-booking-portal" className="booking-page">
        <div className="booking-loader">
          <div className="loader-card">
            <div className="spinner"></div>
            <p className="loader-title">Checking availability...</p>
            <p className="loader-subtitle">Fetching open slots...</p>
          </div>
        </div>
      </div>
    );
  }

  const availableDates = Object.keys(slotsData);
  const selectedDateLabel = selectedDate
    ? new Date(selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    : 'Choose a date to begin';
  const selectedTimeLabel = selectedSlot ? selectedSlot.time_label : 'Select a time slot';

  return (
    <div id="bkx-booking-portal" className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>Schedule a Strategy Session</h1>
          <p>Pick a time that works for you and confirm your details. A Google Meet link is shared automatically after booking.</p>
        </div>

        {submitError ? (
          <div className="booking-alert error" role="alert">
            <strong>Booking failed.</strong> {submitError}
          </div>
        ) : null}

        {slotsError ? (
          <div className="booking-alert error" role="alert">
            <strong>Availability error.</strong> {slotsError}
          </div>
        ) : null}

        <div className="booking-layout">
          <aside className="booking-summary">
            <div className="summary-card">
              <h2>Your Session</h2>
              <ul className="summary-steps">
                <li className={selectedDate ? 'done' : 'active'}>1. Choose date</li>
                <li className={selectedSlot ? 'done' : ''}>2. Select time</li>
                <li className={selectedSlot ? 'active' : ''}>3. Confirm details</li>
              </ul>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Date</span>
                  <strong>{selectedDateLabel}</strong>
                </div>
                <div className="summary-row">
                  <span>Time</span>
                  <strong>{selectedTimeLabel}</strong>
                </div>
                <div className="summary-row">
                  <span>Duration</span>
                  <strong>15 mins</strong>
                </div>
                {timezone ? (
                  <div className="summary-row">
                    <span>Timezone</span>
                    <strong>{timezone}</strong>
                  </div>
                ) : null}
              </div>
            </div>
          </aside>

          <div className="booking-main">
            <section className="booking-panel date-selector">
              <h3>1. Choose a Date</h3>
              <div className="date-grid">
                {availableDates.map((date) => {
                  const dateObj = new Date(date);
                  const isSelected = date === selectedDate;
                  return (
                    <button
                      key={date}
                      className={`date-card ${isSelected ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedSlot(null);
                      }}
                    >
                      <span className="day-name">{dateObj.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                      <span className="day-number">{dateObj.getDate()}</span>
                      <span className="month-name">{dateObj.toLocaleDateString('en-US', { month: 'short' })}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="booking-panel time-selector">
              <h3>2. Select a Time Slot</h3>
              {selectedDate && slotsData[selectedDate] ? (
                <div className="time-grid">
                  {slotsData[selectedDate].map((slot, index) => (
                    <button
                      key={index}
                      className={`time-slot ${selectedSlot === slot ? 'active' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot.time_label}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="no-slots">No slots available for this date.</p>
              )}
            </section>

            <section className={`booking-panel form-section ${selectedSlot ? 'visible' : ''}`}>
              <h3>3. Your Details</h3>
              <form onSubmit={handleBooking} className="booking-form">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    const email = e.target.value;
                    setFormData({ ...formData, email });
                    setEmailVerified(false);
                    setCodeSent(false);
                    setVerificationCode('');
                    setVerificationError('');
                    setVerificationMessage('');
                  }}
                />

                {!emailVerified ? (
                  <div className="email-verify-card">
                    <div className="email-verify-top">
                      <p>Verify your email before booking.</p>
                      <button
                        type="button"
                        className="inline-verify-btn"
                        onClick={sendVerificationCode}
                        disabled={codeSending}
                      >
                        {codeSending ? 'Sending...' : 'Send Code'}
                      </button>
                    </div>

                    {codeSent ? (
                      <div className="verify-code-row">
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={6}
                          placeholder="Enter 6-digit code"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                        />
                        <button
                          type="button"
                          className="inline-verify-btn"
                          onClick={verifyCode}
                          disabled={codeVerifying}
                        >
                          {codeVerifying ? 'Verifying...' : 'Verify'}
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="email-verified-badge">Email verified. You can continue.</div>
                )}

                <textarea
                  placeholder="Website URL or briefly describe the current state of your codebase"
                  rows={4}
                  required
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                ></textarea>
                <textarea
                  placeholder="Additional codebase notes (optional)"
                  rows={3}
                  value={formData.codebase_state}
                  onChange={(e) => setFormData({ ...formData, codebase_state: e.target.value })}
                ></textarea>

                {verificationMessage ? <p className="verify-message">{verificationMessage}</p> : null}
                {verificationError ? <p className="verify-error">{verificationError}</p> : null}

                <button type="submit" className="confirm-btn" disabled={submitting || !emailVerified}>
                  {submitting ? 'Confirming...' : 'Confirm Strategy Session'}
                </button>
                <p className="form-note">You will receive a Google Calendar invite with a Meet link after successful verification.</p>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
