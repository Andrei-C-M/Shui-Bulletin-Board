import { Link } from "react-router-dom";
import MsgCard from "../../components/MsgCard/MsgCard";
import { useMessages } from "../../hooks/useMessages";
import "./flowPage.css";

function FlowPage() {
  const { messages, loading, error } = useMessages();

  return (
    <section className="page">
      {/* ---------- HEADER ---------- */}
      <header className="app-header">
        <h1 className="app-title">Shui Bulletin Board</h1>
        <Link to="/add" className="btn">+ Lägg till meddelande</Link>
      </header>

      {/* ---------- FEED ---------- */}
      <section className="feed">
        {loading && <p>Laddar meddelanden…</p>}
        {error && <p style={{ color: "red" }}>Fel: {error}</p>}
        {!loading && !error && messages.length === 0 && <p>Inga meddelanden ännu. Var först att posta!</p>}
        {!loading && !error && messages.map(msg => (
          <MsgCard key={msg.id || msg.messageId} message={msg} />
        ))}
      </section>
    </section>
  );
}

export default FlowPage;
