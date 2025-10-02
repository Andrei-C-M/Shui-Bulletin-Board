import { Link } from "react-router-dom";

export default function MsgCard({ message }) {
  if (!message) return null;
  const { messageId, id, username = "Okänd", text = "", createdAt } = message;
  const mid = messageId || id;

  return (
    <article className="msg-card">
      <header className="msg-meta">
        <strong>{username}</strong>
        {createdAt && <span className="msg-date">{createdAt}</span>}
      </header>

      <p className="msg-text">{text}</p>

      <div style={{ marginTop: 12 }}>
        <Link
          to={`/edit/${mid}`}
          state={{ message }}
          className="btn secondary"
        >
          Redigera
        </Link>
      </div>
    </article>
  );
}
