"use client";

import { useParticipants } from "@livekit/components-react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";

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
          className="flex items-center justify-between mb-3"
        >
          <div className="flex items-center gap-2">
            <span>🟢</span>
            <span>{participant.identity}</span>
          </div>

          <div className="flex gap-2">
            {participant.isMicrophoneEnabled ? (
              <Mic size={18} />
            ) : (
              <MicOff size={18} />
            )}

            {participant.isCameraEnabled ? (
              <Video size={18} />
            ) : (
              <VideoOff size={18} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}