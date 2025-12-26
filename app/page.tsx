import { animeService } from "@/services/latest-releases";
import { HeroSection } from "@/components/home/hero";
import { AnimePoster } from "@/components/home/poster";
import { Footer } from "@/components/extra/footer";
import Link from "next/link";
import { Anime } from "@/types/anime";

export default async function Home() {
  let animeList: Anime[] = [];
  let featured: Anime | null = null;

  try {
    const response = await animeService.getLatestReleases();
    animeList = response.data || [];
    featured = animeList[0] || null;
  } catch (err) {
    console.error("Gagal memuat data:", err);
  }

  const displayedAnime = animeList.slice(0, 4);

  return (
    <div className="w-full bg-background min-h-screen">
      {featured && <HeroSection featured={featured} />}

      <main className="px-6 md:px-16 relative z-20 -mt-16 pb-24 space-y-16">
        <section className="space-y-10">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary),0.6)]" />
              <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase text-foreground">
                Rilis Terbaru
              </h2>
            </div>
            <Link
              href="/browse"
              className="text-xs font-black text-muted-foreground hover:text-primary flex items-center gap-2 transition-all uppercase tracking-widest group"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {displayedAnime.map((anime) => (
              <AnimePoster key={anime.slug} anime={anime} />
            ))}
          </div>

          {displayedAnime.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground italic">
                Tidak ada data rilis terbaru saat ini.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
