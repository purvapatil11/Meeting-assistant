"use client";

import {
  ParticipantTile,
  useTracks,
} from "@livekit/components-react";

import { Track } from "livekit-client";

export default function VideoGrid() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
    ]
  );

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {tracks.map((track) => (
        <ParticipantTile
          key={track.participant.identity}
          trackRef={track}
        />
      ))}
    </div>
  );
}