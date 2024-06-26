"use client";
import TextBlink from "@/components/dots/atom/TextBlink";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import ImgWithWalkMotion from "../atom/ImgWithWalkMotion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TopPageScroller() {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  const boxRef = useRef(null);
  useGSAP(() => {
    // アニメーションの設定
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });
    gsap.fromTo(
      boxRef.current,
      { x: -100 },
      {
        x: 500,
        scrollTrigger: {
          trigger: "#left-walk",
          start: "center center",
          end: "center center",
          markers: true,
          scrub: true,
        },
      },
    );
    gsap.to(boxRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: "#btm-walk",
        markers: true,
        scrub: true,
      },
    });
  }, []);
  return (
    <div>
      <TextBlink text="Scrollしてね..." />
      <div id="not-walk" className="w-full h-screen bg-yellow-200" />
      <div id="left-walk" className="w-full h-500 bg-red-200">
        <div ref={boxRef}>
          <ImgWithWalkMotion imgPath="/img/dots/character/character_monster_zombie_brown.svg" />
        </div>
      </div>
      <div id="btm-walk" className="w-full h-screen bg-blue-200" />
    </div>
  );
}
