"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/selia/badge";
import { Button } from "@/components/selia/button";
import { Heading } from "@/components/selia/heading";
import { Separator } from "@/components/selia/separator";
import { Card } from "@/components/selia/card";
import { DownloadButton } from "@/components/watch/download-button";
import { toastManager } from "@/components/selia/toast";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from "@/components/selia/collapsible";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem as SelectItemRow,
  type SelectItem as SelectItemType,
} from "@/components/selia/select";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
  Monitor,
  Server,
  Film,
  Sun,
} from "lucide-react";
import { StreamPlayer } from "./stream-player";
import { cn } from "@/lib/utils";

type ServerOption = SelectItemType & { url: string };

export function WatchContent({
  data,
  episodeNumber,
}: {
  data: any;
  episodeNumber: string;
}) {
  const router = useRouter();
  const playerWrapRef = useRef<HTMLDivElement | null>(null);
  const [isCinema, setIsCinema] = useState(false);

  const serverOptions = useMemo<ServerOption[]>(() => {
    const links = Array.isArray(data?.stream_links) ? data.stream_links : [];
    return links.map((link: any) => ({
      value: String(link.server),
      label: String(link.server),
      url: String(link.url),
      icon: <Monitor className="size-4 opacity-60" />,
    }));
  }, [data?.stream_links]);

  const [activeServer, setActiveServer] = useState<ServerOption | null>(
    serverOptions[0] ?? null
  );

  useEffect(() => {
    setActiveServer(serverOptions[0] ?? null);
    setIsCinema(false);
  }, [serverOptions]);

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
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div
          className="absolute inset-0 opacity-20 sm:opacity-25 lg:opacity-30 scale-125 saturate-[1.5] blur-[90px] sm:blur-[110px]"
          style={{
            backgroundImage: `url(${data?.poster})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-background/45 backdrop-blur-[18px]" />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-5 sm:pt-7 lg:pt-12 space-y-6 sm:space-y-8 relative">
        <div
          className={cn(
            "flex flex-col gap-5 sm:gap-6 transition-opacity duration-300",
            isCinema && "opacity-60"
          )}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="primary"
                  pill
                  size="sm"
                  className="font-bold px-3"
                >
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
                {data?.title}
              </Heading>
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Button
                variant="outline"
                size="sm"
                pill
                onClick={() => handleNavigation(data?.prev_slug, "Prev")}
                className="flex-1 lg:flex-none font-bold bg-foreground/5 border-foreground/10 text-foreground"
              >
                <ChevronLeft size={18} /> PREV
              </Button>
              <Button
                variant="outline"
                size="sm"
                pill
                onClick={() => handleNavigation(data?.next_slug, "Next")}
                className="flex-1 lg:flex-none font-bold bg-foreground/5 border-foreground/10 text-foreground"
              >
                NEXT <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10",
            isCinema && "lg:grid-cols-1"
          )}
        >
          <div
            className={cn(
              "lg:col-span-8 xl:col-span-9 space-y-4 sm:space-y-5 relative isolate z-10 min-w-0",
              isCinema && "lg:col-span-12 xl:col-span-12"
            )}
          >
            <div
              ref={playerWrapRef}
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
                      onClick={toggleCinema}
                      aria-pressed={isCinema}
                      className={cn(
                        "flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all px-4 py-2 rounded-full border backdrop-blur-md",
                        "bg-foreground/5 border-foreground/10 text-muted-foreground hover:text-primary",
                        isCinema &&
                          "bg-primary/10 border-primary/20 text-primary"
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
                    <StreamPlayer
                      activeServer={{
                        server: String(activeServer.label),
                        url: (activeServer as any).url,
                      }}
                      poster={data?.poster}
                    />
                  ) : (
                    <Card className="border border-foreground/10 bg-card/60 backdrop-blur-xl rounded-2xl p-6">
                      <p className="text-xs text-muted-foreground font-semibold">
                        Server tidak tersedia.
                      </p>
                    </Card>
                  )}
                </div>
              </div>

              <Card className="p-5 sm:p-6 bg-card/65 border-foreground/10 backdrop-blur-xl shadow-xl overflow-visible relative isolate">
                <div className="flex items-center gap-2">
                  <Server className="size-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                    Select Server
                  </span>
                </div>
                <Separator className="opacity-10 my-4" />

                <Select
                  value={activeServer as any}
                  onValueChange={(val) => setActiveServer((val as any) ?? null)}
                >
                  <SelectTrigger
                    variant="subtle"
                    className="h-11 text-xs font-bold text-foreground"
                  >
                    <SelectValue placeholder="Select a server" />
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
                      {serverOptions.map((opt) => (
                        <SelectItemRow
                          key={opt.value}
                          value={opt as any}
                          className="text-xs font-bold"
                        >
                          <div className="flex items-center gap-2.5">
                            {opt.icon}
                            <span className="text-popover-foreground">
                              {opt.label}
                            </span>
                          </div>
                        </SelectItemRow>
                      ))}
                    </SelectList>
                  </SelectPopup>
                </Select>
              </Card>
            </div>
          </div>

          <div
            className={cn(
              "lg:col-span-4 xl:col-span-3 flex flex-col gap-4 sm:gap-6 relative isolate z-20 transition-opacity duration-300",
              isCinema ? "hidden" : "flex"
            )}
          >
            <div className="lg:sticky lg:top-6 space-y-4 sm:space-y-6">
              <Card className="p-5 sm:p-6 space-y-4 bg-card/65 border-foreground/10 backdrop-blur-xl shadow-xl">
                <div className="flex items-center gap-2">
                  <Download className="size-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                    Download Area
                  </span>
                </div>
                <Separator className="opacity-10" />
                <div className="grid grid-cols-1 gap-2">
                  {(data?.download_links ?? []).map((dl: any, i: number) => (
                    <DownloadButton
                      key={i}
                      url={dl.url}
                      variant="tertiary"
                      size="sm"
                      className="w-full justify-between bg-foreground/5 hover:bg-primary hover:text-primary-foreground border-none text-foreground"
                    >
                      <span className="text-[10px] truncate">
                        {String(dl.server).replace("Download ", "")}
                      </span>
                      <Download size={14} className="opacity-50" />
                    </DownloadButton>
                  ))}
                </div>
              </Card>

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
                  {data?.synopsis}
                </CollapsiblePanel>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
