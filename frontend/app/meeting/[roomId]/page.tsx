"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MeetingRoom from "@/src/components/meeting/MeetingRoom";

export default function MeetingPage() {
  const params = useParams();
  const roomId = params.roomId as string;

  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomName: roomId,
            participantName: `user-${Date.now()}`,
          }),
        });

        const data = await response.json();

        console.log("Token received:", data.token);

        setToken(data.token);
      } catch (error) {
        console.error(error);
      }
    };

    fetchToken();
  }, [roomId]);

  if (!token) {
    return <div>Joining room...</div>;
  }

  return (
    <MeetingRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL!}
    />
  );
}