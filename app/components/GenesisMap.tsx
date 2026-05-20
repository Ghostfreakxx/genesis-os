"use client";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";

type MapTarget = {
  name: string;
  lat: number;
  lng: number;
  threat: string;
};

function FlyToLocation({ target }: { target: MapTarget }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([target.lat, target.lng] as [number, number], 7, {
      duration: 1.5,
    });
  }, [target, map]);

  return null;
}

export default function GenesisMap({ target }: { target: MapTarget }) {
  return (
    <div className="h-[320px] rounded-2xl overflow-hidden border border-cyan-400">
      <MapContainer
        center={[target.lat, target.lng] as [number, number]}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <FlyToLocation target={target} />

        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[target.lat, target.lng] as [number, number]}>
          <Popup>
            <strong>{target.name}</strong>
            <br />
            Threat: {target.threat}
          </Popup>
        </Marker>

        <CircleMarker
          center={[target.lat, target.lng] as [number, number]}
          radius={18}
          color={
            target.threat === "High"
              ? "red"
              : target.threat === "Medium"
              ? "yellow"
              : "cyan"
          }
        >
          <Popup>{target.name} Signal Zone</Popup>
        </CircleMarker>

        <Marker position={[23.7271, 92.7176] as [number, number]}>
          <Popup>Aizawl Monitoring Node</Popup>
        </Marker>

        <Marker position={[24.817, 93.9368] as [number, number]}>
          <Popup>Manipur Conflict Zone</Popup>
        </Marker>

        <Marker position={[25.5788, 91.8933] as [number, number]}>
          <Popup>Shillong Intelligence Point</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}