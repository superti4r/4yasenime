import { NextResponse } from "next/server";
import type { SearchAnimeResponse } from "@/types/search-anime";

const BASE_URL = process.env["4YASE_API"];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();

  if (!BASE_URL) {
    return NextResponse.json(
      {
        status: 500,
        creator: "",
        query: q,
        data: [],
      } satisfies SearchAnimeResponse,
      { status: 500 }
    );
  }

  if (!q) {
    return NextResponse.json(
      {
        status: 400,
        creator: "",
        query: q,
        data: [],
      } satisfies SearchAnimeResponse,
      { status: 400 }
    );
  }

  const base = BASE_URL.replace(/\/+$/, "");
  const upstreamUrl = `${base}/anime/stream/search/${encodeURIComponent(q)}`;

  try {
    const res = await fetch(upstreamUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 3600 },
    });

    const text = await res.text();

    try {
      const json = JSON.parse(text) as SearchAnimeResponse;
      return NextResponse.json(json, { status: res.status });
    } catch {
      return NextResponse.json(
        {
          status: 502,
          creator: "",
          query: q,
          data: [],
          error: "Upstream did not return JSON",
          upstreamStatus: res.status,
          upstreamUrl,
          upstreamSnippet: text.slice(0, 200),
        } as any,
        { status: 502 }
      );
    }
  } catch (e: any) {
    return NextResponse.json(
      {
        status: 500,
        creator: "",
        query: q,
        data: [],
        error: "Proxy fetch failed",
        message: e?.message ?? String(e),
      } as any,
      { status: 500 }
    );
  }
}
