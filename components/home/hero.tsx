"use client";

import { motion } from "motion/react";
import { Play, Info } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/selia/badge";
import { Button } from "@/components/selia/button";
import { Anime } from "@/types/anime";

export function HeroSection({ featured }: { featured: Anime }) {
  if (!featured) return null;

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] flex items-end px-6 md:px-16 pb-20 overflow-hidden bg-background">
      <div className="absolute inset-0 block">
        <img
          src={featured.poster}
          alt="Featured Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-50 transition-opacity duration-700"
          style={{ filter: "brightness(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent hidden md:block" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-3xl space-y-6"
      >
        <div className="space-y-4">
          <Badge
            variant="primary"
            size="sm"
            pill
            className="font-bold tracking-widest uppercase"
          >
            Platform Stream Anime Gratis
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-foreground leading-[0.85] uppercase drop-shadow-sm">
            4yasenime
          </h1>
        </div>

        <p className="text-sm md:text-lg text-muted-foreground leading-relaxed max-w-xl drop-shadow-md">
          Nikmati koleksi anime terbaru secara gratis dengan kualitas terbaik.
          Pengalaman menonton tanpa iklan yang mengganggu hanya di{" "}
          <span className="text-foreground font-bold italic underline decoration-primary">
            4yasenime
          </span>
          .
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Button
            variant="primary"
            size="lg"
            pill
            className="px-10 font-black gap-3 shadow-2xl shadow-primary/40 group"
            render={<Link href={`/watch/${featured.slug}`} />}
          >
            <Play
              size={20}
              fill="currentColor"
              className="group-hover:scale-110 transition-transform"
            />
            TONTON
          </Button>
          <Button
            variant="secondary"
            size="lg"
            pill
            className="px-8 font-bold gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md text-foreground border border-white/10"
          >
            <Info size={20} />
            DETAIL
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
