import { NextResponse } from "next/server";
import type { SearchAnimeResponse } from "@/types/search-anime";

const BASE_URL = process.env["AYASE_API"];

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isSearchAnimeResponse(v: unknown): v is SearchAnimeResponse {
  if (!isRecord(v)) return false;
  if (typeof v.status !== "number") return false;
  if (typeof v.creator !== "string") return false;
  if (typeof v.query !== "string") return false;
  if (!Array.isArray(v.data)) return false;
  return true;
}

function getErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Unknown error";
}

export async function GET(req: Request) {
  try {
    if (!BASE_URL) {
      return NextResponse.json(
        { status: 500, message: "REST API base URL is not defined." },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") ?? "").trim();

    if (q.length < 2) {
      return NextResponse.json(
        { status: 400, message: "Query minimal 2 huruf." },
        { status: 400 }
      );
    }

    const targetUrl = `${BASE_URL.replace(
      /\/$/,
      ""
    )}/anime/stream/search/${encodeURIComponent(q)}`;

    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { status: res.status, message: `Upstream error: ${res.status}` },
        { status: res.status }
      );
    }

    const json: unknown = await res.json();

    if (!isSearchAnimeResponse(json)) {
      return NextResponse.json(
        { status: 502, message: "Invalid upstream response format." },
        { status: 502 }
      );
    }

    return NextResponse.json(json, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json(
      { status: 500, message: getErrorMessage(err) },
      { status: 500 }
    );
  }
}
