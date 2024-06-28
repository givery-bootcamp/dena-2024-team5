"use client";
import MapTileGrid from "../../molecule/MapTileGrid";

export default function DashboardBackgroundLayer() {
  return (
    <div className="grid-master map-tile h-screen overflow-y-hidden">
      <MapTileGrid />
    </div>
  );
}
