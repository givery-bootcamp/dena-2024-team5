import { v4 as uuidv4 } from "uuid";
import MapTile from "../atom/MapTile";

export default function MapTileGrid() {
  const tileTypes: string[] = [
    "ie1",
    "treasure",
    "kyokai",
    "ki",
    "hachiue",
    "shiro",
    // defaultを大量に用意して過疎化する
    ...Array.from({ length: 100 }, () => "default"),
  ];

  const generateRandomTiles = (
    count: number,
  ): { id: string; type: string }[] => {
    return Array.from({ length: count }, () => {
      const randomIndex = Math.floor(Math.random() * tileTypes.length);
      return { id: uuidv4(), type: tileTypes[randomIndex] };
    });
  };

  const tiles = generateRandomTiles(1000).map(({ id, type }) => (
    <MapTile key={id} mapType={type} />
  ));

  return (
    <>
      <style jsx>
        {`
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, 3em);
          }
        `}
      </style>
      <div className="grid">{tiles}</div>
    </>
  );
}
