export interface DetailAnimeEpisode {
  eps_title: string;
  eps_slug: string;
}

export interface DetailAnimeResponse {
  status: number;
  creator: string;
  data: {
    title: string;
    poster: string;
    synopsis: string;
    genres: string[];
    episodes: DetailAnimeEpisode[];
  };
}
