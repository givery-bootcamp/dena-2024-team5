import { auth } from "@/auth";
import TopPageScroller from "@/components/dots/organism/TopPageScroller";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="map-tile w-screen">
      <TopPageScroller />
    </main>
  );
}
