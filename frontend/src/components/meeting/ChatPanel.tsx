"use client";

import { useState, useEffect } from "react";
import { useRoomContext } from "@livekit/components-react";
import { RoomEvent } from "livekit-client";

type ChatMessage = {
  sender: string;
  text: string;
  timestamp: string;
};

export default function ChatPanel() {
  const room = useRoomContext();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Receive messages
  useEffect(() => {
    const handleMessage = (payload: Uint8Array) => {
      try {
        const decoded = new TextDecoder().decode(payload);

        const chatMessage: ChatMessage = JSON.parse(decoded);

        setMessages((prev) => [...prev, chatMessage]);
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };

    room.on(RoomEvent.DataReceived, handleMessage);

    return () => {
      room.off(RoomEvent.DataReceived, handleMessage);
    };
  }, [room]);

  // Send message
  const sendMessage = async () => {
    if (!message.trim()) return;

    const chatMessage: ChatMessage = {
      sender: room.localParticipant.identity,
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Show immediately in sender chat
    setMessages((prev) => [...prev, chatMessage]);

    try {
      await room.localParticipant.publishData(
        new TextEncoder().encode(JSON.stringify(chatMessage)),
        {
          reliable: true,
        }
      );
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    setMessage("");
  };

  return (
    <div className="flex flex-col h-full p-4 border-t">
      <h3 className="font-bold text-lg mb-4">
        Chat
      </h3>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="border rounded-lg p-2"
          >
            <div className="font-semibold text-sm">
              {msg.sender}
            </div>

            <div className="text-sm">
              {msg.text}
            </div>

            <div className="text-xs text-gray-500">
              {msg.timestamp}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          className="px-4 py-2 border rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}