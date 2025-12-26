import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { streamService } from "@/services/stream-services";
import { Heading } from "@/components/selia/heading";
import { Button } from "@/components/selia/button";
import { WatchContent } from "@/components/watch/watch-content";
import type { StreamData } from "@/types/stream";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await streamService.getStreamData(slug).catch(() => null);

  if (!response?.data) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-background px-6 py-10 text-center">
        <Heading size="lg" className="text-primary font-black">
          404
        </Heading>
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground mt-2">
          Data Tidak Ditemukan
        </p>
        <Button
          variant="primary"
          pill
          render={<Link href="/" />}
          className="mt-8"
        >
          <ChevronLeft size={18} /> Kembali ke Home
        </Button>
      </div>
    );
  }

  const data: StreamData = response.data;

  const episodeMatch = data.title.match(/Episode\s+(\d+)/i);
  const episodeNumber = episodeMatch ? episodeMatch[1] : "??";

  return <WatchContent key={slug} data={data} episodeNumber={episodeNumber} />;
}
