import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function UserRegister() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await api.post("/user/register", { name, password });
      navigate("/user/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>User Register</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={register}>Register</button>
    </div>
  );
}