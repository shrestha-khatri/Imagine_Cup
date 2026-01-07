import { useEffect, useState } from "react";
import api from "../../api/api";

export default function MyAppointments() {
  const userId = localStorage.getItem("user_id");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get(`/user/${userId}/appointments`).then(res => setAppointments(res.data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>My Appointments</h2>
      {appointments.map(a => (
        <div key={a.id}>
          Specialist {a.specialist_id} — Status: {a.status}
        </div>
      ))}
    </div>
  );
}
