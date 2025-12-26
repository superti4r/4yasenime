import Link from "next/link";
import type { DetailAnimeResponse } from "@/types/detail-anime";
import { Card } from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { Button } from "@/components/selia/button";
import { Separator } from "@/components/selia/separator";
import { DetailPoster } from "@/components/detail/poster";
import { DetailGenres } from "@/components/detail/genres";
import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimeDetailData = DetailAnimeResponse["data"];

export function DetailSidebar({
  anime,
  firstEpisode,
}: {
  anime: AnimeDetailData;
  firstEpisode: string | null;
}) {
  return (
    <div className="lg:sticky lg:top-8 space-y-4 sm:space-y-5">
      <Card className="bg-card/65 border-foreground/10 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-5">
          <DetailPoster poster={anime.poster} title={anime.title} />
        </div>

        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-2 sm:hidden">
              <Badge
                variant="primary"
                pill
                size="sm"
                className="font-bold px-3"
              >
                DETAILS
              </Badge>
              <Badge
                variant="info"
                pill
                size="sm"
                className="font-bold border-foreground/10 bg-foreground/5 text-foreground"
              >
                {anime.episodes?.length ?? 0} EPS
              </Badge>
            </div>

            <Button
              variant="primary"
              pill
              size="sm"
              disabled={!firstEpisode}
              render={
                firstEpisode ? (
                  <Link href={`/watch/${firstEpisode}`} />
                ) : undefined
              }
              className={cn(
                "w-full justify-center font-black",
                !firstEpisode && "opacity-60"
              )}
            >
              <PlayCircle size={18} /> Tonton Sekarang!
            </Button>
          </div>
        </div>
      </Card>

      <Card className="bg-card/60 border-foreground/10 backdrop-blur-xl shadow-xl rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
            Genre
          </p>
          <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
            {anime.genres?.length ?? 0}
          </span>
        </div>
        <Separator className="opacity-10 my-4" />
        <DetailGenres genres={anime.genres ?? []} />
      </Card>
    </div>
  );
}
