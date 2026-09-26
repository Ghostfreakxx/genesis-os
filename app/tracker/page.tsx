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
    <div className="h-[420px] w-full rounded-xl border border-line bg-[#0b1020] flex items-center justify-center text-slate-500 font-tactical text-sm">
      Loading map...
    </div>
  ),
});

export default function TrackerPage() {
  const [activeId, setActiveId] = useState(CONFLICT_ZONES[0].id);
  const active = CONFLICT_ZONES.find((zone) => zone.id === activeId) ?? CONFLICT_ZONES[0];

  return (
    <main className="min-h-screen text-slate-100 p-4 md:p-8 relative">
      <div className="absolute inset-0 bg-grid pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <span aria-hidden className="text-accent">←</span> Command Center
        </Link>

        <HudFrame className="panel mt-4 p-6 md:p-8 text-accent/50">
          <p className="eyebrow">
            {"// Real-Time Geopolitics"}
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mt-2">
            Global Conflict Tracker
          </h1>
          <p className="text-slate-400 mt-3 leading-7 max-w-3xl">
            A curated map of the world&apos;s active wars, insurgencies, and
            flashpoints, each paired with a live public news scan. Zone
            positions and status are maintained by hand, not a live
            front-line feed — treat this as a starting map for orientation,
            not tactical intelligence.
          </p>
        </HudFrame>

        <HudFrame className="panel mt-6 p-3 text-accent/50">
          <WorldConflictMap activeId={activeId} onSelect={setActiveId} />
        </HudFrame>

        <div className="grid md:grid-cols-3 gap-5 mt-6">
          <HudFrame className="panel p-5 text-accent/50">
            <p className="eyebrow mb-4">
              {"// Active Hotspots"}
            </p>

            <div className="space-y-2">
              {CONFLICT_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveId(zone.id)}
                  className={`w-full text-left border rounded-xl px-4 py-3 transition-all duration-200 ${
                    zone.id === activeId
                      ? "border-accent/40 bg-accent/10 text-white shadow-[inset_3px_0_0_var(--color-accent)]"
                      : "border-line bg-white/[0.02] text-slate-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium">{zone.name}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{zone.region}</p>
                  <div className="mt-2">
                    <ConflictStatusBadge status={zone.status} />
                  </div>
                </button>
              ))}
            </div>
          </HudFrame>

          <HudFrame className="panel md:col-span-2 p-6 md:p-8 text-accent/50">
            <p className="eyebrow">
              {"// Zone Briefing"}
            </p>

            <div className="flex items-center justify-between gap-3 flex-wrap mt-1">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                {active.name}
              </h2>
              <ConflictStatusBadge status={active.status} />
            </div>

            <p className="text-slate-500 text-sm mt-2">
              {active.region} · Active since {active.since}
            </p>

            <p className="text-slate-300 leading-7 mt-4">{active.summary}</p>

            <div className="mt-6 border-t border-line pt-2">
              <LiveNewsFeed topic={active.searchQuery} />
            </div>

            <a
              href={`https://news.google.com/search?q=${encodeURIComponent(
                active.searchQuery
              )}`}
              target="_blank"
              className="inline-flex items-center gap-1 mt-6 text-sm text-accent hover:text-white transition-colors"
            >
              Open live news search <span aria-hidden>→</span>
            </a>
          </HudFrame>
        </div>
      </div>
    </main>
  );
}
