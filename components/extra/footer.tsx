"use client";

import React from "react";
import { Github, Twitter, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full pt-24 pb-12 border-t border-white/5 bg-background">
      <div className="px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-3xl font-black italic tracking-tighter text-primary">
              4YASENIME
            </h3>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
              Platform streaming anime terlengkap dan gratis di Indonesia.
              Nikmati ribuan judul anime dengan kualitas HD tanpa iklan yang
              mengganggu.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Youtube, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground uppercase tracking-widest text-xs">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Latest Releases
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Popular Anime
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Genres
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Schedule
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground uppercase tracking-widest text-xs">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  DMCA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} /> contact@4yasenime.com
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] font-medium">
            © 2025 4YASENIME • Made with Passion for Anime Community
          </p>
          <div className="flex items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Server
              Status: Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
