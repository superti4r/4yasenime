import { Heading } from "@/components/selia/heading";
import Link from "next/link";

interface Episode {
  eps_title: string;
  eps_slug: string;
}

export function DetailEpisodes({ episodes }: { episodes: Episode[] }) {
  return (
    <div>
      <Heading size="md" className="font-bold mb-2 text-foreground">Daftar Episode</Heading>
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-2">
        {episodes.map((eps) => (
          <Link
            key={eps.eps_slug}
            href={`/watch/${eps.eps_slug}`}
            className="flex items-center gap-3 bg-background/80 hover:bg-primary/10 transition rounded-lg px-4 py-2 shadow-sm border border-white/5"
          >
            <span className="font-bold text-primary">{eps.eps_title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
