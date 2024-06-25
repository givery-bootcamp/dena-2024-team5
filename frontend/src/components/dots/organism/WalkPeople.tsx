import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ZombiWithWalkMotion from "../atom/ZombieWithWalkMotion";
import ElementWithComment from "../molecule/ElementWithComment";
export default function WalkPeople() {
  gsap.registerPlugin(useGSAP);
  const boxRef = useRef(null);

  useGSAP(() => {
    // アニメーションの設定
    gsap.to(boxRef.current, {
      x: 1000,
      duration: 25,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div ref={boxRef}>
      <ElementWithComment comment="ゾンビ" element={<ZombiWithWalkMotion />} />
    </div>
  );
}
