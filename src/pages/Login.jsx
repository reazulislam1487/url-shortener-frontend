import { useState } from "react";
import { login } from "../api";
import "../styles.css";

export default function Login({ goRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await login({ email, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      onLogin();
    } else {
      alert(res.message || "Login failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Login to your dashboard</p>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button" onClick={submit}>
          Login
        </button>

        <p className="link" onClick={goRegister}>
          Create an account
        </p>
      </div>
    </div>
  );
}
