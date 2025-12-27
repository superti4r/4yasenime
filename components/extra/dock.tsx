"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Separator } from "@/components/selia/separator";
import { cn } from "@/lib/utils";
import { Menu } from "@/additional/menu";
import { CommandTrigger } from "@/components/selia/command";

export function Dock() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 25,
          delay: 0.1,
        }}
        className={cn(
          "flex items-center gap-1.5 p-2",
          "bg-background/50 border border-border/40 shadow-2xl rounded-full",
          "pointer-events-auto backdrop-blur-xl"
        )}
      >
        {Menu.map((item, i) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <React.Fragment key={item.href}>
              {i !== 0 && (
                <Separator
                  orientation="vertical"
                  className="mx-0.5 h-5 self-center opacity-10 hidden sm:block"
                />
              )}

              {item.href === "/search" ? (
                <CommandTrigger className="relative">
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full transition-all duration-200",
                      "h-10 w-10 sm:h-12 sm:w-12",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                    )}
                  >
                    <Icon
                      size={20}
                      className="transition-transform duration-200"
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                </CommandTrigger>
              ) : (
                <Link href={item.href} className="relative">
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full transition-all duration-200",
                      "h-10 w-10 sm:h-12 sm:w-12",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                    )}
                  >
                    <Icon
                      size={20}
                      className="transition-transform duration-200"
                      strokeWidth={isActive ? 2.5 : 2}
                    />

                    {isActive && (
                      <motion.span
                        layoutId="active-dot"
                        className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </div>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
    </nav>
  );
}
