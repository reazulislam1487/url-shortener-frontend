import { useState } from "react";
import Swal from "sweetalert2";
import { login } from "../api";
import "../styles.css";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Login({ goRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !password) {
      return Swal.fire("Invalid Input", "All fields are required", "error");
    }

    if (!isValidEmail(email)) {
      return Swal.fire(
        "Invalid Email",
        "Please enter a valid email address",
        "error"
      );
    }

    try {
      setLoading(true);
      const res = await login({ email, password });

      if (!res?.token) {
        throw new Error(res?.message || "Invalid email or password");
      }

      localStorage.setItem("token", res.token);

      Swal.fire({
        icon: "success",
        title: "Login Successful ",
        timer: 1200,
        showConfirmButton: false,
      });

      setTimeout(onLogin, 1200);
    } catch (err) {
      Swal.fire(
        "Login Failed",
        err?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="button"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="link" onClick={goRegister}>
          Create an account
        </p>
      </div>
    </div>
  );
}
