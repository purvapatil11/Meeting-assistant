"use client";

import {
  ParticipantTile,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";

export default function VideoGrid() {
  // Capture both Camera and Screen Share tracks.
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ]);

  const count = tracks.length;

  // Adapt grid layout depending on the number of active video tiles
  const getGridClass = () => {
    if (count === 0) return "flex items-center justify-center";
    if (count === 1) return "grid-cols-1 max-w-[800px] mx-auto";
    if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-[1200px] mx-auto";
    if (count <= 4) return "grid-cols-1 sm:grid-cols-2";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <div className="w-full h-full flex flex-col justify-center overflow-y-auto">
      {count === 0 ? (
        <div className="text-zinc-500 text-sm flex flex-col items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-zinc-600 animate-ping" />
          <span>Waiting for participants to connect...</span>
        </div>
      ) : (
        <div className={`grid gap-4 w-full h-full min-h-[300px] items-center ${getGridClass()}`}>
          {tracks.map((track) => (
            <div 
              key={`${track.participant.identity}-${track.source}`}
              className="relative w-full h-full aspect-video rounded-xl overflow-hidden border border-white/[0.05] bg-zinc-950/60 shadow-lg hover:border-white/10 transition-colors"
            >
              <ParticipantTile
                trackRef={track}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}