"use client";

import { useState } from "react";
import {
  createCustomSector,
  MAX_LABEL_LENGTH,
  THREAT_LEVELS,
  type Sector,
} from "@/app/lib/sectors";
import type { MutationResult } from "@/app/lib/use-watchlist";

interface SectorManagerProps {
  onAdd: (sector: Sector) => MutationResult;
}

export default function SectorManager({ onAdd }: SectorManagerProps) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [threat, setThreat] = useState<string>("Moderate");
  const [search, setSearch] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setLabel("");
    setThreat("Moderate");
    setSearch("");
    setNote("");
    setError(null);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full mt-3 rounded-xl border border-dashed border-line px-4 py-3 text-sm text-slate-400 hover:text-white hover:border-accent/50 hover:bg-accent/5 transition-colors"
      >
        + Add sector
      </button>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const result = onAdd(createCustomSector(label, threat, search, note));
        if (result.ok) {
          reset();
          setOpen(false);
        } else {
          setError(result.message);
        }
      }}
      className="mt-3 panel-inset p-4 space-y-3 text-sm"
    >
      <p className="font-tactical text-xs uppercase tracking-[0.2em] text-slate-400">
        New sector
      </p>

      <label className="block">
        <span className="text-slate-400 text-xs">Name</span>
        <input
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          maxLength={MAX_LABEL_LENGTH}
          required
          autoFocus
          placeholder="e.g. Sudan"
          className="mt-1 w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-white outline-none focus:border-accent/60"
        />
      </label>

      <label className="block">
        <span className="text-slate-400 text-xs">Threat level</span>
        <select
          value={threat}
          onChange={(event) => setThreat(event.target.value)}
          className="mt-1 w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-white outline-none focus:border-accent/60"
        >
          {THREAT_LEVELS.map((level) => (
            <option key={level} value={level} className="bg-slate-900">
              {level}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-slate-400 text-xs">News search (optional)</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          maxLength={80}
          placeholder="defaults to the name"
          className="mt-1 w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-white outline-none focus:border-accent/60"
        />
      </label>

      <label className="block">
        <span className="text-slate-400 text-xs">Analyst note (optional)</span>
        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
          maxLength={160}
          placeholder="your one-line read"
          className="mt-1 w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-white outline-none focus:border-accent/60"
        />
      </label>

      {error && <p className="text-rose-300 text-xs font-tactical uppercase">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-lg border border-accent/50 bg-accent/15 px-3 py-2 text-white hover:bg-accent/25 transition-colors"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => {
            reset();
            setOpen(false);
          }}
          className="rounded-lg border border-line px-3 py-2 text-slate-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
