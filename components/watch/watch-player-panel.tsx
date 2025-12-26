"use client";

import React from "react";
import { Card } from "@/components/selia/card";
import { cn } from "@/lib/utils";
import { Film, Sun } from "lucide-react";
import { StreamPlayer } from "@/components/watch/stream-player";
import {
  ServerSelectCard,
  type ServerSelectOption,
} from "@/components/watch/server-select-card";
import type { StreamLink } from "@/types/watch";

export function WatchPlayerPanel({
  refEl,
  isCinema,
  onToggleCinema,
  poster,
  activeServer,
  serverValue,
  serverOptions,
  onChangeServer,
}: {
  refEl: React.RefObject<HTMLDivElement | null>;
  isCinema: boolean;
  onToggleCinema: () => void;
  poster: string;
  activeServer: StreamLink | null;
  serverValue: string;
  serverOptions: ServerSelectOption[];
  onChangeServer: (value: string) => void;
}) {
  return (
    <div
      className={cn(
        "lg:col-span-8 xl:col-span-9 space-y-4 sm:space-y-5 relative isolate z-10 min-w-0",
        isCinema && "lg:col-span-12 xl:col-span-12"
      )}
    >
      <div
        ref={refEl}
        className={cn(
          "space-y-4 sm:space-y-5 transition-transform duration-300",
          isCinema && "lg:scale-[1.02]"
        )}
      >
        <div className="relative">
          <div
            className={cn(
              "pointer-events-none absolute -inset-3 sm:-inset-6 rounded-[28px] transition-opacity duration-300",
              isCinema ? "opacity-100 bg-black/70" : "opacity-0"
            )}
          />
          <div className="relative space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Film className="size-4 text-primary" />
                Cinema Mode
              </div>

              <button
                onClick={onToggleCinema}
                aria-pressed={isCinema}
                className={cn(
                  "flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all px-4 py-2 rounded-full border backdrop-blur-md",
                  "bg-foreground/5 border-foreground/10 text-muted-foreground hover:text-primary",
                  isCinema && "bg-primary/10 border-primary/20 text-primary"
                )}
              >
                {isCinema ? (
                  <Sun className="size-3.5" />
                ) : (
                  <Film className="size-3.5" />
                )}
                {isCinema ? "Exit Cinema" : "Enter Cinema"}
              </button>
            </div>

            {activeServer ? (
              <StreamPlayer activeServer={activeServer} poster={poster} />
            ) : (
              <Card className="border border-foreground/10 bg-card/60 backdrop-blur-xl rounded-2xl p-6">
                <p className="text-xs text-muted-foreground font-semibold">
                  Server tidak tersedia.
                </p>
              </Card>
            )}
          </div>
        </div>

        <ServerSelectCard
          value={serverValue}
          options={serverOptions}
          onValueChange={onChangeServer}
        />
      </div>
    </div>
  );
}
