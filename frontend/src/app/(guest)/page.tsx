import { auth } from "@/auth";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 gap-4 p-4">
        <p>未ログイン</p>
        <div className="card nes-container is-rounded" style="width: 35rem;">
          <div className="card-body">
            <h5 className="card-title">NES.css</h5>
            <p className="card-text">
              NES.css is a NES-style (8bit-like) CSS Framework. NES.css only
              requires CSS and doesn't depend on any JavaScript.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
