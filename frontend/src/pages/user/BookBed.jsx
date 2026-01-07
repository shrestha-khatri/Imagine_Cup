import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [beds, setBeds] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    api.get("/hospitals/beds").then(res => setBeds(res.data));
    api.get("/hospitals/specialists").then(res => setSpecialists(res.data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>User Dashboard</h2>

      <h3>Hospitals & Beds</h3>
      {beds.map(b => (
        <div key={b.id}>
          Hospital {b.hospital_id} — Available: {b.available_beds}
          <button onClick={() => navigate("/user/book-bed")}>Book Bed</button>
        </div>
      ))}

      <h3>Specialists</h3>
      {specialists.map(s => (
        <div key={s.id}>
          {s.name} ({s.specialty}) — {s.timing}
          <button onClick={() => navigate(`/user/book-appointment/${s.id}`)}>
            Book Appointment
          </button>
        </div>
      ))}

      <br />
      <button onClick={() => navigate("/user/my-beds")}>My Bed Bookings</button>
      <button onClick={() => navigate("/user/my-appointments")}>My Appointments</button>
    </div>
  );
}
