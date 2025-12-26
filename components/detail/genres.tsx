export function DetailGenres({ genres }: { genres: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {genres.map((genre) => (
        <span key={genre} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          {genre}
        </span>
      ))}
    </div>
  );
}
