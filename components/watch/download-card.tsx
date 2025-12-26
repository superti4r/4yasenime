"use client";

import React from "react";
import { Card } from "@/components/selia/card";
import { Separator } from "@/components/selia/separator";
import { DownloadButton } from "@/components/watch/download-button";
import { Download } from "lucide-react";
import type { DownloadLink } from "@/types/watch";

export function DownloadCard({
  downloadLinks,
}: {
  downloadLinks: DownloadLink[];
}) {
  return (
    <Card className="p-5 sm:p-6 space-y-4 bg-card/65 border-foreground/10 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-2">
        <Download className="size-4 text-primary" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
          Download Area
        </span>
      </div>

      <Separator className="opacity-10" />

      <div className="grid grid-cols-1 gap-2">
        {downloadLinks.map((dl, i) => (
          <DownloadButton
            key={`${dl.server}-${i}`}
            url={dl.url}
            variant="tertiary"
            size="sm"
            className="w-full justify-between bg-foreground/5 hover:bg-primary hover:text-primary-foreground border-none text-foreground"
          >
            <span className="text-[10px] truncate">
              {dl.server.replace("Download ", "")}
            </span>
            <Download size={14} className="opacity-50" />
          </DownloadButton>
        ))}
      </div>
    </Card>
  );
}
