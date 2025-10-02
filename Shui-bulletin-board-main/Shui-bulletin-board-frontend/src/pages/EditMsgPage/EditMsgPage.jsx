import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateMessage } from "../../api/api";

export default function EditMsgPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { state } = useLocation();
  const preset = state?.message;

  const [username, setUsername] = useState(preset?.username || "");
  const [text, setText] = useState(preset?.text || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !text.trim()) return;
    try {
      setLoading(true);
      await updateMessage(id, username.trim(), text.trim());
      nav("/"); // tillbaks till flödet
    } catch (err) {
      console.error(err);
      alert("Kunde inte uppdatera meddelandet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "24px auto", padding: 16 }}>
      <h1>Redigera meddelande</h1>
      <p className="muted" style={{ marginTop: -6 }}>ID: {id}</p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <label>
          Användarnamn
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ditt namn"
          />
        </label>

        <label>
          Text
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Uppdatera ditt meddelande…"
          />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="submit"
            disabled={loading || !username.trim() || !text.trim()}
            className="btn"
          >
            {loading ? "Sparar…" : "Spara ändring"}
          </button>
          <button type="button" onClick={() => nav("/")} className="btn secondary">
            Avbryt
          </button>
        </div>
      </form>
    </div>
  );
}
