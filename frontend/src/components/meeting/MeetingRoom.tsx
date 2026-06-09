"use client";

import { LiveKitRoom } from "@livekit/components-react";
import MeetingHeader from "./MeetingHeader";
import VideoGrid from "./VideoGrid";
import ControlsBar from "./ControlsBar";
import SidebarTabs from "./SidebarTabs";
import { useLayoutStore } from "./layoutStore";

interface MeetingRoomProps {
  token: string;
  serverUrl: string;
}

export default function MeetingRoom({
  token,
  serverUrl,
}: MeetingRoomProps) {
  const { isSidebarOpen } = useLayoutStore();

  return (
    <LiveKitRoom
      serverUrl={serverUrl}
      token={token}
      connect={true}
      audio={true}
      video={true}
      className="flex flex-col h-screen bg-[#030303] text-zinc-100 overflow-hidden relative"
    >
      {/* Subtle Background Glow Orbs for Ambiance */}
      <div className="glow-orb glow-orb-blue w-[300px] h-[300px] top-[-5%] left-[5%] opacity-5" />
      <div className="glow-orb glow-orb-purple w-[400px] h-[400px] bottom-[-10%] right-[-5%] opacity-5" />

      {/* Header */}
      <MeetingHeader />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative w-full">
        {/* Video Workspace */}
        <main className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col justify-center transition-all duration-300">
          <div className="w-full h-full glass-panel rounded-2xl border border-white/[0.06] p-4 flex items-center justify-center overflow-hidden">
            <VideoGrid />
          </div>
        </main>

        {/* Collapsible Right Sidebar */}
        <aside 
          className={`h-full border-l border-white/[0.08] bg-black/30 backdrop-blur-md flex flex-col transition-all duration-300 ease-in-out overflow-hidden z-20 ${
            isSidebarOpen ? "w-[360px] opacity-100" : "w-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="w-[360px] h-full flex flex-col">
            <SidebarTabs />
          </div>
        </aside>
      </div>

      {/* Floating Bottom Control Capsule */}
      <ControlsBar />
    </LiveKitRoom>
  );
}