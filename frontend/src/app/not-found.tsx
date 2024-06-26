"use client";
import WalkPeople from "@/components/dots/organism/WalkPeople";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
};

export default function Page() {
  return (
    <main className="w-screnn h-screen map-tile">
      <div className="nes-container is-dark with-title">
        <p className="title text-xl">Advice</p>
        <p className="text-2xl">404ページ</p>
      </div>
      <WalkPeople />
    </main>
  );
}
