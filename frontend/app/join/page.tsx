"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinPage() {
  const [roomId, setRoomId] = useState("");
  const [name, setName ] = useState("")
  const router = useRouter();

  return (
    <div>
      <input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
      />
      <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter you name"
    />
      <button
        onClick={() => {
          console.log("Button clicked");
          console.log("Room id: ", roomId);
          router.push(`/meeting/${roomId}?name=${encodeURIComponent(name)}`);
        }}>
        Join Meeting
      </button>
    </div>
  );
}