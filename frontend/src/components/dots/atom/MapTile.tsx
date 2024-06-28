type TileProps = {
  mapType: string;
};

export default function MapTile({ mapType }: TileProps) {
  const getImageSrc = (): string => {
    switch (mapType) {
      case "ie1":
        return "/img/dots/building/ie_front_01_blue.svg";
      case "ie2":
        return "/img/dots/building/ie_front_01_green.svg";
      case "ie3":
        return "/img/dots/building/ie_side_01_red.svg";
      case "treasure":
        return "/img/dots/building/treasure_red_gold.svg";
      case "haka":
        return "/img/dots/building/haka_02.svg";
      case "ki":
        return "/img/dots/building/ki_02_01.svg";
      case "saku":
        return "/img/dots/building/saku_02_brown_center.svg";
      case "kibako":
        return "/img/dots/building/kibako_02_beige.svg";
      case "shiro":
        return "/img/dots/building/shiro_02_brown_roof_red.svg";
      case "tsubo":
        return "/img/dots/building/tsubo_brown_03.svg";
      case "kirikabu":
        return "/img/dots/building/kirikabu_01.svg";
      default:
        return "/img/dots/bg/pattern_kabosu_02.png"; // デフォルトの画像
    }
  };

  return (
    <div
      className="w-[3em] h-[3em] bg-cover bg-center "
      style={{ backgroundImage: `url(${getImageSrc()})` }}
    />
  );
}
