import { auth } from "@/auth";
import { SignInSignOutButton } from "@/components/Buttons";
import DashboardBackgroundLayer from "@/components/dots/organism/dashboard/DashBoardBackgroundLayer";
import DashboardFooterLayer from "@/components/dots/organism/dashboard/DashboardFooterLayer";
import DashboardPeopleLayer from "@/components/dots/organism/dashboard/DashboardPeopleLayer";
import { aspidaClient } from "@/lib/aspidaClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")?.value ?? "";
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  try {
    const postedItems = await aspidaClient(jwtToken).posts.$get();
    return (
      <div className="relative h-screen w-screen overflow-x-hidden overflow-y-hidden">
        <div className="absolute inset-0 bg-gray-200 z-10">
          <DashboardBackgroundLayer />
        </div>
        <div className="absolute inset-0 z-20">
          <DashboardPeopleLayer
            postedItems={postedItems}
            session={session}
            jwtToken={jwtToken}
          />
        </div>
        <div className="fixed bottom-0 left-0 w-full z-30 bg-transparent">
          <DashboardFooterLayer jwtToken={jwtToken} session={session} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="justify-center container gap-4">
        <div className="nes-container is-dark with-title">
          <p className="title">Error</p>
          <p>データ取得に失敗しました…</p>
        </div>
        <SignInSignOutButton session={session} />
      </div>
    );
  }
}
