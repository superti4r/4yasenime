import { AnimeResponse } from "@/types/anime";

const BASE_URL = process.env["4YASE_API"];

export const animeService = {
  async getLatestReleases(): Promise<AnimeResponse> {
    if (!BASE_URL) {
      throw new Error("REST API base URL is not defined.");
    }

    const targetUrl = `${BASE_URL.replace(/\/$/, "")}/anime/stream/latest`;

    try {
      const response = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "application/json",
        },
        next: { revalidate: 3600 },
      });

      if (!response.ok) throw new Error(`Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Service Error:", error);
      throw error;
    }
  },
};
