// Mute
// Camera
// Share 
// Leave
"use client";

import { useRouter } from "next/navigation";
import { useLocalParticipant, useRoomContext } from "@livekit/components-react";
import { toast } from "react-toastify";
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
    const toggleScreenShare = async() => {
        try {
            await localParticipant.setScreenShareEnabled(
                !localParticipant.isScreenShareEnabled
            );
        } catch (error) {
            console.error("Screen share error: ",error);
            toast.error("Failed to toggle screen share");
        }
    }
    return (
        <div>
        <button onClick={leaveMeeting}>Leave Meeting</button>
        <button onClick={toggleMic}>Mic</button>
        <button onClick={toggleCamera}>Camera</button>
        <button onClick={toggleScreenShare}>Screen Share</button>
        </div>
    )
}