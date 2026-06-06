"use client";

import { LiveKitRoom } from "@livekit/components-react";

import MeetingHeader from "./MeetingHeader";
import VideoGrid from "./VideoGrid";
import ParticipantSidebar from "./ParticipantSidebar";
import ChatPanel from "./ChatPanel";
import ControlsBar from "./ControlsBar";

interface MeetingRoomProps {
  token: string;
  serverUrl: string;
}

export default function MeetingRoom({
  token,
  serverUrl,
}: MeetingRoomProps) {
  return (
    <LiveKitRoom
      serverUrl={serverUrl}
      token={token}
      connect={true}
      audio={true}
      video={true}
    >
      <div className="flex flex-col h-screen">

        {/* Header */}
        <MeetingHeader />

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">

          {/* Video Area */}
          <div className="flex-1 p-4">
            <VideoGrid />
          </div>

          {/* Right Sidebar */}
          <div className="w-80 border-l flex flex-col">
            <ParticipantSidebar />
            <ChatPanel />
          </div>

        </div>

        {/* Bottom Controls */}
        <ControlsBar />

      </div>
    </LiveKitRoom>
  );
}