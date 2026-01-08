import { useEffect, useState } from "react";
import { getUrls, createUrl, deleteUrl } from "../api";
import Swal from "sweetalert2";
import "../styles.css";

export default function Dashboard({ onLogout }) {
  const token = localStorage.getItem("token");
  const [urls, setUrls] = useState([]);
  const [input, setInput] = useState("");

  const load = async () => {
    const data = await getUrls(token);
    setUrls(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    const res = await createUrl(token, input);
    if (res.message) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.message,
        timer: 1200,
        showConfirmButton: false,
      });
    }
    setInput("");
    load();
  };

  const remove = async (id) => {
    await deleteUrl(token, id);
    load();
  };

  const logout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        onLogout();
      }
    });
  };

  return (
    <div style={{ padding: "40px" }}>
      <div className="card" style={{ maxWidth: "100%" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className="title">Dashboard</h2>

          {/* Beautiful Logout Button */}
          <button
            onClick={logout}
            style={{
              background: "var(--danger)",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* Input Section */}
        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <input
            className="input"
            style={{ flex: 1 }}
            placeholder="Paste long URL"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="button"
            style={{ width: "160px" }}
            onClick={submit}
          >
            Shorten
          </button>
        </div>

        {/* Table */}
        <table style={{ width: "100%", marginTop: "30px" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#6b7280" }}>
              <th style={{ paddingBottom: "10px" }}>Original</th>
              <th style={{ paddingBottom: "10px" }}>Short</th>
              <th style={{ paddingBottom: "10px" }}>Clicks</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {urls.map((u) => (
              <tr
                key={u._id}
                style={{
                  borderTop: "1px solid #eee",
                  height: "56px",
                }}
              >
                <td>{u.originalUrl}</td>
                <td>
                  <a
                    href={`http://localhost:5000/${u.shortCode}`}
                    target="_blank"
                  >
                    {u.shortCode}
                  </a>
                </td>
                <td>{u.clicks}</td>
                <td>
                  <span
                    style={{
                      color: "var(--danger)",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                    onClick={() => remove(u._id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
