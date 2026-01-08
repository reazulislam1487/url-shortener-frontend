import { useState } from "react";
import Swal from "sweetalert2";
import { register } from "../api";
import "../styles.css";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Register({ goLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email.trim() || !password.trim()) {
      return Swal.fire("Invalid Input", "All fields are required", "error");
    }

    if (!isValidEmail(email)) {
      return Swal.fire("Invalid Email", "Enter a valid email address", "error");
    }

    if (password.length < 6) {
      return Swal.fire(
        "Weak Password",
        "Minimum 6 characters required",
        "error"
      );
    }

    try {
      setLoading(true);
      await register({ email, password });

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Please login to continue",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(goLogin, 1500);
    } catch (err) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 409) {
        Swal.fire("User Exists", "Email already registered", "warning");
      } else if (status === 400) {
        Swal.fire("Registration Failed", message, "error");
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Start shortening links</p>

        <input
          className="input"
          type="email"
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

        <button className="button" onClick={submit} disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="link" onClick={goLogin}>
          Back to login
        </p>
      </div>
    </div>
  );
}
