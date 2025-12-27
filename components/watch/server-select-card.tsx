"use client";

import React from "react";
import { Card } from "@/components/selia/card";
import { Separator } from "@/components/selia/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem as SelectItemRow,
} from "@/components/selia/select";
import { Monitor, Server } from "lucide-react";

export type ServerSelectOption = {
  value: string;
  label: string;
};

export function ServerSelectCard({
  value,
  options,
  onValueChange,
}: {
  value: string;
  options: ServerSelectOption[];
  onValueChange: (value: string) => void;
}) {
  return (
    <Card className="p-5 sm:p-6 bg-card/65 border-foreground/10 backdrop-blur-xl shadow-xl overflow-visible relative isolate">
      <div className="flex items-center gap-2">
        <Server className="size-4 text-primary" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
          Select Server
        </span>
      </div>

      <Separator className="opacity-10 my-4" />

      <Select
        value={value}
        onValueChange={(next) =>
          onValueChange(typeof next === "string" ? next : String(next ?? ""))
        }
      >
        <SelectTrigger
          variant="subtle"
          className="h-11 text-xs font-bold text-foreground"
        >
          <div className="flex items-center gap-2.5">
            <Monitor className="size-4 opacity-60" />
            <SelectValue placeholder="Select a server" />
          </div>
        </SelectTrigger>

        <SelectPopup
          side="top"
          align="start"
          sideOffset={10}
          sticky
          positionMethod="fixed"
          className="max-h-[min(var(--available-height),18rem)]"
        >
          <SelectList className="max-h-[min(var(--available-height),18rem)] overflow-y-auto">
            {options.map((opt) => (
              <SelectItemRow
                key={opt.value}
                value={opt.value}
                className="text-xs font-bold"
              >
                <div className="flex items-center gap-2.5">
                  <Monitor className="size-4 opacity-60" />
                  <span className="text-popover-foreground">{opt.label}</span>
                </div>
              </SelectItemRow>
            ))}
          </SelectList>
        </SelectPopup>
      </Select>
    </Card>
  );
}
