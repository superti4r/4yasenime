import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Theme } from "@/components/plugin/theme";
import { Dock } from "@/components/extra/dock";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "4yasenime - Anime Streaming Platform",
  description:
    "Stream and enjoy your favorite anime series and movies on 4yasenime, the ultimate destination for anime enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Theme
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen pb-24">{children}</main>
          <Dock />
        </Theme>
      </body>
    </html>
  );
}
