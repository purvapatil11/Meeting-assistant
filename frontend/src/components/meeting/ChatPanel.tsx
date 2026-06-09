"use client";

import { useState, useEffect, useRef } from "react";
import { useRoomContext } from "@livekit/components-react";
import { RoomEvent } from "livekit-client";
import { Send, MessageSquarePlus } from "lucide-react";

type ChatMessage = {
  sender: string;
  text: string;
  timestamp: string;
};

export default function ChatPanel() {
  const room = useRoomContext();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      text: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
    <div className="flex flex-col h-full overflow-hidden p-5">
      {/* Scrollable chat messages area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-2 text-xs">
            <MessageSquarePlus className="w-8 h-8 opacity-40 text-zinc-400" />
            <span>Room chat is empty.</span>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isSelf = msg.sender === room.localParticipant.identity;
            return (
              <div
                key={index}
                className={`flex flex-col max-w-[85%] ${
                  isSelf ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                {/* Sender Tag */}
                {!isSelf && (
                  <span className="text-[10px] text-zinc-500 font-semibold mb-1 ml-1 truncate">
                    {msg.sender}
                  </span>
                )}

                {/* Bubble Container */}
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed break-words ${
                    isSelf
                      ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-tr-none"
                      : "bg-white/[0.04] border border-white/[0.08] text-zinc-200 rounded-tl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Message Timestamp */}
                <span className="text-[9px] text-zinc-600 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input controls panel */}
      <div className="flex gap-2 pt-2 border-t border-white/[0.06]">
        <input
          className="flex-1 px-4 py-2.5 rounded-xl glass-input text-xs"
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
          disabled={!message.trim()}
          className="w-10 h-10 rounded-xl flex items-center justify-center glass-button-primary disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}