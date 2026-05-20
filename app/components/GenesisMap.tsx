"use client";

import "leaflet/dist/leaflet.css";
import * as ReactLeaflet from "react-leaflet";

type MapTarget = {
  name: string;
  lat: number;
  lng: number;
  threat: string;
};

const MapContainer: any = ReactLeaflet.MapContainer;
const TileLayer: any = ReactLeaflet.TileLayer;
const Marker: any = ReactLeaflet.Marker;
const Popup: any = ReactLeaflet.Popup;
const CircleMarker: any = ReactLeaflet.CircleMarker;

export default function GenesisMap({ target }: { target: MapTarget }) {
  const position = [target.lat, target.lng];

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

        <Marker position={[23.7271, 92.7176]}>
          <Popup>Aizawl Monitoring Node</Popup>
        </Marker>

        <Marker position={[24.817, 93.9368]}>
          <Popup>Manipur Conflict Zone</Popup>
        </Marker>

        <Marker position={[25.5788, 91.8933]}>
          <Popup>Shillong Intelligence Point</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
}