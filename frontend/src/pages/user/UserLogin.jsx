import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function UserLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/user/login", { name, password });
      localStorage.setItem("user_id", res.data.user_id);
      navigate("/user/dashboard");
    } catch {
      alert("User login failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>User Login</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}
