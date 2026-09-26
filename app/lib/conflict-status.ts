import type { ConflictStatus } from "@/app/lib/conflict-zones";

export interface ConflictStatusStyle {
  label: string;
  text: string;
  border: string;
  bg: string;
  /** Hex color for Leaflet path options, which can't use Tailwind classes. */
  dot: string;
}

export const CONFLICT_STATUS_STYLES: Record<ConflictStatus, ConflictStatusStyle> = {
  "active-war": {
    label: "Active War",
    text: "text-rose-400",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    dot: "#fb7185",
  },
  insurgency: {
    label: "Insurgency",
    text: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    dot: "#fb923c",
  },
  ceasefire: {
    label: "Fragile Ceasefire",
    text: "text-amber-300",
    border: "border-amber-400/30",
    bg: "bg-amber-400/10",
    dot: "#fcd34d",
  },
  tension: {
    label: "Territorial Tension",
    text: "text-sky-300",
    border: "border-sky-400/30",
    bg: "bg-sky-400/10",
    dot: "#7dd3fc",
  },
};
