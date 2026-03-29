import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './AppointmentSuccess.css';

type SuccessPayload = {
  first_name?: string;
  meeting_time?: string;
  meet_link?: string;
};

const AppointmentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [payload, setPayload] = useState<SuccessPayload | null>(null);

  const token = useMemo(() => searchParams.get('token') || '', [searchParams]);

  useEffect(() => {
    if (!token) {
      navigate('/schedule', { replace: true });
      return;
    }

    const run = async () => {
      try {
        const response = await fetch(`/api/booking/success/${encodeURIComponent(token)}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Cache-Control': 'no-store',
          },
        });

        const result: { status?: string; data?: SuccessPayload; message?: string } = await response.json();

        if (!response.ok || result.status !== 'success' || !result.data) {
          setError(result.message || 'Invalid or expired success session.');
          return;
        }

        setPayload(result.data);
      } catch {
        setError('Unable to validate booking session. Please check your email for meeting details.');
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [navigate, token]);

  if (loading) {
    return (
      <div className="appointment-success-container">
        <div className="success-content">
          <h1>Validating your booking...</h1>
          <p className="subtitle">Please wait while we verify your secure session.</p>
        </div>
      </div>
    );
  }

  if (error || !payload) {
    return (
      <div className="appointment-success-container">
        <div className="success-content">
          <h1>Session Invalid</h1>
          <p className="subtitle">{error || 'This success page can only be opened after a valid booking.'}</p>
          <div className="action-buttons">
            <Link to="/schedule" className="success-btn primary">Book a Session</Link>
            <Link to="/" className="success-btn secondary">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const meetLink = payload.meet_link || '';

  return (
    <div className="appointment-success-container">
      <div className="success-content">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor" />
          </svg>
        </div>
        <h1>Booking Confirmed!</h1>
        <p className="subtitle">
          We've received your appointment request{payload.first_name ? `, ${payload.first_name}` : ''}. Our team is excited to discuss your project rescue goals.
        </p>
        
        <div className="info-card">
          <h3>What happens next?</h3>
          <ul>
            <li>You should receive a confirmation email from Google Calendar.</li>
            <li>A senior architect from BKX Labs will join the call at the scheduled time.</li>
            <li>Have your codebase or technical documentation ready if applicable.</li>
          </ul>
        </div>

        {meetLink ? (
          <div className="meet-link-card">
            <p>If your email is delayed, you can still join directly:</p>
            <a href={meetLink} target="_blank" rel="noreferrer" className="success-btn primary">Open Google Meet Link</a>
          </div>
        ) : null}

        <div className="action-buttons">
          <Link to="/" className="success-btn primary">Back to Home</Link>
          <Link to="/process" className="success-btn secondary">Our Process</Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSuccess;
