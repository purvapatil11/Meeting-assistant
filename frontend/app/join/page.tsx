"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { 
  Hash, 
  User, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  ArrowLeft,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function JoinPage() {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Card slide-up and fade-in
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!roomId.trim()) {
      setError("Please enter a valid Room ID to join.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your display name.");
      return;
    }

    // GSAP exit animation before routing
    gsap.to(cardRef.current, {
      opacity: 0,
      y: -20,
      scale: 0.98,
      duration: 0.4,
      onComplete: () => {
        // Redirect with mic/cam settings as query parameters if needed, or default to room context
        const cleanName = encodeURIComponent(name.trim());
        const room = roomId.trim().toLowerCase().replace(/\s+/g, "-");
        router.push(`/meeting/${room}?name=${cleanName}`);
      }
    });
  };

  return (
    <div 
      ref={backgroundRef}
      className="relative min-h-screen bg-[#030303] text-zinc-100 flex flex-col items-center justify-center p-6 font-sans overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div className="glow-orb glow-orb-blue w-[400px] h-[400px] top-[10%] left-[-10%] opacity-10" />
      <div className="glow-orb glow-orb-purple w-[400px] h-[400px] bottom-[10%] right-[-10%] opacity-10" />

      {/* Back to Home Button */}
      <button 
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      {/* Main Glassmorphic Card */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full max-w-4xl glass-panel rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12"
      >
        {/* Left Side: Form Controls (7 cols) */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/[0.06]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Join Workspace
            </h2>
            <p className="text-sm text-zinc-400">
              Enter your session details to step into the virtual room.
            </p>
          </div>

          <form onSubmit={handleJoin} className="space-y-6">
            {/* Room ID Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" />
                Room ID
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="e.g. design-review"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                  required
                />
              </div>
            </div>

            {/* Display Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Your Display Name
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Purva Patil"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                {error}
              </div>
            )}

            {/* Join CTA */}
            <button 
              type="submit"
              className="w-full group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm glass-button-primary"
            >
              Enter Room
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Secure indicator */}
          <div className="mt-8 flex items-center gap-2 text-[10px] text-zinc-500 border-t border-white/[0.04] pt-4">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500/70" />
            <span>Connection secured via end-to-end token handshakes.</span>
          </div>
        </div>

        {/* Right Side: Setup Pre-Check (5 cols) */}
        <div className="md:col-span-5 bg-black/40 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-6">
              Device Pre-Check
            </h3>

            {/* Mock Camera View */}
            <div className="aspect-video w-full rounded-xl bg-zinc-900 border border-white/[0.08] overflow-hidden relative flex items-center justify-center mb-6">
              {cameraEnabled ? (
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 flex flex-col items-center justify-center">
                  <span className="text-[10px] text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    Camera Feed Active
                  </span>
                  <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center mt-3 text-zinc-400">
                    <User className="w-6 h-6" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-zinc-500 text-xs gap-2">
                  <VideoOff className="w-8 h-8 opacity-55" />
                  <span>Camera is turned off</span>
                </div>
              )}

              {/* MIC Visualizer simulation */}
              {micEnabled && (
                <div className="absolute bottom-3 left-3 right-3 h-1 flex gap-0.5 items-end justify-center">
                  <div className="w-1 h-3 bg-blue-500/80 rounded animate-pulse" />
                  <div className="w-1 h-2 bg-blue-500/80 rounded animate-pulse [animation-delay:0.2s]" />
                  <div className="w-1 h-4 bg-blue-500/80 rounded animate-pulse [animation-delay:0.4s]" />
                  <div className="w-1 h-2 bg-blue-500/80 rounded animate-pulse [animation-delay:0.1s]" />
                  <div className="w-1 h-3 bg-blue-500/80 rounded animate-pulse [animation-delay:0.3s]" />
                </div>
              )}
            </div>

            {/* Media Toggles */}
            <div className="flex justify-center gap-4">
              <button 
                type="button"
                onClick={() => setMicEnabled(!micEnabled)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                  micEnabled 
                    ? "bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600/20" 
                    : "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                }`}
              >
                {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              
              <button 
                type="button"
                onClick={() => setCameraEnabled(!cameraEnabled)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                  cameraEnabled 
                    ? "bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600/20" 
                    : "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                }`}
              >
                {cameraEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 leading-relaxed text-center mt-6">
            Configure microphone & camera permissions. Settings persist once you enter the call workspace.
          </div>
        </div>
      </div>
    </div>
  );
}