import { useEffect, useState } from "react";
import { fetchUserMessages } from "../api/api";

export function useMessages(username) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserMessages(username)
            .then(data => {
                setMessages(data);
                setLoading(false);
            });
    }, [username]);

    return { messages, loading };
}