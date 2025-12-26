import type { StreamDataResponse } from "@/types/stream";

const BASE_URL = process.env["4YASE_API"];

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isStreamDataResponse(v: unknown): v is StreamDataResponse {
  if (!isObject(v)) return false;
  if (typeof v.status !== "number") return false;
  if (typeof v.creator !== "string") return false;
  if (!isObject(v.data)) return false;

  const d = v.data as Record<string, unknown>;
  if (typeof d.title !== "string") return false;
  if (typeof d.poster !== "string") return false;
  if (typeof d.synopsis !== "string") return false;
  if (!Array.isArray(d.stream_links)) return false;
  if (!Array.isArray(d.download_links)) return false;

  return true;
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const streamService = {
  async getStreamData(slug: string): Promise<StreamDataResponse> {
    if (!BASE_URL) {
      throw new Error("REST API base URL is not defined.");
    }

    const targetUrl = `${BASE_URL.replace(
      /\/$/,
      ""
    )}/anime/stream/episode/${slug}`;

    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
      cache: process.env.NODE_ENV === "production" ? "force-cache" : "no-store",
      next:
        process.env.NODE_ENV === "production"
          ? { revalidate: 3600 }
          : undefined,
    });

    const raw = await res.text().catch(() => "");
    const parsed = safeJsonParse(raw);

    if (isStreamDataResponse(parsed)) {
      if (res.ok) return parsed;

      if (parsed.status >= 200 && parsed.status < 300) {
        return parsed;
      }
    }

    if (!res.ok) {
      const preview = raw ? raw.slice(0, 400) : "";
      throw new Error(`Upstream HTTP ${res.status}. Body: ${preview}`);
    }

    throw new Error("Invalid response shape from API.");
  },
};
