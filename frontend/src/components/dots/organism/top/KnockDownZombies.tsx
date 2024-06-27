"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImgWithWalkMotion from "../../atom/ImgWithWalkMotion";
export default function KnockDownZombies() {
  const nZombie = 10;
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  useGSAP(() => {
    // ゾンビ左から右に
    gsap.fromTo(
      ".zombie-left",
      { x: -50 },
      {
        x: 1000,
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#left-walk",
          start: "top top",
          end: "top center",
          markers: true,
          scrub: true,
        },
      },
    );
    // ゾンビ右から左に
    gsap.fromTo(
      ".zombie-right",
      { x: 2000 },
      {
        x: 500,
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#left-walk",
          markers: true,
          scrub: true,
        },
      },
    );
    // ゾンビ下に
    gsap.to(".zombie", {
      y: 1000,
      scrollTrigger: {
        trigger: "#btm-walk",
        markers: true,
        scrub: true,
      },
    });
  }, []);

  return (
    <div>
      <div id="left-walk" className="w-full h-screen border-2 border-blue-900">
        {/* ループでゾンビを大量生成  */}
        {Array.from({ length: nZombie }, (_, i) => i + 1).map((i) => (
          <div key={i} className="zombie-left zombie">
            <ImgWithWalkMotion imgPath="/img/dots/character/character_monster_zombie_brown.svg" />
          </div>
        ))}
        {Array.from({ length: nZombie }, (_, i) => i + 1).map((i) => (
          <div key={i} className="zombie-right zombie">
            <ImgWithWalkMotion imgPath="/img/dots/character/character_monster_zombie_brown.svg" />
          </div>
        ))}
      </div>
      <div id="btm-walk" className="w-full h-screen border-2 border-red-900" />
    </div>
  );
}
