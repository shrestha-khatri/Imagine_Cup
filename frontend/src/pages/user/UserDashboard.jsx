import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h2>User Dashboard</h2>

      <button onClick={() => navigate("/user/hospitals")}>
        View Hospitals
      </button>

      <br /><br />

      <button onClick={() => navigate("/user/my-beds")}>
        My Bed Bookings
      </button>

      <br /><br />

      <button onClick={() => navigate("/user/my-appointments")}>
        My Appointments
      </button>
    </div>
  );
}
