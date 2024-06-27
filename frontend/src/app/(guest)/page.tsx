import { auth } from "@/auth";
import GameTitle from "@/components/dots/organism/top/GameTitle";
import KnockDownZombies from "@/components/dots/organism/top/KnockDownZombies";
import SiginInSignUpCard from "@/components/dots/organism/top/SiginInSingUpCard";
import TextBlink from "@/components/dots/atom/TextBlink";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="map-tile w-screen overflow-x-hidden">
      <div
        id="not-walk"
        className="w-full grid place-content-center h-screen border-2 border-red-900"
      >
        <TextBlink text="Scrollしてね..." />
      </div>
      {/* <KnockDownZombies /> */}
      <GameTitle />
      {/* <SiginInSignUpCard /> */}
    </main>
  );
}
