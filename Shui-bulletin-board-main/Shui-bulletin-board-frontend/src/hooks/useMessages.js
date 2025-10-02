// src/hooks/useMessages.js
import { useEffect, useState } from "react";
import { fetchMessages } from "../api/api";

export function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchMessages(); 
        // data is either { success, messages } or already an array, depending on backend
        const payload = Array.isArray(data) ? data : (data?.messages ?? []);
        const normalized = payload.map(m => ({
          id: m.id || m.messageId,         // normalize id
          messageId: m.messageId || m.id,  // keep original too
          username: m.username ?? "Okänd",
          text: m.text ?? "",
          createdAt: m.createdAt ?? m.created_at ?? null,
          modifiedAt: m.modifiedAt ?? null,
        }));
        if (alive) {
          setMessages(normalized);
          setError(null);
        }
      } catch (e) {
        if (alive) setError(e.message || "Kunde inte hämta meddelanden");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return { messages, loading, error };
}
