import { detailAnimeService } from "@/services/detail-services";
import type { DetailAnimeResponse } from "@/types/detail-anime";
import { DetailError } from "@/components/detail/detail-error";
import { DetailShell } from "@/components/detail/detail-shell";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response: DetailAnimeResponse | null = await detailAnimeService
    .getAnimeDetails(slug)
    .catch(() => null);

  if (!response?.data) {
    return <DetailError message="Gagal memuat detail anime." />;
  }

  return <DetailShell anime={response.data} />;
}
