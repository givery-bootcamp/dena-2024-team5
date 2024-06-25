import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="grid w-full container max-w-6xl items-start gap-8 my-4 mx-auto md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <div className="w-full">
          <LeftMenu />
        </div>
        <div className="w-full">
          <main className="flex min-h-screen bg-background">
            <div className="flex-1 relative">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
