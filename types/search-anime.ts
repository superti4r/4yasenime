export interface SearchAnime {
  title: string;
  poster: string;
  slug: string;
  type: string;
  synopsis: string;
}

export interface SearchAnimeResponse {
  status: number;
  creator: string;
  query: string;
  data: SearchAnime[];
}
