"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function GameTitle() {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  const container = useRef(null);
  const tl = useRef<GSAPTimeline | null>(null);
  useGSAP(
    () => {
      const boxes: HTMLElement[] = gsap.utils.toArray("span");

      //初期値
      gsap.set(boxes[0], { x: -100, backgroundColor: "red" });
      gsap.set(boxes[1], { y: -100, backgroundColor: "blue" });
      gsap.set(boxes[2], { y: +100, backgroundColor: "green" });
      gsap.set(boxes[3], { x: +100, backgroundColor: "yellow" });
      gsap.set(boxes[4], { y: +100, backgroundColor: "brown" });
      gsap.set(boxes[5], { y: -100, backgroundColor: "pink" });

      // 1つずつ移動
      tl.current = gsap
        .timeline({
          // この要素が出てきた時に発火
          scrollTrigger: {
            trigger: container.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
            // markers: true,
            pin: true,
          },
        })
        .to(boxes[0], { x: 0, opacity: 1, duration: 1, ease: "expo.out" })
        .to(boxes[1], { y: 0, opacity: 1, duration: 1, ease: "expo.out" })
        .to(boxes[2], { y: 0, opacity: 1, duration: 1, ease: "expo.out" })
        .to(boxes[3], { x: 0, opacity: 1, duration: 1, ease: "expo.out" })
        .to(boxes[4], { y: 0, opacity: 1, duration: 1, ease: "expo.out" })
        .to(boxes[5], { y: 0, opacity: 1, duration: 1, ease: "expo.out" });
    },
    { scope: container },
  );

  return (
    <div className="h-60 bg-red-400" ref={container}>
      <div className=" p-20" id="show-title">
        <h1 className="flex justify-center text-8xl font-bold blink">
          <span id="title-1">ド</span>
          <span id="title-2">ッ</span>
          <span id="title-3">ト</span>
          <span id="title-4">ゾ</span>
          <span id="title-5">ン</span>
          <span id="title-6">ビ</span>
        </h1>
      </div>
    </div>
  );
}
