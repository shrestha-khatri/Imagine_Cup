import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import '../../CSS/HospitalDashboard.css';

export default function HospitalDashboard() {
  const hospitalId = localStorage.getItem("hospital_id");
  const navigate = useNavigate();
  const [beds, setBeds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hospitalId) {
      navigate("/hospital/login");
      return;
    }

    const fetchBeds = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/hospitals/beds");
        const hospitalBeds = res.data.find(b => b.hospital_id == hospitalId);
        setBeds(hospitalBeds);
      } catch (err) {
        console.error("Beds API Error:", err);
        setError("Failed to load bed data. Server error (500). Check backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchBeds();
  }, [hospitalId, navigate]);

  if (loading) {
    return (
      <div className="hospital-dashboard-page">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p className="loading-text">Loading hospital dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hospital-dashboard-page" id="hospitalDashboardPage">
      <div className="hospital-dashboard-container" id="hospitalDashboardContainer">
        {error && (
          <div className="error-banner" role="alert">
            <div className="error-icon">⚠️</div>
            <div>
              <h3>Server Error</h3>
              <p>{error}</p>
              <button 
                className="retry-btn" 
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </div>
        )}
        {/* Rest of your JSX remains the same */}
        <header className="dashboard-header" id="hospitalHeader">
          {/* ... existing header code ... */}
        </header>
        {/* ... rest of component ... */}
      </div>
    </div>
  );
}
