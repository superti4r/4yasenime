"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { DownloadLink } from "@/types/watch";
import { DownloadCard } from "./download-card";
import { SynopsisCollapsible } from "./synopsis-collapsible";

export function WatchSidebar({
  isCinema,
  synopsis,
  downloadLinks,
}: {
  isCinema: boolean;
  synopsis: string;
  downloadLinks: DownloadLink[];
}) {
  return (
    <div
      className={cn(
        "lg:col-span-4 xl:col-span-3 flex flex-col gap-4 sm:gap-6 relative isolate z-20 transition-opacity duration-300",
        isCinema ? "hidden" : "flex"
      )}
    >
      <div className="lg:sticky lg:top-6 space-y-4 sm:space-y-6">
        <DownloadCard downloadLinks={downloadLinks} />
        <SynopsisCollapsible synopsis={synopsis} />
      </div>
    </div>
  );
}
