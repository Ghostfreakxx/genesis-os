"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";

type MapTarget = {
  name: string;
  lat: number;
  lng: number;
  threat: string;
};

export default function GenesisMap({ target }: { target: MapTarget }) {
  const position: any = [target.lat, target.lng];

  return (
    <div className="h-[320px] rounded-2xl overflow-hidden border border-cyan-400">
      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            <strong>{target.name}</strong>
            <br />
            Threat: {target.threat}
          </Popup>
        </Marker>

        <CircleMarker
          center={position}
          radius={18}
          color={
            target.threat === "High"
              ? "red"
              : target.threat === "Medium"
              ? "yellow"
              : "cyan"
          }
        />

        <Marker position={[23.7271, 92.7176] as any}>
          <Popup>Aizawl Monitoring Node</Popup>
        </Marker>

        <Marker position={[24.817, 93.9368] as any}>
          <Popup>Manipur Conflict Zone</Popup>
        </Marker>

        <Marker position={[25.5788, 91.8933] as any}>
          <Popup>Shillong Intelligence Point</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}