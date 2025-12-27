"use server";

export const getPingStatus = async (): Promise<{
  online: boolean;
  ms: number | null;
  code: number | null;
}> => {
  const BASE_URL = process.env["AYASE_API"];
  if (!BASE_URL) return { online: false, ms: null, code: null };

  const base = BASE_URL.replace(/\/$/, "");
  const targetUrl = `${base}/anime/stream/episode/__ping__`;
  const start = Date.now();

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(2500),
    });

    const ms = Date.now() - start;

    return {
      online: true,
      ms,
      code: response.status,
    };
  } catch {
    return { online: false, ms: null, code: null };
  }
};
