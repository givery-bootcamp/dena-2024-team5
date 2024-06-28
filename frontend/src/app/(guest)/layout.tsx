"use client";
import { ClientAudio } from "@/components/clientAudio";
import { useAtom } from "jotai";
import { isAudioOnAtom } from "@/lib/atom";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [_, setIsAudioOn] = useAtom(isAudioOnAtom);
  const [isAudioOn] = useAtom(isAudioOnAtom);    
  setIsAudioOn(true);

  return <div>{children}
  </div>;
}
