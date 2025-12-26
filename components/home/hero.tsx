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
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-end px-6 md:px-16 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={featured.poster}
          alt="Hero"
          className="w-full h-full object-cover object-top opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl space-y-6"
      >
        <div className="space-y-2">
          <Badge
            variant="primary"
            size="sm"
            pill
            className="font-black tracking-[0.2em] uppercase"
          >
            Platform Stream Anime Gratis
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter text-foreground leading-[0.95] uppercase drop-shadow-2xl">
            4yasenime
          </h1>
        </div>

        <p className="text-sm md:text-lg text-muted-foreground leading-relaxed max-w-lg">
          Platform streaming anime gratis. Nonton koleksi terbaru tanpa iklan
          yang mengganggu dengan antarmuka modern dan responsif.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            pill
            className="px-8 md:px-12 font-bold gap-3 flex-1 sm:flex-none shadow-xl shadow-primary/20"
            render={<Link href={`/watch/${featured.slug}`} />}
          >
            <Play size={18} fill="currentColor" />
            Tonton
          </Button>
          <Button
            variant="secondary"
            size="lg"
            pill
            className="px-6 md:px-8 font-bold gap-3 bg-white/5 backdrop-blur-md"
          >
            <Info size={18} />
            Detail
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
