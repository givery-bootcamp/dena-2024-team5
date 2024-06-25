import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
export default function ZombiWithWalkMotion() {
  gsap.registerPlugin(useGSAP);
  const boxRef = useRef(null);

  useGSAP(() => {
    // アニメーションの設定
    gsap.to(boxRef.current, {
      rotate: 8,
      duration: 0.25,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <Image
      ref={boxRef}
      src="/img/dots/character/character_monster_zombie_brown.svg"
      width={50}
      height={50}
      alt="zombie"
      className="zombie"
    />
  );
}
