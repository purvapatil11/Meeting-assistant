"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import MeetingRoom from "@/src/components/meeting/MeetingRoom";
import { Loader2, ArrowLeft, ShieldAlert } from "lucide-react";

export default function MeetingPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;

  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  const participantName = searchParams.get("name") || "Guest";

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Try connecting to backend.
        const response = await fetch("http://localhost:5000/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomName: roomId,
            participantName,
          }),
        });

        if (!response.ok) {
          throw new Error("Handshake token request failed.");
        }

        const data = await response.json();
        if (data.token) {
          setToken(data.token);
        } else {
          throw new Error("No token returned from server.");
        }
      } catch (err: any) {
        console.error("Token fetch error:", err);
        setError(
          err.message || "Failed to establish a connection to the server."
        );
      }
    };

    fetchToken();
  }, [roomId, participantName]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md glass-panel rounded-2xl border border-white/[0.08] p-8 text-center space-y-6 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Connection Error</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We couldn't connect to the meeting backend server. Make sure the Node.js backend application is running.
            </p>
          </div>
          <div className="text-xs text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-3 select-all">
            {error}
          </div>
          <button
            onClick={() => router.push("/join")}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold glass-button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Entrance
          </button>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col items-center justify-center p-6 font-sans">
        <div className="text-center space-y-4">
          <div className="relative inline-flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">Entering Space</h3>
            <p className="text-xs text-zinc-500">
              Securing room keys for <span className="text-zinc-300 font-mono">{roomId}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MeetingRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL!}
    />
  );
}