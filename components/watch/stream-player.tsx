"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/selia/card";
import { Button } from "@/components/selia/button";
import { cn } from "@/lib/utils";
import {
  modeLabel,
  nextMode,
  pickDefaultMode,
  readModePreference,
  resolvePolicy,
  writeModePreference,
  type SandboxMode,
} from "@/services/player-policy-services";

export function StreamPlayer({
  activeServer,
  poster,
}: {
  activeServer: { server: string; url: string };
  poster: string;
}) {
  const [mode, setMode] = React.useState<SandboxMode>(() =>
    pickDefaultMode(activeServer.server, activeServer.url)
  );
  const [loadedFor, setLoadedFor] = React.useState<string | null>(null);
  const [stalled, setStalled] = React.useState(false);

  React.useEffect(() => {
    const pref = readModePreference(activeServer.server, activeServer.url);
    const next = pref ?? pickDefaultMode(activeServer.server, activeServer.url);
    setMode(next);
  }, [activeServer.server, activeServer.url]);

  const frameKey = `${activeServer.url}::${mode}`;
  const isLoading = loadedFor !== frameKey;

  React.useEffect(() => {
    setLoadedFor(null);
    setStalled(false);

    const t = window.setTimeout(() => {
      setStalled(true);
    }, 9000);

    return () => window.clearTimeout(t);
  }, [frameKey]);

  const policy = resolvePolicy(activeServer.server, activeServer.url, mode);

  const cycleMode = React.useCallback(() => {
    const nm = nextMode(mode);
    setMode(nm);
    writeModePreference(activeServer.server, activeServer.url, nm);
  }, [mode, activeServer.server, activeServer.url]);

  const setModeDirect = React.useCallback(
    (nm: SandboxMode) => {
      setMode(nm);
      writeModePreference(activeServer.server, activeServer.url, nm);
    },
    [activeServer.server, activeServer.url]
  );

  return (
    <div className="relative isolate w-full overflow-visible">
      <div
        className="pointer-events-none absolute -inset-2 sm:-inset-3 lg:-inset-4 opacity-25 blur-2xl sm:blur-3xl"
        style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Card className="relative border border-foreground/10 bg-card/40 backdrop-blur-xl rounded-2xl overflow-hidden w-full aspect-video shadow-xl">
        <div className="absolute right-3 top-3 z-30 flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            pill
            onClick={cycleMode}
            className="bg-background/30 backdrop-blur-xl border-foreground/10"
          >
            {modeLabel(mode)}
          </Button>
        </div>

        <div className="relative w-full h-full bg-black overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 z-20 grid place-items-center bg-background/80 backdrop-blur-md">
              <div className="flex flex-col items-center gap-3 px-4 text-center">
                <Loader2 className="size-9 sm:size-10 text-primary animate-spin" />
                <p className="text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase text-foreground/60">
                  MEMUAT {activeServer.server}...
                </p>

                {stalled && (
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                    <Button
                      variant={mode === "compat" ? "secondary" : "outline"}
                      size="xs"
                      pill
                      onClick={() => setModeDirect("compat")}
                      className={cn(
                        "bg-background/30 backdrop-blur-xl border-foreground/10",
                        mode === "compat" && "bg-secondary/50"
                      )}
                    >
                      Compat
                    </Button>

                    <Button
                      variant={mode === "loose" ? "secondary" : "outline"}
                      size="xs"
                      pill
                      onClick={() => setModeDirect("loose")}
                      className={cn(
                        "bg-background/30 backdrop-blur-xl border-foreground/10",
                        mode === "loose" && "bg-secondary/50"
                      )}
                    >
                      Loose
                    </Button>

                    <Button
                      variant="plain"
                      size="xs"
                      pill
                      className="bg-background/20 backdrop-blur-xl"
                      render={
                        <a
                          href={activeServer.url}
                          target="_blank"
                          rel="noreferrer"
                        />
                      }
                    >
                      Tab Baru
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          <iframe
            key={frameKey}
            src={activeServer.url}
            title={`Player ${activeServer.server}`}
            className="absolute inset-0 w-full h-full border-none z-10"
            allow={policy.allow}
            sandbox={policy.sandbox}
            allowFullScreen
            onLoad={() => {
              setLoadedFor(frameKey);
              setStalled(false);
            }}
            referrerPolicy="no-referrer"
          />
        </div>
      </Card>
    </div>
  );
}
