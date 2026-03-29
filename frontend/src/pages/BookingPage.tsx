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
    try {
      const response = await fetch('/api/booking/slots');
      const data: SlotsResponse = await response.json();
      setSlotsData(data.slots);
      
      const dates = Object.keys(data.slots);
      if (dates.length > 0) {
        setSelectedDate(dates[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setLoading(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

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

      const result = await response.json();
      if (result.status === 'success') {
        navigate('/appointment-success');
      } else {
        alert('Booking failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('An error occurred during booking.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="booking-loader">
        <div className="spinner"></div>
        <p>Checking availability...</p>
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

  return (
    <div id="bkx-booking-portal" className="booking-container">
      <div className="booking-header">
        <span className="booking-kicker">Limited weekly slots</span>
        <h1>Schedule a Strategy Session</h1>
        <p>Pick a time that works for you. All meetings include a Google Meet link sent to your email.</p>
        <div className="booking-meta">
          <div className="meta-item">
            <span className="meta-label">Selected Date</span>
            <strong>{selectedDateLabel}</strong>
          </div>
          <div className="meta-item">
            <span className="meta-label">Session Length</span>
            <strong>15 minutes</strong>
          </div>
        </div>
      </div>

      <div className="booking-layout">
        {/* Date Selection */}
        <div className="date-selector selector-card">
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
        </div>

        {/* Time Selection */}
        <div className="time-selector selector-card">
          <h3>2. Select a Time Slot (15 mins)</h3>
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
        </div>

        {/* Lead Form */}
        <div className={`form-section ${selectedSlot ? 'visible' : ''}`}>
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
              placeholder="Website URL or briefly describe the current state of your codebase:"
              rows={4}
              required
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
            ></textarea>

            <button type="submit" className="confirm-btn" disabled={submitting}>
              {submitting ? 'Confirming...' : 'Confirm Strategy Session'}
            </button>
            <p className="form-note">By confirming, you will receive a Google Calendar invite with a Meet link.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
