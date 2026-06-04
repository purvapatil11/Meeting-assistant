"use client";

import {
  LiveKitRoom,
  VideoConference,
} from "@livekit/components-react";
import ControlsBar from "./ControlsBar";
import ParticipantCount from "./ParticipantCount";
import MeetingHeader from "./MeetingHeader";
import VideoGrid from "./VideoGrid";
import ChatPanel from "./ChatPanel";
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
      <MeetingHeader/>
      <VideoGrid/>
      {/* <ParticipantSidebar/> */}
      <ParticipantCount />
      <VideoConference />
      <ControlsBar />
      <ChatPanel/>
    </LiveKitRoom>
  );
}