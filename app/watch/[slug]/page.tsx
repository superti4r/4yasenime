import { streamService } from "@/services/stream-services";
import { Heading } from "@/components/selia/heading";
import { Button } from "@/components/selia/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { WatchContent } from "@/components/watch/watch-content";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const response = await streamService.getStreamData(slug);
    const { data } = response;

    const episodeMatch = data.title.match(/Episode\s+(\d+)/i);
    const episodeNumber = episodeMatch ? episodeMatch[1] : "??";

    return <WatchContent data={data} episodeNumber={episodeNumber} />;
  } catch {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-background px-6 py-10 text-center">
        <Heading
          size="lg"
          className="text-primary font-black text-5xl sm:text-6xl"
        >
          404
        </Heading>
        <p className="mt-3 text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold text-muted-foreground">
          Data Tidak Ditemukan
        </p>
        <Button
          variant="primary"
          pill
          render={<Link href="/" />}
          className="mt-8 w-full max-w-xs"
        >
          <ChevronLeft size={18} /> Kembali ke Home
        </Button>
      </div>
    );
  }
}
