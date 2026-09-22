"use client";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { CONFLICT_ZONES } from "@/app/lib/conflict-zones";
import { CONFLICT_STATUS_STYLES } from "@/app/lib/conflict-status";

interface WorldConflictMapProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function WorldConflictMap({ activeId, onSelect }: WorldConflictMapProps) {
  return (
    <MapContainer
      center={[20, 15]}
      zoom={2}
      minZoom={2}
      worldCopyJump
      className="h-[420px] w-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {CONFLICT_ZONES.map((zone) => {
        const style = CONFLICT_STATUS_STYLES[zone.status];
        const isActive = zone.id === activeId;

        return (
          <CircleMarker
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={isActive ? 12 : 8}
            pathOptions={{
              color: style.dot,
              fillColor: style.dot,
              fillOpacity: isActive ? 0.9 : 0.55,
              weight: isActive ? 3 : 1.5,
            }}
            eventHandlers={{ click: () => onSelect(zone.id) }}
          >
            <Popup>
              <strong>{zone.name}</strong>
              <br />
              {style.label}
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
