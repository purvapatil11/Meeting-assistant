"use client"

import { useParticipants } from "@livekit/components-react";

export default function ParticipantCount(){
    const participants = useParticipants();
    return (
        <div className="p-2">
            Participants: {participants.length}
        </div>
    )
}