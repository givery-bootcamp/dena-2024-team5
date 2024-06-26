"use client";
import WalkPeople from "@/components/dots/organism/WalkPeople";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
};

export default function Page() {
  // const svgContainerRef = useRef(null);
  // const [people, setPeople] = useState([]);
  // useEffect(() => {
  //   const createPerson = () => {
  //     const id = Math.random().toString(36).substr(2, 9);
  //     setPeople((prev) => [...prev, { id }]);
  //   };
  //
  //   const animateImage = (id) => {
  //     const direction = Math.random() < 0.5 ? "left" : "right";
  //     const startX = direction === "left" ? "-100px" : "100vw";
  //     const endX = direction === "left" ? "100vw" : "-100px";
  //
  //     gsap.fromTo(
  //       `#${id}`,
  //       { x: startX },
  //       {
  //         x: endX,
  //         duration: 3,
  //         ease: "power1.inOut",
  //         onComplete: () => {
  //           setPeople((prev) => prev.filter((person) => person.id !== id));
  //         },
  //       },
  //     );
  //   };
  //
  //   const interval = setInterval(() => {
  //     createPerson();
  //   }, 1000); // 1秒ごとに新しい人を生成
  //
  //   people.forEach((person) => {
  //     animateImage(person.id);
  //   });
  //
  //   return () => clearInterval(interval);
  // }, [people]);
  // useEffect(() => {
  //   const loadSvg = async () => {
  //     const response = await fetch(
  //       "/img/dots/character/character_monster_zombie_brown_m.svg",
  //     );
  //     const svgText = await response.text();
  //     svgContainerRef.current.innerHTML = svgText;
  //
  //     // GSAP アニメーションを設定
  //     const tl = gsap.timeline({ repeat: -1, yoyo: true });
  //
  //     tl.to("#monster", { x: 300, duration: 2, ease: "power1.inOut" })
  //       .to(
  //         "#left-leg",
  //         {
  //           rotation: 30,
  //           transformOrigin: "top",
  //           duration: 0.5,
  //           ease: "power1.inOut",
  //         },
  //         0,
  //       )
  //       .to(
  //         "#right-leg",
  //         {
  //           rotation: -30,
  //           transformOrigin: "top",
  //           duration: 0.5,
  //           ease: "power1.inOut",
  //         },
  //         0,
  //       )
  //       .to(
  //         "#left-leg",
  //         {
  //           rotation: -30,
  //           transformOrigin: "top",
  //           duration: 0.5,
  //           ease: "power1.inOut",
  //         },
  //         0.5,
  //       )
  //       .to(
  //         "#right-leg",
  //         {
  //           rotation: 30,
  //           transformOrigin: "top",
  //           duration: 0.5,
  //           ease: "power1.inOut",
  //         },
  //         0.5,
  //       );
  //   };
  //
  //   loadSvg();
  // }, []);
  //
  return (
    <main className="w-screnn h-screen">
      <div className="nes-container is-dark with-title">
        <p className="title text-xl">Advice</p>
        <p className="text-2xl">404ページ</p>
      </div>
      <WalkPeople />
    </main>
  );
}
