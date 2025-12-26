import type { DetailAnimeResponse } from "@/types/detail-anime";
import { Card } from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { Separator } from "@/components/selia/separator";
import { Heading } from "@/components/selia/heading";
import { DetailEpisodes } from "@/components/detail/episodes";

type AnimeDetailData = DetailAnimeResponse["data"];

export function DetailMain({ anime }: { anime: AnimeDetailData }) {
  const genres = anime.genres ?? [];
  const episodesCount = anime.episodes?.length ?? 0;

  return (
    <div className="space-y-6 sm:space-y-7 min-w-0">
      <Card className="bg-card/65 border-foreground/10 backdrop-blur-xl shadow-xl rounded-2xl p-5 sm:p-7 lg:p-8">
        <div className="space-y-4 sm:space-y-5">
          <div className="flex flex-col gap-3">
            <Heading
              size="lg"
              className="text-2xl sm:text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-tight text-foreground break-words"
            >
              {anime.title}
            </Heading>

            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="info"
                pill
                size="sm"
                className="font-bold border-foreground/10 bg-foreground/5 text-foreground"
              >
                {episodesCount} Episodes
              </Badge>

              {genres.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-foreground/5 border border-foreground/10 px-3 py-1.5 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          <Separator className="opacity-10" />

          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
              Sinopsis
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
              {anime.synopsis}
            </p>
          </div>
        </div>
      </Card>

      <Card
        id="episodes"
        className="bg-card/65 border-foreground/10 backdrop-blur-xl shadow-xl rounded-2xl p-5 sm:p-7 lg:p-8"
      >
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
              Episodes
            </p>
            <Heading
              size="lg"
              className="text-xl sm:text-2xl font-black tracking-tight text-foreground"
            >
              Full Episode List
            </Heading>
          </div>

          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            {episodesCount} total
          </div>
        </div>

        <Separator className="opacity-10 my-5 sm:my-6" />

        <DetailEpisodes episodes={anime.episodes ?? []} />
      </Card>
    </div>
  );
}
