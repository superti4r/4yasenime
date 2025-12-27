import Link from "next/link";
import { getAllChangelogs } from "@/lib/changelog";
import { formatDate } from "@/lib/date";
import type { ChangelogStatus } from "@/types/changelog";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { Separator } from "@/components/selia/separator";
import { cn } from "@/lib/utils";

function statusToBadge(status: ChangelogStatus) {
  switch (status) {
    case "released":
      return { variant: "success" as const, label: "Released" };
    case "fixed":
      return { variant: "primary" as const, label: "Fixed" };
    case "improved":
      return { variant: "tertiary" as const, label: "Improved" };
    case "changed":
      return { variant: "secondary" as const, label: "Changed" };
    case "breaking":
      return { variant: "danger" as const, label: "Breaking" };
    case "deprecated":
      return { variant: "warning" as const, label: "Deprecated" };
    case "planned":
      return { variant: "info" as const, label: "Planned" };
    default:
      return { variant: "secondary" as const, label: "Info" };
  }
}

export default function ChangelogIndexPage() {
  const items = getAllChangelogs();
  const latest = items[0];

  return (
    <div className="min-h-dvh w-full bg-background">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-28 left-1/2 h-72 w-[28rem] -translate-x-1/2 rounded-full bg-primary/22 blur-3xl" />
          <div className="absolute top-28 left-[-10rem] h-72 w-72 rounded-full bg-tertiary/18 blur-3xl" />
          <div className="absolute top-56 right-[-10rem] h-72 w-72 rounded-full bg-secondary/18 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-background/40 to-background" />
        </div>

        <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 pt-7 sm:pt-10 pb-28 sm:pb-32 space-y-8 sm:space-y-10">
          <section className="space-y-5">
            <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-8 w-1.5 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary),0.6)]" />
                <div className="min-w-0">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black italic tracking-tighter uppercase text-foreground">
                    Changelog
                  </h1>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                    Riwayat perubahan, perbaikan, dan pengumuman fitur.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {items.length} post
                </div>

                <Link
                  href="/"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kembali ke Home →
                </Link>
              </div>
            </div>

            {latest ? (
              (() => {
                const s = statusToBadge(latest.status);

                return (
                  <Card className="bg-background/30 border border-border/40 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="p-4 sm:p-6 grid-cols-1 gap-0">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {formatDate(latest.date)}
                            {latest.summary ? ` • ${latest.summary}` : ""}
                          </p>
                          <Badge
                            variant={s.variant}
                            size="sm"
                            pill
                            className="shrink-0 mt-0.5"
                          >
                            {s.label}
                          </Badge>
                        </div>

                        <CardTitle className="text-lg sm:text-xl lg:text-2xl leading-snug line-clamp-2">
                          {latest.title}
                        </CardTitle>
                      </div>

                      <Separator className="mt-4 opacity-20" />
                    </CardHeader>

                    <CardBody className="p-4 sm:p-6 pt-4">
                      <Link
                        href={`/changelog/${latest.slug}`}
                        className={cn(
                          "group inline-flex items-center gap-2 text-sm font-semibold",
                          "text-foreground/90 hover:text-foreground transition-colors"
                        )}
                      >
                        Baca update terbaru
                        <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </Link>
                    </CardBody>
                  </Card>
                );
              })()
            ) : (
              <Card className="bg-background/30 border border-border/40 backdrop-blur-xl shadow-2xl">
                <CardBody className="p-4 sm:p-6">
                  <p className="text-sm text-muted-foreground italic">
                    Belum ada changelog.
                  </p>
                </CardBody>
              </Card>
            )}
          </section>

          <section className="space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 rounded-full bg-primary/70" />
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Semua perubahan
                </h2>
              </div>

              <div className="hidden sm:block text-sm text-muted-foreground">
                Terbaru → Lama
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {items.map((it) => {
                const s = statusToBadge(it.status);

                return (
                  <Link
                    key={it.slug}
                    href={`/changelog/${it.slug}`}
                    className="block"
                  >
                    <Card
                      className={cn(
                        "group h-full",
                        "bg-background/25 border border-border/40 backdrop-blur-xl",
                        "shadow-2xl transition-all duration-300",
                        "hover:-translate-y-0.5 hover:bg-background/30"
                      )}
                    >
                      <CardHeader className="p-4 sm:p-5 grid-cols-1 gap-0">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {formatDate(it.date)}
                              {it.summary ? ` • ${it.summary}` : ""}
                            </p>

                            <Badge
                              variant={s.variant}
                              size="sm"
                              pill
                              className="shrink-0 mt-0.5"
                            >
                              {s.label}
                            </Badge>
                          </div>

                          <CardTitle className="text-base sm:text-lg leading-snug line-clamp-2">
                            {it.title}
                          </CardTitle>
                        </div>

                        <Separator className="mt-4 opacity-15" />
                      </CardHeader>

                      <CardBody className="p-4 sm:p-5 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Read more
                          </span>
                          <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                            →
                          </span>
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
