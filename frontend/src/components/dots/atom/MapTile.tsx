type TileProps = {
  mapType: string;
};

export default function MapTile({ mapType }: TileProps) {
  const getImageSrc = (): string => {
    switch (mapType) {
      case "ie1":
        return "/img/dots/building/ie_side_01_red.svg";
      case "treasure":
        return "/img/dots/building/treasure_red_gold.svg";
      case "kyokai":
        return "/img/dots/building/ki_02_01.svg";
      case "ki":
        return "/img/dots/building/hachiue_oke_pink.svg";
      case "hachiue":
        return "/img/dots/building/hachiue_oke_pink.svg";
      case "shiro":
        return "/img/dots/building/shiro_02_brown_roof_red.svg";
      default:
        return "/img/dots/bg/pattern_kabosu_02.png"; // デフォルトの画像
    }
  };

  return (
    <div
      className="w-[4em] h-[4em] bg-cover bg-center border border-blue-500"
      style={{ backgroundImage: `url(${getImageSrc()})` }}
    />
  );
}
