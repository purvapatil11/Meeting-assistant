// Mute
// Camera
// Share 
// Leave
"use client";

import { useRouter } from "next/navigation";
import { useLocalParticipant, useRoomContext } from "@livekit/components-react";
export default function ControlsBar() {
    const room = useRoomContext();
    const router = useRouter();
    const { localParticipant } = useLocalParticipant()

    const leaveMeeting = async() => {
        await room.disconnect();
        router.push("/join");
    }
    const toggleMic = async() => {
        const enabled = localParticipant.isMicrophoneEnabled;

        await localParticipant.setMicrophoneEnabled(!enabled);
    }
    const toggleCamera = async() => {
        const enabled = localParticipant.isCameraEnabled;
        await localParticipant.setCameraEnabled(!enabled);
    }
    return (
        <div>
        <button onClick={leaveMeeting}>Leave Meeting</button>
        <button onClick={toggleMic}>Mic</button>
        <button onClick={toggleCamera}>Camera</button>
        </div>
    )
}