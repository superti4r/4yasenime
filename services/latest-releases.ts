import { AnimeResponse } from "@/types/anime";

const BASE_URL = process.env["4YASE_API"];

export const animeService = {
  async getLatestReleases(): Promise<AnimeResponse> {
    if (!BASE_URL) {
      throw new Error("REST API base URL is not defined in environment variables.");
    }

    const targetUrl = `${BASE_URL.replace(/\/$/, "")}/anime/stream/latest`;

    try {
      const response = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch Failed Detail:", error);
      throw error;
    }
  },
};
