import { useState } from "react";
import { register } from "../api";

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
    <div className="box">
      <h2>Register</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submit}>Register</button>
      <p onClick={goLogin}>Back to login</p>
    </div>
  );
}
