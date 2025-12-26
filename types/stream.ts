export interface StreamServer {
  server: string;
  url: string;
}

export interface StreamData {
  title: string;
  poster: string;
  synopsis: string;
  episode?: string;
  stream_links: StreamServer[];
  download_links: StreamServer[];
  next_slug: string | null;
  prev_slug: string | null;
}

export interface StreamDataResponse {
  status: number;
  creator: string;
  data: StreamData;
}
