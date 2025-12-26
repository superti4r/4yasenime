"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Tv } from "lucide-react";
import { Badge } from "@/components/selia/badge";
import { Card } from "@/components/selia/card";
import { Button } from "@/components/selia/button";
import { Anime } from "@/types/anime";

export function AnimePoster({ anime }: { anime: Anime }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative group flex flex-col gap-3">
      <Card className="relative aspect-[2/3] w-full overflow-hidden border-none ring-1 ring-white/5 shadow-none bg-muted/5">
        {!imageError ? (
          <img
            src={anime.poster}
            alt={anime.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/10">
            <Tv size={32} className="opacity-10" />
          </div>
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="primary"
            size="sm-icon"
            pill
            render={<Link href={`/watch/${anime.slug}`} />}
            className="scale-90 group-hover:scale-110 transition-transform duration-300"
          >
            <Play fill="currentColor" className="ml-0.5" />
          </Button>
        </div>

        <div className="absolute top-2 right-2">
          <Badge
            variant="secondary"
            size="sm"
            pill
            className="bg-background/80 backdrop-blur-md border-none font-bold"
          >
            EP {anime.episode}
          </Badge>
        </div>
      </Card>

      <div className="px-1 min-h-[40px]">
        <h3 className="text-[13px] md:text-sm font-semibold text-foreground/90 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
          {anime.title}
        </h3>
      </div>
    </div>
  );
}
