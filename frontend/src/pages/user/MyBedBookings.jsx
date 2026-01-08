import { useState } from "react";
import api from "../../api/api";
import '../../CSS/MyBedBookings.css';

export default function BookBed() {
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, loading, success, error
  const userId = localStorage.getItem("user_id");
  const hospitalId = 1;

  const book = async () => {
    if (!userId) {
      setBookingStatus('error');
      return;
    }

    setBookingStatus('loading');
    try {
      await api.post(`/hospital/${hospitalId}/bed-book`, { user_id: userId });
      setBookingStatus('success');
      setTimeout(() => {
        window.history.back(); // Go back to previous page
      }, 2000);
    } catch (error) {
      setBookingStatus('error');
      setTimeout(() => setBookingStatus('idle'), 3000);
    }
  };

  const getHospitalInfo = () => ({
    id: hospitalId,
    name: `City Hospital ${hospitalId}`,
    address: 'Mumbai Central, Maharashtra',
    availableBeds: 45,
    totalBeds: 120
  });

  const hospital = getHospitalInfo();

  return (
    <div className="bookbed-page">
      <div className="bookbed-container">
        <header className="bookbed-header">
          <div className="hospital-badge">
            <span className="hospital-icon">🏥</span>
            <span className="hospital-id">Hospital #{hospital.id}</span>
          </div>
          <h1 className="bookbed-title">Book Bed</h1>
          <p className="bookbed-subtitle">Confirm your bed reservation</p>
        </header>

        <div className="booking-card">
          <div className="booking-details">
            <div className="detail-row">
              <span className="detail-label">Hospital</span>
              <span className="detail-value">{hospital.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Location</span>
              <span className="detail-value">{hospital.address}</span>
            </div>
            <div className="detail-row highlight">
              <span className="detail-label">Beds Available</span>
              <span className="detail-value">{hospital.availableBeds}/{hospital.totalBeds}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Patient ID</span>
              <span className="detail-value">{userId || 'Not logged in'}</span>
            </div>
          </div>

          <div className="booking-actions">
            <button 
              className={`confirm-button ${bookingStatus}`}
              onClick={book}
              disabled={bookingStatus === 'loading' || !userId}
            >
              {bookingStatus === 'loading' ? (
                <>
                  <span className="spinner"></span>
                  Booking Bed...
                </>
              ) : bookingStatus === 'success' ? (
                <>
                  <span className="checkmark">✓</span>
                  Booking Confirmed!
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>

          {bookingStatus === 'error' && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              Please login first or try again
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
