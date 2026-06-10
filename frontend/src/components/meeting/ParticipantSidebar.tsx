"use client";

import { useParticipants } from "@livekit/components-react";
import { Mic, MicOff, Video, VideoOff, Volume2, UserCheck } from "lucide-react";

export default function ParticipantSidebar() {
  const participants = useParticipants();

  // Helper to extract initials
  const getInitials = (name: string) => {
    if (!name) return "P";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="w-full h-full flex flex-col p-5 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Active Space Users
        </span>
        <span className="text-xs bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-full text-zinc-400 font-semibold font-mono">
          {participants.length} total
        </span>
      </div>

      <div className="space-y-3 flex-1">
        {participants.map((p) => {
          const initials = getInitials(p.identity);
          const isSpeaking = p.isSpeaking;
          const isLocal = p.isLocal;

          return (
            <div
              key={p.identity}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                isSpeaking
                  ? "bg-blue-500/5 border-blue-500/30"
                  : "bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.04]"
              }`}
            >
              {/* Left section: Avatar & Name */}
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 relative ${
                    isSpeaking 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                      : "bg-white/[0.06] border border-white/[0.08] text-zinc-300"
                  }`}
                >
                  {initials}
                  {isSpeaking && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#030303] flex items-center justify-center">
                      <Volume2 className="w-2 h-2 text-white" />
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex flex-col">
                  <span className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                    {p.identity}
                    {isLocal && (
                      <span className="text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1 py-0.2 rounded font-semibold">
                        You
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium">
                    {isLocal ? "Room Admin" : "Attendee"}
                  </span>
                </div>
              </div>

              {/* Right section: Mic/Video states */}
              <div className="flex items-center gap-2">
                {/* Microphone status icon */}
                <div 
                  className={`p-1.5 rounded-lg border ${
                    p.isMicrophoneEnabled
                      ? "bg-white/[0.03] border-white/[0.08] text-zinc-400"
                      : "bg-red-500/10 border-red-500/20 text-red-400"
                  }`}
                >
                  {p.isMicrophoneEnabled ? (
                    <Mic className="w-3.5 h-3.5" />
                  ) : (
                    <MicOff className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Video status icon */}
                <div 
                  className={`p-1.5 rounded-lg border ${
                    p.isCameraEnabled
                      ? "bg-white/[0.03] border-white/[0.08] text-zinc-400"
                      : "bg-red-500/10 border-red-500/20 text-red-400"
                  }`}
                >
                  {p.isCameraEnabled ? (
                    <Video className="w-3.5 h-3.5" />
                  ) : (
                    <VideoOff className="w-3.5 h-3.5" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}