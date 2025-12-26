"use server";

export const getPingStatus = async (): Promise<{
  online: boolean;
  ms: number | null;
}> => {
  const BASE_URL = process.env["4YASE_API"];

  if (!BASE_URL) {
    return { online: false, ms: null };
  }

  const start = Date.now();
  const targetUrl = BASE_URL.replace(/\/$/, "");

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      cache: "no-store",
      headers: {
        "User-Agent": "4yasenime-status-checker",
      },
      signal: AbortSignal.timeout(5000),
    });

    const end = Date.now();

    return {
      online: response.ok || response.status === 404 || response.status === 405,
      ms: end - start,
    };
  } catch (error) {
    console.error("Ping Error:", error);
    return {
      online: false,
      ms: null,
    };
  }
};
