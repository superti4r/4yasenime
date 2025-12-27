"use client";

import * as React from "react";
import {
  Command,
  CommandBody,
  CommandContent,
  CommandFooter,
  CommandFooterItem,
  CommandFooterText,
} from "@/components/selia/command";
import { AnimeSearchPanel } from "@/components/search/anime-search-panel";
import { Keyboard } from "lucide-react";

export function SearchCommandRoot({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && k === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (k === "escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Command open={open} onOpenChange={setOpen}>
      {children}

      <CommandContent>
        <CommandBody>
          <AnimeSearchPanel autoFocus={open} onPick={() => setOpen(false)} />
        </CommandBody>

        <CommandFooter>
          <CommandFooterItem>
            <Keyboard size={16} className="text-muted-foreground" />
            <CommandFooterText>Ctrl / ⌘ + K</CommandFooterText>
          </CommandFooterItem>

          <CommandFooterItem>
            <CommandFooterText>Esc untuk tutup</CommandFooterText>
          </CommandFooterItem>
        </CommandFooter>
      </CommandContent>
    </Command>
  );
}
