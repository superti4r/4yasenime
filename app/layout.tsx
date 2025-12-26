import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Theme } from "@/components/plugin/theme";
import { Dock } from "@/components/extra/dock";
import { Footer } from "@/components/extra/footer";
import { Toast } from "@/components/selia/toast";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "4yasenime - Anime Streaming Platform",
  description: "Ultimate destination for anime enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Theme
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col pb-[calc(env(safe-area-inset-bottom)+6rem)]">
            <main className="flex-1 relative">{children}</main>

            <Footer />

            <div className="fixed bottom-0 left-0 right-0 z-[110] pointer-events-none flex justify-center pb-4">
              <div className="pointer-events-auto">
                <Dock />
              </div>
            </div>
          </div>

          <Toast />
        </Theme>
      </body>
    </html>
  );
}
