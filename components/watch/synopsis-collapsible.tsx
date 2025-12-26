"use client";

import React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from "@/components/selia/collapsible";
import { Info, ChevronRight } from "lucide-react";

export function SynopsisCollapsible({ synopsis }: { synopsis: string }) {
  return (
    <Collapsible className="bg-card/65 p-5 sm:p-6 rounded-2xl border border-foreground/10 backdrop-blur-xl shadow-xl">
      <CollapsibleTrigger className="text-sm font-bold uppercase flex items-center justify-between w-full group text-foreground">
        <div className="flex items-center gap-3 text-xs">
          <Info className="text-primary size-4" /> Synopsis
        </div>
        <ChevronRight
          size={16}
          className="group-data-[state=open]:rotate-90 transition-transform opacity-40"
        />
      </CollapsibleTrigger>
      <CollapsiblePanel className="text-muted-foreground leading-relaxed pt-4 text-xs sm:text-sm border-t border-foreground/5 mt-4">
        {synopsis}
      </CollapsiblePanel>
    </Collapsible>
  );
}
