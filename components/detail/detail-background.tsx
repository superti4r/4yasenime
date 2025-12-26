export function DetailBackground({ poster }: { poster: string }) {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <div
        className="absolute inset-0 opacity-20 sm:opacity-25 lg:opacity-30 scale-125 saturate-[1.35] blur-[90px] sm:blur-[110px]"
        style={{
          backgroundImage: `url(${poster})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-background/55 backdrop-blur-[18px]" />
      <div className="absolute inset-x-0 top-0 h-44 sm:h-56 bg-gradient-to-b from-background via-background/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 sm:h-56 bg-gradient-to-t from-background via-background/60 to-transparent" />
    </div>
  );
}
