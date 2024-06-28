"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function Credits() {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  const container3 = useRef(null);
  const tl = useRef<GSAPTimeline | null>(null);
  useGSAP(
    () => {
      const boxes: HTMLElement[] = gsap.utils.toArray("p");

      //初期値
      gsap.set(boxes[0], { x: -100, opacity: 0 });
      gsap.set(boxes[1], { x: -100, opacity: 0 });
      gsap.set(boxes[2], { x: -100, opacity: 0 });
      gsap.set(boxes[3], { x: -100, opacity: 0 });
      gsap.set(boxes[4], { x: -100, opacity: 0 });
      gsap.set(boxes[5], { x: -100, opacity: 0 });

      // 1つずつ移動
      tl.current = gsap
        .timeline({
          // この要素が出てきた時に発火
          scrollTrigger: {
            trigger: container3.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
            // markers: true,
            pin: true,
          },
        })
        .to(boxes[0], { x: 0, opacity: 1, duration: 1, ease: "expo.out" })
        .to(boxes[1], { x: 0, opacity: 1, duration: 1, ease: "expo.out" })
        .to(boxes[2], { x: 0, opacity: 1, duration: 1, ease: "expo.out" })
        .to(boxes[3], { x: 0, opacity: 1, duration: 1, ease: "expo.out" })
        .to(boxes[4], { x: 0, opacity: 1, duration: 1, ease: "expo.out" })
        .to(boxes[5], { x: 0, opacity: 1, duration: 1, ease: "expo.out" });
    },
    { scope: container3 },
  );

  return (
    <div className="bg-gray-500 h-screen" ref={container3}>
      <h3 className="text-5xl text-center p-8">Credits</h3>
      <div className="p-8 grid place-content-center text-3xl">
        <p>hasegawa282</p>
        <p>uga-rosa</p>
        <p>txxxxc</p>
        <p>fastsnowy</p>
        <p>mouchimouchi</p>
        <p>usuyuki</p>
      </div>
    </div>
  );
}
