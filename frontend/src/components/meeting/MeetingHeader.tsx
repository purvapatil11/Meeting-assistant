"use client";

import { useState } from "react";
import { useConnectionState, useParticipants, useRoomContext } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { Copy, Check, Shield, Users, Radio } from "lucide-react";

export default function MeetingHeader() {
  const room = useRoomContext();
  const connectionState = useConnectionState();
  const participants = useParticipants();
  const [copied, setCopied] = useState(false);

  const copyInviteLink = () => {
    const inviteUrl = `${window.location.origin}/join?roomId=${encodeURIComponent(room.name)}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (state: ConnectionState) => {
    switch (state) {
      case ConnectionState.Connected:
        return "bg-emerald-500 border-emerald-500/30 text-emerald-400";
      case ConnectionState.Connecting:
      case ConnectionState.Reconnecting:
        return "bg-amber-500 border-amber-500/30 text-amber-400 animate-pulse";
      default:
        return "bg-red-500 border-red-500/30 text-red-400";
    }
  };

  return (
    <header className="relative z-10 w-full bg-black/20 backdrop-blur-md border-b border-white/[0.06] h-16 px-6 flex items-center justify-between">
      {/* Left section: Logo & Room details */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/10">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white">SMA</span>
        </div>
        
        <div className="h-4 w-px bg-white/10 hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Room:</span>
          <span className="text-sm font-bold text-white px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] font-mono">
            {room.name || "meeting-room"}
          </span>
        </div>
      </div>

      {/* Center section: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={copyInviteLink}
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold glass-button border border-white/[0.08] transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied Link!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
              <span>Copy Invite</span>
            </>
          )}
        </button>
      </div>

      {/* Right section: Connection indicator & stats */}
      <div className="flex items-center gap-4">
        {/* Participants count badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-zinc-300">
          <Users className="w-3.5 h-3.5 text-zinc-500" />
          <span className="font-semibold">{participants.length}</span>
        </div>

        {/* Connection status dot */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs bg-opacity-10 capitalize ${getStatusColor(connectionState)}`}>
          <Radio className="w-3 h-3 animate-pulse" />
          <span className="hidden sm:inline font-medium">{connectionState}</span>
        </div>
      </div>
    </header>
  );
}