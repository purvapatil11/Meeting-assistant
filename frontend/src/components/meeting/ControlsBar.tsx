"use client";

import { useRouter } from "next/navigation";
import { useLocalParticipant, useRoomContext } from "@livekit/components-react";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  PhoneOff, 
  PanelRight, 
  PanelRightClose 
} from "lucide-react";
import { useLayoutStore } from "./layoutStore";

export default function ControlsBar() {
  const room = useRoomContext();
  const router = useRouter();
  const { localParticipant } = useLocalParticipant();
  const { isSidebarOpen, toggleSidebar } = useLayoutStore();

  const isMicEnabled = localParticipant.isMicrophoneEnabled;
  const isCameraEnabled = localParticipant.isCameraEnabled;
  const isScreenSharing = localParticipant.isScreenShareEnabled;

  const leaveMeeting = async () => {
    await room.disconnect();
    router.push("/join");
  };

  const toggleMic = async () => {
    await localParticipant.setMicrophoneEnabled(!isMicEnabled);
  };

  const toggleCamera = async () => {
    await localParticipant.setCameraEnabled(!isCameraEnabled);
  };

  const toggleScreenShare = async () => {
    try {
      await localParticipant.setScreenShareEnabled(!isScreenSharing);
    } catch (error) {
      console.error("Screen share error: ", error);
    }
  };

  return (
    <div className="w-full bg-[#030303] border-t border-white/[0.06] py-4 px-6 flex items-center justify-between z-30">
      
      {/* Left side: local display info */}
      <div className="hidden md:flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
          Host Connection: Stable
        </span>
      </div>

      {/* Center: Media Toggles */}
      <div className="flex items-center gap-3 mx-auto md:mx-0">
        {/* Mic Button */}
        <button
          onClick={toggleMic}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
            isMicEnabled
              ? "bg-white/[0.04] border border-white/[0.08] text-zinc-200 hover:bg-white/[0.08]"
              : "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
          }`}
          title={isMicEnabled ? "Mute Mic" : "Unmute Mic"}
        >
          {isMicEnabled ? <Mic className="w-4.5 h-4.5" /> : <MicOff className="w-4.5 h-4.5" />}
        </button>

        {/* Camera Button */}
        <button
          onClick={toggleCamera}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
            isCameraEnabled
              ? "bg-white/[0.04] border border-white/[0.08] text-zinc-200 hover:bg-white/[0.08]"
              : "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
          }`}
          title={isCameraEnabled ? "Turn Camera Off" : "Turn Camera On"}
        >
          {isCameraEnabled ? <Video className="w-4.5 h-4.5" /> : <VideoOff className="w-4.5 h-4.5" />}
        </button>

        {/* Screen Share Button */}
        <button
          onClick={toggleScreenShare}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
            isScreenSharing
              ? "bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600/20"
              : "bg-white/[0.04] border border-white/[0.08] text-zinc-200 hover:bg-white/[0.08]"
          }`}
          title="Share Screen"
        >
          <Monitor className="w-4.5 h-4.5" />
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Leave Meeting Button */}
        <button
          onClick={leaveMeeting}
          className="group px-4 h-11 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-red-600/15 transition-all"
          title="Leave Room"
        >
          <PhoneOff className="w-4.5 h-4.5 group-hover:scale-105 transition-transform" />
          <span className="hidden sm:inline">Leave Space</span>
        </button>
      </div>

      {/* Right side: Sidebar panels toggling */}
      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${
            isSidebarOpen
              ? "bg-white/[0.08] border-white/20 text-white"
              : "bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:bg-white/[0.08]"
          }`}
          title={isSidebarOpen ? "Collapse Panel" : "Expand Panel"}
        >
          {isSidebarOpen ? (
            <PanelRightClose className="w-4.5 h-4.5" />
          ) : (
            <PanelRight className="w-4.5 h-4.5" />
          )}
        </button>
      </div>
    </div>
  );
}