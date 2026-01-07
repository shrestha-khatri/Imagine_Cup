import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function HospitalDetails() {
  const { hospitalId } = useParams();
  const navigate = useNavigate();

  const [opds, setOpds] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    api.get("/hospitals/opd").then(res =>
      setOpds(res.data.filter(o => o.hospital_id == hospitalId))
    );

    api.get("/hospitals/equipment").then(res =>
      setEquipment(res.data.filter(e => e.hospital_id == hospitalId))
    );

    api.get("/hospitals/specialists").then(res =>
      setSpecialists(res.data.filter(s => s.hospital_id == hospitalId))
    );
  }, [hospitalId]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Hospital Details</h2>

      <h3>OPD Queue</h3>
      {opds.map(o => (
        <p key={o.id}>
          {o.department} — Queue: {o.queue_length}
        </p>
      ))}

      <h3>Equipment</h3>
      {equipment.map(e => (
        <p key={e.id}>
          {e.name} — Quantity: {e.quantity}
        </p>
      ))}

      <h3>Specialists</h3>
      {specialists.map(s => (
        <div key={s.id}>
          <p>
            {s.name} ({s.specialty}) — {s.timing}
          </p>
          <button
            onClick={() => navigate(`/user/book-appointment/${s.id}`)}
          >
            Book Appointment
          </button>
        </div>
      ))}

      <br />
      <button onClick={() => navigate("/user/book-bed")}>
        Book Bed
      </button>
    </div>
  );
}
