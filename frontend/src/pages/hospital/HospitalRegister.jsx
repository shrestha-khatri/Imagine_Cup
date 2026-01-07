import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function HospitalRegister() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    if (!name || !latitude || !longitude || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/hospital/register", {
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        password,
      });

      alert("Hospital registered successfully!");
      navigate("/hospital/login");
    } catch (err) {
      alert("Registration failed. Hospital may already exist.");
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: "auto" }}>
      <h2>Hospital Registration</h2>

      <input
        placeholder="Hospital Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={register}>Register Hospital</button>
    </div>
  );
}
