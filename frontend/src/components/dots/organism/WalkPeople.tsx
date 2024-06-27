import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import ImgWithWalkMotion from "../atom/ImgWithWalkMotion";
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
      <ElementWithComment
        comment="ゾンビ"
        element={
          <ImgWithWalkMotion imgPath="/img/dots/character/character_monster_zombie_brown.svg" />
        }
      />
    </div>
  );
}
