import { useEffect, useState } from "react";
import { getUrls, createUrl, deleteUrl } from "../api";
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
    if (res.message) alert(res.message);
    setInput("");
    load();
  };

  const remove = async (id) => {
    await deleteUrl(token, id);
    load();
  };

  return (
    <div style={{ padding: "40px" }}>
      <div className="card" style={{ maxWidth: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className="title">Dashboard</h2>
          <p
            className="link"
            onClick={() => {
              localStorage.clear();
              onLogout();
            }}
          >
            Logout
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
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

        <table style={{ width: "100%", marginTop: "30px" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#6b7280" }}>
              <th>Original</th>
              <th>Short</th>
              <th>Clicks</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {urls.map((u) => (
              <tr key={u._id} style={{ borderTop: "1px solid #eee" }}>
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
                    style={{ color: "var(--danger)", cursor: "pointer" }}
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
