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
  const [timezone, setTimezone] = useState<string>('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    website_url: '',
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
    if (!selectedSlot) return;

    setSubmitError('');
    setSubmitting(true);
    try {
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          start_time: selectedSlot.start,
        }),
      });

      let result: { status?: string; message?: string; error?: string; meet_link?: string } = {};
      const responseType = response.headers.get('content-type') || '';
      if (responseType.includes('application/json')) {
        result = await response.json();
      }

      if (response.ok && result.status === 'success') {
        navigate('/appointment-success', {
          state: {
            meetLink: result.meet_link || '',
          },
        });
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <textarea
                  placeholder="Website URL or briefly describe the current state of your codebase"
                  rows={4}
                  required
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                ></textarea>

                <button type="submit" className="confirm-btn" disabled={submitting}>
                  {submitting ? 'Confirming...' : 'Confirm Strategy Session'}
                </button>
                <p className="form-note">You will receive a Google Calendar invite with a Meet link.</p>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
