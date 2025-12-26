export interface Anime {
  title: string;
  slug: string;
  poster: string;
  episode: string;
}

export interface AnimeResponse {
  status: number;
  creator: string;
  page: number;
  data: Anime[];
}
