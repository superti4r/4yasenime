import type { DetailAnimeResponse } from "@/types/detail-anime";
import { DetailBackground } from "@/components/detail/detail-background";
import { DetailTopbar } from "@/components/detail/detail-topbar";
import { DetailSidebar } from "@/components/detail/detail-sidebar";
import { DetailMain } from "@/components/detail/detail-main";

type AnimeDetailData = DetailAnimeResponse["data"];

export function DetailShell({ anime }: { anime: AnimeDetailData }) {
  const firstEpisode = anime.episodes?.[0]?.eps_slug ?? null;

  return (
    <div className="relative min-h-dvh bg-background text-foreground pb-12 sm:pb-16">
      <DetailBackground poster={anime.poster} />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10 space-y-6 sm:space-y-8">
        <DetailTopbar episodesCount={anime.episodes?.length ?? 0} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-4 xl:col-span-3">
            <DetailSidebar anime={anime} firstEpisode={firstEpisode} />
          </div>

          <div className="lg:col-span-8 xl:col-span-9 min-w-0">
            <DetailMain anime={anime} />
          </div>
        </div>
      </div>
    </div>
  );
}
