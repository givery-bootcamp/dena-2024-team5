import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "nes.css/css/nes.min.css";
import "./globals.css";
import { Toaster as Sonner } from "sonner";

const inter = DotGothic16({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ドットゾンビ",
  description: "team5でつくりました！",
  openGraph: {
    images: ["/img/dots/character/character_monster_zombie_brown.svg"],
  },
  icons: [
    {
      rel: "icon",
      url: "/img/dots/character/character_monster_zombie_brown.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Sonner />
      </body>
    </html>
  );
}
