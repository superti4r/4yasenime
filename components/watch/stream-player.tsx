"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/selia/card";

export function StreamPlayer({
  activeServer,
  poster,
}: {
  activeServer: { server: string; url: string };
  poster: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [activeServer?.url]);

  return (
    <div className="relative isolate w-full overflow-visible">
      <div
        className="pointer-events-none absolute -inset-2 sm:-inset-3 lg:-inset-4 opacity-25 blur-2xl sm:blur-3xl"
        style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Card className="relative border border-foreground/10 bg-card/40 backdrop-blur-xl rounded-2xl overflow-hidden w-full aspect-video shadow-xl">
        <div className="relative w-full h-full bg-black overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 z-20 grid place-items-center bg-background/80 backdrop-blur-md">
              <div className="flex flex-col items-center gap-3 px-4 text-center">
                <Loader2 className="size-9 sm:size-10 text-primary animate-spin" />
                <p className="text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase text-foreground/60">
                  MEMUAT {activeServer?.server ?? "SERVER"}...
                </p>
              </div>
            </div>
          )}
          <iframe
            key={activeServer?.url}
            src={activeServer?.url}
            title={`Player ${activeServer?.server ?? ""}`}
            className="absolute inset-0 w-full h-full border-none z-10"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            referrerPolicy="no-referrer"
          />
        </div>
      </Card>
    </div>
  );
}
