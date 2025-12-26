"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { socialLinks, navLinks, supportLinks } from "@/additional/footer";
import { getPingStatus } from "@/services/footer-services";

export function Footer() {
  const [status, setStatus] = useState<{ online: boolean; ms: number | null }>({
    online: false,
    ms: null,
  });

  useEffect(() => {
    const fetchStatus = async () => {
      const result = await getPingStatus();
      setStatus(result);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 1200000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full pt-24 pb-12 border-t border-white/5 bg-background">
      <div className="px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-3xl font-black italic tracking-tighter text-primary uppercase">
              4YASENIME
            </h3>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm font-medium">
              Platform streaming anime terlengkap dan gratis di Indonesia.
              Nikmati ribuan judul anime dengan kualitas HD tanpa iklan yang
              mengganggu.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-primary/20 hover:text-primary transition-all group border border-white/5"
                >
                  <social.icon
                    size={20}
                    className="transition-transform group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h4 className="font-bold text-foreground uppercase tracking-[0.2em] text-[10px]">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground font-medium">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="font-bold text-foreground uppercase tracking-[0.2em] text-[10px]">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground font-medium">
              {supportLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black">
              © {new Date().getFullYear()} 4YASENIME — Anime Stream Platform
            </p>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
            <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <div
                className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  status.online
                    ? "bg-green-500 shadow-[0_0_10px_#22c55e]"
                    : "bg-red-500 shadow-[0_0_10px_#ef4444]"
                )}
              />
              <span
                className={status.online ? "text-green-500" : "text-red-500"}
              >
                SERVER {status.online ? "ONLINE" : "OFFLINE"}
              </span>
              {status.online && status.ms && (
                <span className="text-muted-foreground/50 font-mono">
                  [{status.ms}ms]
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
