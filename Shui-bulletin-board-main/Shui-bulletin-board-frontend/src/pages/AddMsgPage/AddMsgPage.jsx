// src/pages/AddMsgPage/AddMsgPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMessage } from "../../api/api";

export default function AddMsgPage() {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !text.trim()) return;
    try {
      setLoading(true);
      await addMessage(username.trim(), text.trim());
      nav("/"); // back to feed
    } catch (e) {
      console.error(e);
      alert("Kunde inte spara meddelandet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "24px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 16 }}>Lägg till meddelande</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Användarnamn
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            placeholder="Ditt namn"
          />
        </label>

        <label>
          Text
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4, minHeight: 120 }}
            placeholder="Skriv ditt meddelande…"
          />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="submit"
            disabled={loading || !username.trim() || !text.trim()}
            style={{ padding: "10px 14px", borderRadius: 8 }}
          >
            {loading ? "Sparar…" : "Publicera"}
          </button>
          <button type="button" onClick={() => nav("/")} style={{ padding: "10px 14px", borderRadius: 8 }}>
            Avbryt
          </button>
        </div>
      </form>
    </div>
  );
}
