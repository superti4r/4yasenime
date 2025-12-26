export type StreamLink = {
  server: string;
  url: string;
};

export type DownloadLink = {
  server: string;
  url: string;
};

export type WatchData = {
  title: string;
  poster: string;
  synopsis: string;
  prev_slug: string | null;
  next_slug: string | null;
  stream_links: StreamLink[];
  download_links: DownloadLink[];
};
