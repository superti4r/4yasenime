"use client";

import React from "react";
import { Badge } from "@/components/selia/badge";
import { Button } from "@/components/selia/button";
import { Heading } from "@/components/selia/heading";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function WatchHeader({
  title,
  episodeNumber,
  isCinema,
  onPrev,
  onNext,
}: {
  title: string;
  episodeNumber: string;
  isCinema: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:gap-6 transition-opacity duration-300",
        isCinema && "opacity-60"
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" pill size="sm" className="font-bold px-3">
              WATCHING
            </Badge>
            <Badge
              variant="info"
              pill
              size="sm"
              className="font-bold border-foreground/10 bg-foreground/5 text-foreground"
            >
              EP {episodeNumber}
            </Badge>
          </div>
          <Heading
            size="lg"
            className="text-xl sm:text-3xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tighter leading-tight text-foreground drop-shadow-sm break-words"
          >
            {title}
          </Heading>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto">
          <Button
            variant="outline"
            size="sm"
            pill
            onClick={onPrev}
            className="flex-1 lg:flex-none font-bold bg-foreground/5 border-foreground/10 text-foreground"
          >
            <ChevronLeft size={18} /> PREV
          </Button>
          <Button
            variant="outline"
            size="sm"
            pill
            onClick={onNext}
            className="flex-1 lg:flex-none font-bold bg-foreground/5 border-foreground/10 text-foreground"
          >
            NEXT <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
