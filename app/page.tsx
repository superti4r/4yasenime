import { animeService } from "@/services/latest-releases";
import { HeroSection } from "@/components/home/hero";
import { AnimePoster } from "@/components/home/poster";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const response = await animeService.getLatestReleases();
  const animeList = response.data || [];
  const featured = animeList[0];

  return (
    <div className="w-full pb-32 overflow-x-hidden">
      <HeroSection featured={featured} />

      <main className="px-6 md:px-16 space-y-12 relative z-10 -mt-10">
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--bg-anim-1),0.5)]" />
              <h2 className="text-lg md:text-2xl font-black italic tracking-tight uppercase">
                Rilis Terbaru
              </h2>
            </div>
            <Link
              href="/browse"
              className="text-[10px] md:text-xs font-black text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors uppercase tracking-[0.2em] group"
            >
              Lihat Semua{" "}
              <ChevronRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-10">
            {animeList.map((anime) => (
              <AnimePoster key={anime.slug} anime={anime} />
            ))}
          </div>
        </div>

        <footer className="pt-24 pb-12 text-center border-t border-white/5">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl md:text-4xl font-black italic tracking-tighter opacity-20">
              4YASENIME
            </h3>
            <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] font-medium leading-loose px-6">
              Streaming Anime Gratis Indonesia • Kualitas HD • Tanpa Hambatan
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
