"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import HudFrame from "@/app/components/HudFrame";
import ConflictStatusBadge from "@/app/components/ConflictStatusBadge";
import LiveNewsFeed from "@/app/components/livenewsfeed";
import { CONFLICT_ZONES } from "@/app/lib/conflict-zones";

const WorldConflictMap = dynamic(() => import("@/app/components/WorldConflictMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full rounded-xl border border-zinc-800 bg-black flex items-center justify-center text-zinc-500 font-tactical text-sm">
      Loading map...
    </div>
  ),
});

export default function TrackerPage() {
  const [activeId, setActiveId] = useState(CONFLICT_ZONES[0].id);
  const active = CONFLICT_ZONES.find((zone) => zone.id === activeId) ?? CONFLICT_ZONES[0];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-6 relative">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#22d3ee33_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee33_1px,transparent_1px)] bg-[size:45px_45px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-block text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
        >
          ← Command Center
        </Link>

        <HudFrame className="mt-4 border border-cyan-500/40 rounded-3xl p-6 bg-black/60 text-cyan-400">
          <p className="font-tactical text-xs uppercase tracking-[0.3em] text-cyan-500/70">
            {"// Real-Time Geopolitics"}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 mt-2">
            Global Conflict Tracker
          </h1>
          <p className="text-zinc-400 mt-3 leading-7 max-w-3xl">
            A curated map of the world&apos;s active wars, insurgencies, and
            flashpoints, each paired with a live public news scan. Zone
            positions and status are maintained by hand, not a live
            front-line feed — treat this as a starting map for orientation,
            not tactical intelligence.
          </p>
        </HudFrame>

        <HudFrame className="mt-6 border border-cyan-500 rounded-2xl p-4 bg-black shadow-[0_0_25px_#0891b244] text-cyan-500">
          <WorldConflictMap activeId={activeId} onSelect={setActiveId} />
        </HudFrame>

        <div className="grid md:grid-cols-3 gap-5 mt-6">
          <HudFrame className="border border-cyan-500 rounded-2xl p-5 bg-black shadow-[0_0_25px_#0891b244] text-cyan-500">
            <p className="font-tactical text-xs uppercase tracking-[0.25em] text-cyan-500/70 mb-4">
              {"// Active Hotspots"}
            </p>

            <div className="space-y-3">
              {CONFLICT_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveId(zone.id)}
                  className={`w-full text-left border rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] ${
                    zone.id === activeId
                      ? "border-red-500 bg-red-500/10 shadow-[0_0_25px_#ef444455]"
                      : "border-zinc-700 bg-[#0a0a0a] hover:border-zinc-500"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold">{zone.name}</p>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">{zone.region}</p>
                  <div className="mt-2">
                    <ConflictStatusBadge status={zone.status} />
                  </div>
                </button>
              ))}
            </div>
          </HudFrame>

          <HudFrame className="md:col-span-2 border border-cyan-500 rounded-2xl p-6 bg-black shadow-[0_0_25px_#0891b244] text-cyan-500">
            <p className="font-tactical text-xs uppercase tracking-[0.25em] text-cyan-500/70">
              {"// Zone Briefing"}
            </p>

            <div className="flex items-center justify-between gap-3 flex-wrap mt-1">
              <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 drop-shadow-[0_0_15px_#22d3ee]">
                {active.name}
              </h2>
              <ConflictStatusBadge status={active.status} />
            </div>

            <p className="text-zinc-500 text-sm mt-2">
              {active.region} · Active since {active.since}
            </p>

            <p className="text-zinc-300 leading-7 mt-4">{active.summary}</p>

            <div className="mt-6">
              <LiveNewsFeed topic={active.searchQuery} />
            </div>

            <a
              href={`https://news.google.com/search?q=${encodeURIComponent(
                active.searchQuery
              )}`}
              target="_blank"
              className="inline-block mt-6 text-green-400 underline hover:text-cyan-300 transition-colors"
            >
              Open live news search →
            </a>
          </HudFrame>
        </div>
      </div>
    </main>
  );
}
