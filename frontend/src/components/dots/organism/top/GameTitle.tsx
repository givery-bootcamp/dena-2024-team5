"use client";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";

export default function GameTitle() {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  const container = useRef(null);
  const tl = useRef<GSAPTimeline | null>(null);
  useGSAP(
    () => {
      //HTMLElement内で取得されたclassNameがboxの要素を全て取得
      // 複数のアニメーションを作るなら、refはHTMLDivElementで取得した方が良いかも
      const boxes: HTMLElement[] = gsap.utils.toArray("span");

      // 座標の初期値は、CSSで設定した地点(x:0, y:0)
      gsap.set(boxes[0], { x: -100, backgroundColor: "red" });
      gsap.set(boxes[1], { y: -100, backgroundColor: "blue" });
      gsap.set(boxes[2], { y: +100, backgroundColor: "green" });
      gsap.set(boxes[3], { x: +100, backgroundColor: "yellow" });
      gsap.set(boxes[4], { x: +100, backgroundColor: "brown" });
      gsap.set(boxes[5], { x: +100, backgroundColor: "pink" });

      // タイムラインを使ってアニメーションを作成
      tl.current = gsap
        .timeline({
          // この要素が出てきた時に発火
          scrollTrigger: {
            trigger: container.current,
            start: "top center",
            scrub: true,
            markers: true,
            pin: true,
          },
        })
        .to(boxes[0], { x: 0, opacity: 1, duration: 1 })
        .to(boxes[1], { y: 0, opacity: 1, duration: 1 })
        .to(boxes[2], { y: 0, opacity: 1, duration: 1 })
        .to(boxes[3], { x: 0, opacity: 1, duration: 1 })
        .to(boxes[4], { x: 0, opacity: 1, duration: 1 })
        .to(boxes[5], { x: 0, opacity: 1, duration: 1 })
        .to(boxes, { y: +100, opacity: 0, duration: 1 });

      // オープニングアニメーションなので使わなくなった要素は非表示にする
      // .to(boxes, { display: "none", duration: 0 });
    },
    { scope: container },
  );

  return (
    <div className="h-screen" ref={container}>
      <div className="h-[200vh] p-20" id="show-title">
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
