import { useState } from "react";
import { register } from "../api";
import "../styles.css";

export default function Register({ goLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await register({ email, password });
    if (res.message) {
      alert("Registered. Now login.");
      goLogin();
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Start shortening links</p>

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
          Register
        </button>

        <p className="link" onClick={goLogin}>
          Back to login
        </p>
      </div>
    </div>
  );
}
