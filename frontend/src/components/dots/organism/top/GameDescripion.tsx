"use client";
import { vhToPx, vwToPx } from "@/lib/viewportToPixel";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import ImgWithWalkMotion from "../../atom/ImgWithWalkMotion";
import ImgWithJumpMotion from "../../atom/imgWithJumpMotion";

export default function GameDescription() {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  const nZombie = 10;
  const container = useRef(null);
  const tl = useRef<GSAPTimeline | null>(null);
  useGSAP(
    () => {
      //scrolleTrgerを利用して横向きに文字を動かす
      //
      gsap.set("h2", { x: vwToPx(100) });
      gsap.set(".zombie-waiwai", { opacity: 0, x: 0 });
      gsap.set("#kishi", { opacity: 1, y: vhToPx(-100) });
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top center",
            end: "bottom top",
            // markers: true,
            scrub: true,
            pin: true,
          },
        })
        .to("#desc-1", {
          x: vwToPx(-150),
          duration: 5,
        })
        .to(
          ".zombie-waiwai",
          {
            opacity: 1,
            // stagger: 0.1,
            rotate: 360,
          },
          "-=4",
        )
        .to(
          ".zombie-waiwai",
          {
            x: vwToPx(200),
            // stagger: 0.1,
          },
          "-=2",
        )
        .to("#desc-2", {
          x: vwToPx(-500),
          duration: 5,
        })
        .to(
          "#kishi",
          {
            y: vhToPx(0),
            duration: 3,
          },
          "-=7",
        )
        .to(
          "#kishi",
          {
            y: vhToPx(300),
            duration: 2,
          },
          "-=2",
        )
        .to(
          "#kishi",
          {
            opacity: 0,
          },
          "-=2",
        );
    },
    { scope: container },
  );

  return (
    <div ref={container} className="h-[100vw]">
      <h2 className="text-8xl font-bold w-[24em] bg-sky-50" id="desc-1">
        2024年、人類はインプレゾンビの危機に瀕していた。
      </h2>
      <div className="grid grid-cols-10 gap-4">
        {Array.from({ length: nZombie }, (_, i) => i + 1).map((i) => (
          <div key={i} className="zombie-waiwai">
            <ImgWithWalkMotion imgPath="/img/dots/character/character_monster_zombie_brown.svg" />
          </div>
        ))}
      </div>
      <h2 className="text-8xl font-bold blink w-full" id="desc-2">
        あなたは人類最後の希望です。
      </h2>
      <div id="kishi" className="grid place-content-center">
        <ImgWithJumpMotion imgPath="/img/dots/character/character_kishi_man_01_red_black.svg" />
      </div>
    </div>
  );
}
