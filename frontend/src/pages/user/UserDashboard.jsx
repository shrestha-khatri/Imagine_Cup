import { useNavigate } from "react-router-dom";
import '../../CSS/UserDashboard.css';

export default function UserDashboard() {
  const navigate = useNavigate();

  const features = [
    {
      id: 'hospitals',
      title: 'View Hospitals',
      description: 'Find available hospitals near you',
      icon: '🏥',
      color: 'orange',
      path: '/user/hospitals'
    },
    {
      id: 'beds',
      title: 'My Bed Bookings',
      description: 'Manage your bed reservations',
      icon: '🛏️',
      color: 'green',
      path: '/user/my-beds'
    },
    {
      id: 'appointments',
      title: 'My Appointments',
      description: 'View and manage appointments',
      icon: '📅',
      color: 'blue',
      path: '/user/my-appointments'
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="user-avatar">👤</div>
          <div className="header-content">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back! Choose what you'd like to do</p>
          </div>
        </header>

        <div className="features-grid">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className={`feature-card ${feature.color}-card`}
              onClick={() => navigate(feature.path)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
