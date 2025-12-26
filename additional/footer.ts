import { Github, Instagram, LucideIcon } from "lucide-react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: LucideIcon;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { icon: Github, href: "https://github.com/superti4r" },
  { icon: Instagram, href: "https://instagram.com/superti4r"}
];

export const navLinks: FooterLink[] = [
  { label: "Trakteer", href: "#" },
  { label: "Changelog", href: "/changelog" },
];

export const supportLinks: FooterLink[] = [
  { label: "Selia", href: "https://selia.nauv.al/" },
  { label: "RESTAPI", href: "https://github.com/SankaVollereii" },
  { label: "Next.js", href: "https://nextjs.org/" },
  { label: "Vercel", href: "https://vercel.com/" },
];
