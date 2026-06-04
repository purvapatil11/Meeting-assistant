"use client";

import { useState, useEffect } from "react";
import { useRoomContext } from "@livekit/components-react";
import { RoomEvent } from "livekit-client";

export default function ChatPanel() {
  const room = useRoomContext();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  // receive messages
  useEffect(() => {
    const handleMessage = (payload: Uint8Array) => {
      const text = new TextDecoder().decode(payload);

      setMessages((prev) => [...prev, text]);
    };

    room.on(RoomEvent.DataReceived, handleMessage);

    return () => {
      room.off(RoomEvent.DataReceived, handleMessage);
    };
  }, [room]);

  // send message
  const sendMessage = async () => {
    if (!message.trim()) return;

    const encoder = new TextEncoder();

    await room.localParticipant.publishData(
      encoder.encode(message),
      {
        reliable: true,
      }
    );

    setMessage("");
  };

  return (
    <div>
      <h3>Chat</h3>

      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}