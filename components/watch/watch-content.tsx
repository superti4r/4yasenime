"use client";

import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toastManager } from "@/components/selia/toast";
import { cn } from "@/lib/utils";
import type { WatchData } from "@/types/watch";;
import type { ServerSelectOption } from "./server-select-card";
import { WatchBackground } from "./watch-background";
import { WatchHeader } from "./watch-header";
import { WatchPlayerPanel } from "./watch-player-panel";
import { WatchSidebar } from "./watch-sidebar";

export function WatchContent({
  data,
  episodeNumber,
}: {
  data: WatchData;
  episodeNumber: string;
}) {
  const router = useRouter();
  const playerWrapRef = useRef<HTMLDivElement | null>(null);
  const [isCinema, setIsCinema] = useState(false);

  const serverOptions: ServerSelectOption[] = data.stream_links.map((link) => ({
    value: link.server,
    label: link.server,
  }));

  const defaultServerValue = serverOptions[0]?.value ?? "";
  const [serverValue, setServerValue] = useState<string>(defaultServerValue);

  const resolvedServerValue = useMemo(() => {
    if (serverOptions.some((o) => o.value === serverValue)) return serverValue;
    return serverOptions[0]?.value ?? "";
  }, [serverOptions, serverValue]);

  const activeServer = useMemo(() => {
    const found = data.stream_links.find(
      (l) => l.server === resolvedServerValue
    );
    return found ?? null;
  }, [data, resolvedServerValue]);

  const handleNavigation = (slug: string | null, type: "Next" | "Prev") => {
    if (!slug) {
      toastManager.add({
        title: "Pemberitahuan",
        description: `Episode ${
          type === "Next" ? "selanjutnya" : "sebelumnya"
        } belum tersedia.`,
        type: "warning",
      });
      return;
    }
    router.push(`/watch/${slug}`);
  };

  const toggleCinema = () => {
    setIsCinema((v) => {
      const next = !v;
      if (next) {
        requestAnimationFrame(() => {
          playerWrapRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-dvh bg-background text-foreground pb-16 sm:pb-20 transition-colors duration-300">
      <WatchBackground poster={data.poster} />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-5 sm:pt-7 lg:pt-12 space-y-6 sm:space-y-8 relative">
        <WatchHeader
          title={data.title}
          episodeNumber={episodeNumber}
          isCinema={isCinema}
          onPrev={() => handleNavigation(data.prev_slug, "Prev")}
          onNext={() => handleNavigation(data.next_slug, "Next")}
        />

        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10",
            isCinema && "lg:grid-cols-1"
          )}
        >
          <WatchPlayerPanel
            refEl={playerWrapRef}
            isCinema={isCinema}
            onToggleCinema={toggleCinema}
            poster={data.poster}
            activeServer={activeServer}
            serverValue={resolvedServerValue}
            serverOptions={serverOptions}
            onChangeServer={setServerValue}
          />

          <WatchSidebar
            isCinema={isCinema}
            synopsis={data.synopsis}
            downloadLinks={data.download_links}
          />
        </div>
      </div>
    </div>
  );
}
