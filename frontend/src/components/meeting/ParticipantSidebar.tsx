"use client";

import { useParticipants } from "@livekit/components-react";

export default function ParticipantSidebar() {
  const participants = useParticipants();

  return (
    <div className="w-64 border-l p-4">
      <h2 className="font-bold mb-4">
        Participants ({participants.length})
      </h2>

      {participants.map((participant) => (
        <div
          key={participant.identity}
          className="flex items-center gap-2 mb-2"
        >
          <span>🟢Live</span>
          <span>{participant.identity}</span>
        </div>
      ))}
    </div>
  );
}