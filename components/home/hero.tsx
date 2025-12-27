"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/selia/badge";
import { Button } from "@/components/selia/button";
import { Anime } from "@/types/anime";

export function HeroSection({ featured }: { featured: Anime }) {
  if (!featured) return null;

  return (
    <section className="relative w-full h-[52vh] sm:h-[58vh] md:h-[64vh] lg:h-[68vh] flex items-end px-6 md:px-16 pb-16 md:pb-20 overflow-hidden bg-background">
      <div className="absolute inset-0">
        <Image
          src={featured.poster}
          alt="Featured Background"
          referrerPolicy="no-referrer"
          fill
          className="w-full h-full object-cover object-center opacity-55"
          sizes="100vw"
          priority
          style={{ filter: "blur(28px) brightness(0.55) saturate(1.05)" }}
        />
        <div className="absolute inset-0 bg-background/25 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent hidden md:block" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-3xl space-y-5 md:space-y-6"
      >
        <div className="space-y-3 md:space-y-4">
          <Badge
            variant="primary"
            size="sm"
            pill
            className="font-bold tracking-widest uppercase"
          >
            Platform Stream Anime Gratis
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-foreground leading-[0.85] uppercase drop-shadow-sm">
            4yasenime
          </h1>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl drop-shadow-md">
          Nikmati koleksi anime terbaru secara gratis dengan kualitas terbaik.
          Pengalaman menonton tanpa iklan yang mengganggu hanya di{" "}
          <span className="text-foreground font-bold italic underline decoration-primary">
            4yasenime
          </span>
          .
        </p>
      </motion.div>
    </section>
  );
}
