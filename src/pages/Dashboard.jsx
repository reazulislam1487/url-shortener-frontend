import { useEffect, useState } from "react";
import { getUrls, createUrl, deleteUrl } from "../api";

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
    <div className="box">
      <h2>Dashboard</h2>
      <button
        onClick={() => {
          localStorage.clear();
          onLogout();
        }}
      >
        Logout
      </button>

      <input
        placeholder="Paste long URL"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={submit}>Shorten</button>

      <table>
        <thead>
          <tr>
            <th>Original</th>
            <th>Short</th>
            <th>Clicks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((u) => (
            <tr key={u._id}>
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
                <button onClick={() => remove(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
