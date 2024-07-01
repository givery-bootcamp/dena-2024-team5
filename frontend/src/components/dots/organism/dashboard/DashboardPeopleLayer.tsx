"use client";
import PostedItem from "@/components/PostedItem";
import { vhToPx, vwToPx } from "@/lib/viewportToPixel";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Session } from "next-auth";
import { useRef } from "react";
import type { Entity_Post } from "../../../../../api/@types";
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
        // a
        gsap.set(box, {
          x: (Math.random() - 0.5) * vwToPx(80),
          y: (Math.random() - 0.5) * vhToPx(80) + vhToPx(30),
        });
        // 一定間隔でx軸方向への移動、y軸方向への移動、停止をランダムに繰り返す
        gsap
          .timeline({ repeat: -1, yoyo: true })
          // x軸方向への移動
          .to(box, {
            x: (Math.random() - 0.5) * vwToPx(80),
            duration: Math.max(Math.random() * 10, 2),
            ease: "power1.inOut",
          })
          // y軸方向へ移動
          .to(box, {
            y: (Math.random() - 0.5) * vhToPx(80),
            duration: Math.max(Math.random() * 10, 2),
            ease: "power1.inOut",
          })
          // 停止
          .to(box, {
            duration: Math.max(Math.random() * 10, 2),
          })

          // x軸方向への移動
          .to(box, {
            x: (Math.random() - 0.5) * vwToPx(80),
            duration: Math.max(Math.random() * 10, 2),
            ease: "power1.inOut",
          })
          // y軸方向へ移動
          .to(box, {
            y: (Math.random() - 0.5) * vhToPx(80),
            duration: Math.max(Math.random() * 10, 2),
            ease: "power1.inOut",
          })
          // 停止
          .to(box, {
            duration: Math.max(Math.random() * 10, 2),
          })
          // x軸方向への移動
          .to(box, {
            x: (Math.random() - 0.5) * vwToPx(80),
            duration: Math.max(Math.random() * 10, 2),
            ease: "power1.inOut",
          })
          // y軸方向へ移動
          .to(box, {
            y: (Math.random() - 0.5) * vhToPx(80),
            duration: Math.max(Math.random() * 10, 2),
            ease: "power1.inOut",
          })
          // 停止
          .to(box, {
            duration: Math.max(Math.random() * 10, 2),
          });
      }
    },

    { scope: peopleContainer },
  );

  return (
    <div className="flex-1 flex-col gap-4 container">
      <div className="relative" ref={peopleContainer}>
        {postedItems.map((data) => (
          <div className="npc absolute top-1/2 left-1/2" key={data.id}>
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
