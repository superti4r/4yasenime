"use client";

import React from "react";

export function WatchBackground({ poster }: { poster?: string }) {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <div
        className="absolute inset-0 opacity-20 sm:opacity-25 lg:opacity-30 scale-125 saturate-[1.5] blur-[90px] sm:blur-[110px]"
        style={{
          backgroundImage: poster ? `url(${poster})` : undefined,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-background/45 backdrop-blur-[18px]" />
    </div>
  );
}
