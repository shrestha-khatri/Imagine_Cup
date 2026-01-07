import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function HospitalLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/hospital/login", { name, password });
      localStorage.setItem("hospital_id", res.data.hospital_id);
      navigate("/hospital/dashboard");
    } catch {
      alert("Hospital login failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Hospital Login</h2>

      <input placeholder="Hospital Name" onChange={e => setName(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}
