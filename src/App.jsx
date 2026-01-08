import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "dashboard" : "login"
  );

  if (page === "login")
    return (
      <Login
        goRegister={() => setPage("register")}
        onLogin={() => setPage("dashboard")}
      />
    );

  if (page === "register") return <Register goLogin={() => setPage("login")} />;

  return <Dashboard onLogout={() => setPage("login")} />;
}
