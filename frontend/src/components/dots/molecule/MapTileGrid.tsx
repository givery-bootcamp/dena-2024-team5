// components/TileGrid.tsx
import MapTile from "../atom/MapTile";

export default function MapTileGrid() {
  const tileTypes: string[] = [
    "ie1",
    "treasure",
    "kyokai",
    "ki",
    "hachiue",
    "shiro",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
  ];

  const generateRandomTiles = (count: number): string[] => {
    return Array.from({ length: count }, () => {
      const randomIndex = Math.floor(Math.random() * tileTypes.length);
      return tileTypes[randomIndex];
    });
  };
  const tiles = generateRandomTiles(1000).map((type) => (
    <MapTile key={type} mapType={type} />
  ));

  return (
    <>
      <style jsx>
        {`
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, 4em);
          }
        `}
      </style>
      <div className="grid">{tiles}</div>
    </>
  );
}
