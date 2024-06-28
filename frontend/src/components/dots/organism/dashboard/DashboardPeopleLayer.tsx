"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import PostedItem from "@/components/PostedItem";
import type { Entity_Post } from "../../../../../api/@types";
import type { Session } from "next-auth";
import { vhToPx, vwToPx } from "@/lib/viewportToPixel";
type PanelProps = {
  jwtToken: string;
  session: Session;
  postedItems: Entity_Post[];
};
export default function DashboardPeopleLayer({
  jwtToken,
  postedItems,
  session,
}: PanelProps) {
  gsap.registerPlugin(useGSAP);
  const peopleContainer = useRef(null);

  useGSAP(
    () => {
      const boxes: HTMLElement[] = gsap.utils.toArray(".npc");

      for (const box of boxes) {
        // 一定間隔でx軸方向への移動、y軸方向への移動、停止をランダムに繰り返す
        gsap
          .timeline({ repeat: -1, yoyo: true })
          // x軸方向への移動
          .to(box, {
            x: (Math.random() - 0.5) * vhToPx(100),
            duration: Math.random() * 10,
            ease: "power1.inOut",
          })
          // y軸方向へ移動
          .to(box, {
            y: (Math.random() - 0.5) * vwToPx(100),
            duration: Math.random() * 10,
            ease: "power1.inOut",
          })
          // 停止
          .to(box, {
            duration: Math.random() * 10,
          });
      }
    },

    { scope: peopleContainer },
  );

  return (
    <div className="flex-1 flex-col gap-4 container">
      <div className="grid md:grid-cols-2 gap-4" ref={peopleContainer}>
        {postedItems.map((data) => (
          <div className="npc" key={data.id}>
            <PostedItem
              postedItem={data}
              jwtToken={jwtToken}
              isMe={Number(session.user.id) === data.user_id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
