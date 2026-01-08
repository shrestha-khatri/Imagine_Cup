import { useState } from "react";
import api from "../../api/api";

export default function ManageSpecialists() {
  const hospitalId = localStorage.getItem("hospital_id");
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [timing, setTiming] = useState("");

  const addSpecialist = async () => {
    try {
      await api.post(`/hospital/${hospitalId}/specialist`, {
        name,
        specialty,
        timing,
      });
      alert("Specialist added successfully");
      setName("");
      setSpecialty("");
      setTiming("");
    } catch {
      alert("Failed to add specialist");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Manage Specialists</h2>

      <input
        placeholder="Doctor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Specialty (e.g. Cardiology)"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Timing (e.g. 10AM - 2PM)"
        value={timing}
        onChange={(e) => setTiming(e.target.value)}
      />
      <br /><br />

      <button onClick={addSpecialist}>Add Specialist</button>
    </div>
  );
}
