"use client";
import { isAudioOnAtom } from "@/lib/atom";
import { useAtom } from "jotai";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [_, setIsAudioOn] = useAtom(isAudioOnAtom);
  const [isAudioOn] = useAtom(isAudioOnAtom);
  setIsAudioOn(true);

  return <div>{children}</div>;
}
