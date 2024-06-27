"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImgWithWalkMotion from "../../atom/ImgWithWalkMotion";
export default function KnockDownZombies() {
  const nZombie = 10;
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  useGSAP(() => {
    const leftZombies: HTMLElement[] = gsap.utils.toArray(".zombie-left");

    // ゾンビを中心に集める
    leftZombies.forEach((zombie, i) => {
      gsap.set(zombie, { x: -50 * i });
      gsap.to(zombie, {
        x: 1000 * i,
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#left-walk",
          start: "top bottom",
          end: "bottom center",
          // markers: true,
          scrub: true,
          pin: true,
        },
      });
    });

    // ゾンビ左から右に
    // gsap.fromTo(
    //   ".zombie-left",
    //   { x: -50 },
    //   {
    //     x: 1000,
    //     stagger: 0.1,
    //     scrollTrigger: {
    //       trigger: "#left-walk",
    //       start: "top bottom",
    //       end: "bottom center",
    //       markers: true,
    //       scrub: true,
    //     },
    //   },
    // );
    // // ゾンビ右から左に
    // gsap.fromTo(
    //   ".zombie-right",
    //   { x: 2000 },
    //   {
    //     x: 500,
    //     stagger: 0.1,
    //     scrollTrigger: {
    //       start: "top bottom",
    //       end: "bottom center",
    //       trigger: "#left-walk",
    //       // markers: true,
    //       scrub: true,
    //     },
    //   },
    // );
    // ゾンビ下に
    // gsap.to(".zombie", {
    //   y: 1000,
    //   scrollTrigger: {
    //     trigger: "#btm-walk",
    //     markers: true,
    //     scrub: true,
    //   },
    // });
  }, []);

  return (
    <div>
      <div
        id="left-walk"
        className="w-full h-screen border-2 border-blue-900 static"
      >
        {/* ループでゾンビを大量生成  */}
        {Array.from({ length: nZombie }, (_, i) => i + 1).map((i) => (
          <div key={i} className="zombie-left zombie absolute">
            <ImgWithWalkMotion imgPath="/img/dots/character/character_monster_zombie_brown.svg" />
          </div>
        ))}
        {Array.from({ length: nZombie }, (_, i) => i + 1).map((i) => (
          <div key={i} className="zombie-right zombie absolute">
            <ImgWithWalkMotion imgPath="/img/dots/character/character_monster_zombie_brown.svg" />
          </div>
        ))}
      </div>
      <div id="btm-walk" className="w-full h-screen border-2 border-red-900" />
    </div>
  );
}
