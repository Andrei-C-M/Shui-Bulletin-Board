// src/api/api.js
const API_URL = import.meta.env.VITE_API_URL;

async function jsonOrThrow(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export async function fetchMessages() {
  const json = await jsonOrThrow(await fetch(`${API_URL}/messages`));
  return json.data; // <-- unwrap
}

export async function fetchUserMessages(username) {
  const json = await jsonOrThrow(await fetch(`${API_URL}/messages/${encodeURIComponent(username)}`));
  return json.data; // <-- unwrap
}

export async function addMessage(username, text) {
  const json = await jsonOrThrow(
    await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, text }),
    })
  );
  return json.data; // <-- unwrap
}

export async function updateMessage(id, username, text) {
  const json = await jsonOrThrow(
    await fetch(`${API_URL}/messages/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, text }),
    })
  );
  return json.data; // <-- unwrap
}
