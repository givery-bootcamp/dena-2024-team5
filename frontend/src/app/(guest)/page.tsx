import { auth } from "@/auth";
import TextBlink from "@/components/dots/atom/TextBlink";
import KirakiraConsole from "@/components/dots/atom/kirakiraConsole";
import GameDescription from "@/components/dots/organism/top/GameDescripion";
import GameTitle from "@/components/dots/organism/top/GameTitle";
import { SiginInSignUpCard } from "@/components/dots/organism/top/SiginInSingUpCard";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="map-tile w-screen overflow-x-hidden h-full">
      <KirakiraConsole text="ドットゾンビ" />
      <div id="not-walk" className="w-full grid place-content-center h-screen ">
        <TextBlink text="Scrollしてね..." />
      </div>
      <GameDescription />
      <GameTitle />
      <SiginInSignUpCard />
      {/* <Credits /> */}
    </main>
  );
}
