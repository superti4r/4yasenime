"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { SearchAnime, SearchAnimeResponse } from "@/types/search-anime";
import { Loader2, Search } from "lucide-react";

function useDebouncedValue<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

type Props = {
  autoFocus?: boolean;
  onPick?: () => void;
  className?: string;
  inputClassName?: string;
  detailHref?: (slug: string) => string;
};

type SearchAnimeWithType = SearchAnime & { type?: string };

function getAnimeType(item: SearchAnime): string | null {
  const rec = item as unknown as Record<string, unknown>;
  const t = rec["type"];
  return typeof t === "string" ? t : null;
}

export function AnimeSearchPanel({
  autoFocus,
  onPick,
  className,
  inputClassName,
  detailHref = (slug) => `detail/${slug}`,
}: Props) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = React.useState("");
  const debounced = useDebouncedValue(query, 250);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<SearchAnime[]>([]);

  React.useEffect(() => {
    if (autoFocus) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [autoFocus]);

  React.useEffect(() => {
    const q = debounced.trim();

    if (q.length < 2) {
      setItems([]);
      setError(null);
      setLoading(false);
      return;
    }

    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/anime/search?q=${encodeURIComponent(q)}`,
          {
            signal: ac.signal,
            headers: { Accept: "application/json" },
          }
        );

        const json = (await res.json()) as SearchAnimeResponse;

        if (!res.ok) {
          setItems([]);
          setError(`Gagal fetch (HTTP ${res.status})`);
          return;
        }

        setItems(Array.isArray(json.data) ? json.data : []);
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setItems([]);
        setError("Terjadi error saat mencari.");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [debounced]);

  return (
    <div className={cn("w-full", className)}>
      <div
        data-slot="input-group"
        className={cn("flex items-center gap-2.5 px-2.5 py-2", "rounded-t-xl")}
      >
        <Search className="shrink-0 text-muted-foreground" size={18} />
        <input
          ref={inputRef}
          data-slot="autocomplete-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari anime... (min 2 huruf)"
          className={cn(
            "w-full bg-transparent outline-none",
            "text-sm md:text-base placeholder:text-muted-foreground",
            inputClassName
          )}
        />
        {loading ? (
          <Loader2
            className="shrink-0 animate-spin text-muted-foreground"
            size={18}
          />
        ) : null}
      </div>

      <div
        data-slot="autocomplete-list"
        className={cn(
          "max-h-[min(27rem,50dvh)] overflow-y-auto",
          "px-2.5 py-1.5"
        )}
      >
        {error ? (
          <div
            data-slot="autocomplete-empty"
            className="py-8 text-center text-sm text-muted"
          >
            {error}
          </div>
        ) : query.trim().length < 2 ? (
          <div
            data-slot="autocomplete-empty"
            className="py-8 text-center text-sm text-muted"
          >
            Ketik minimal 2 huruf untuk mulai mencari.
          </div>
        ) : items.length === 0 && !loading ? (
          <div
            data-slot="autocomplete-empty"
            className="py-8 text-center text-sm text-muted"
          >
            Tidak ada hasil.
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((it) => {
              const t = getAnimeType(it);
              return (
                <Link
                  key={it.slug}
                  href={detailHref(it.slug)}
                  onClick={onPick}
                  className={cn(
                    "block rounded-xl border border-border/40",
                    "bg-background/40 hover:bg-accent/30 transition-colors",
                    "p-2"
                  )}
                >
                  <div className="flex gap-3">
                    <img
                      src={it.poster}
                      alt={it.title}
                      className="h-16 w-12 rounded-lg object-cover border border-border/40"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="truncate font-medium">{it.title}</h4>
                        {t ? (
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {t}
                          </span>
                        ) : null}
                      </div>
                      <p className="line-clamp-2 text-xs text-muted-foreground mt-1">
                        {it.synopsis}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
