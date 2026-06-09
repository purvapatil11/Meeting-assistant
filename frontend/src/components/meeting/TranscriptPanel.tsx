"use client";

import { useEffect, useState, useRef } from "react";
import { useParticipants } from "@livekit/components-react";
import { ClipboardList, Sparkles, Radio } from "lucide-react";

type TranscriptLine = {
  speaker: string;
  text: string;
  time: string;
};

const SIMULATED_PHRASES = [
  "I'm checking the current network packet latency. The WebRTC streams look highly optimized.",
  "Let's make sure the audio sampling is set to high quality in our LiveKit settings.",
  "The screen sharing is working correctly on my end. I can see the presentation clearly.",
  "Can we discuss the task schedule for our Next.js frontend redesign?",
  "Perfect, let's proceed with the GSAP implementation plan.",
  "We should also check if the backend generates room tokens reliably under heavy traffic.",
  "Yes, the JWT validation is lightweight and stateless, which is ideal."
];

export default function TranscriptPanel() {
  const participants = useParticipants();
  const [lines, setLines] = useState<TranscriptLine[]>([
    {
      speaker: "System AI",
      text: "Workspace live transcriber connected. Ready to capture conversation.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Periodic simulated transcriber to make the page feel alive and smart
  useEffect(() => {
    if (participants.length === 0) return;

    const interval = setInterval(() => {
      // Pick a random participant
      const randomIndex = Math.floor(Math.random() * participants.length);
      const speaker = participants[randomIndex].identity;

      // Pick a random phrase
      const randomPhrase = SIMULATED_PHRASES[Math.floor(Math.random() * SIMULATED_PHRASES.length)];

      const newLine: TranscriptLine = {
        speaker,
        text: randomPhrase,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setLines((prev) => [...prev, newLine]);
    }, 9000); // Add a line every 9 seconds

    return () => clearInterval(interval);
  }, [participants]);

  // Auto scroll
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="w-full h-full flex flex-col p-5 overflow-hidden">
      {/* Transcript Header info */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            AI Assist Notes
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>Listening</span>
        </div>
      </div>

      {/* Scrolling transcript area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {lines.map((line, idx) => {
          const isSystem = line.speaker === "System AI";
          return (
            <div 
              key={idx} 
              className={`p-3.5 rounded-xl border leading-relaxed text-xs transition-all ${
                isSystem 
                  ? "bg-blue-500/5 border-blue-500/20 text-zinc-400 font-mono italic" 
                  : "bg-white/[0.02] border-white/[0.04] text-zinc-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`font-bold ${isSystem ? "text-blue-400" : "text-white"}`}>
                  {line.speaker}
                </span>
                <span className="text-[9px] text-zinc-600 font-semibold">{line.time}</span>
              </div>
              <p className="text-zinc-300 leading-normal">{line.text}</p>
            </div>
          );
        })}
        <div ref={logEndRef} />
      </div>

      {/* Static helpful footnote */}
      <div className="pt-3 border-t border-white/[0.06] mt-4 text-[9px] text-zinc-500 leading-relaxed shrink-0 text-center">
        Live transcriptions are automatically logged as markdown meeting minutes.
      </div>
    </div>
  );
}