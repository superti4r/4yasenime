import Image from "next/image";

export function DetailPoster({ poster, title }: { poster: string; title: string }) {
  return (
    <div className="flex-shrink-0 flex justify-center md:block">
      <Image
        src={poster}
        alt={title}
        width={240}
        height={340}
        className="rounded-xl object-cover shadow-md w-40 h-56 md:w-60 md:h-80"
        priority
      />
    </div>
  );
}
