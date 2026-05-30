"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinPage() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div>
      <input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
      />

      <button
        onClick={() => {
          router.push(`/meeting/${roomId}`);
        }}
      >
        Join Meeting
      </button>
    </div>
  );
}