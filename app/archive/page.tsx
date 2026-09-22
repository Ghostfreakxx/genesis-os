"use client";

import Link from "next/link";
import { useState } from "react";
import HudFrame from "@/app/components/HudFrame";
import { WW2_TIMELINE } from "@/app/lib/ww2-timeline";
import { CATEGORY_STYLES } from "@/app/lib/timeline-categories";

export default function ArchivePage() {
  const [activeYear, setActiveYear] = useState(WW2_TIMELINE[0].year);
  const active = WW2_TIMELINE.find((entry) => entry.year === activeYear) ?? WW2_TIMELINE[0];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-6 relative">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#22d3ee33_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee33_1px,transparent_1px)] bg-[size:45px_45px]"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-block text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
        >
          ← Command Center
        </Link>

        <HudFrame className="mt-4 border border-zinc-600 rounded-3xl p-6 bg-black/60 text-zinc-400">
          <p className="font-tactical text-xs uppercase tracking-[0.3em] text-zinc-500">
            {"// Historical Archive"}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-200 mt-2">
            Germany, 1933–1945
          </h1>
          <p className="text-zinc-400 mt-3 leading-7 max-w-3xl">
            A year-by-year record of the Nazi regime&apos;s rise, its aggression,
            and the genocide it committed. Presented for historical reference
            only — it does not endorse, glorify, or minimize anything
            described here. Some entries describe war crimes and genocide.
          </p>
        </HudFrame>

        <HudFrame className="mt-6 border border-zinc-700 rounded-2xl p-4 bg-black text-zinc-500">
          <p className="font-tactical text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">
            Select Year
          </p>
          <div className="flex flex-wrap gap-2">
            {WW2_TIMELINE.map((entry) => (
              <button
                key={entry.year}
                onClick={() => setActiveYear(entry.year)}
                className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all duration-200 ${
                  entry.year === activeYear
                    ? "border-cyan-400 bg-cyan-500/10 text-cyan-300 shadow-[0_0_15px_#22d3ee55]"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                }`}
              >
                {entry.year}
              </button>
            ))}
          </div>
        </HudFrame>

        <HudFrame className="mt-6 border border-cyan-500/40 rounded-2xl p-6 bg-black shadow-[0_0_25px_#0891b233] text-cyan-500">
          <p className="font-tactical text-xs uppercase tracking-[0.2em] text-cyan-500/70">
            {active.year}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mt-1">
            {active.headline}
          </h2>
          <p className="text-zinc-300 leading-7 mt-4">{active.summary}</p>

          <div className="mt-6 space-y-3">
            {active.events.map((event, index) => {
              const style = CATEGORY_STYLES[event.category];
              return (
                <div
                  key={index}
                  className={`border rounded-xl p-4 ${style.border} ${style.bg}`}
                >
                  <span
                    className={`text-[10px] font-tactical uppercase tracking-wider ${style.text}`}
                  >
                    {style.label}
                  </span>
                  <p className="text-zinc-100 mt-1 leading-6">{event.title}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 border border-red-500/60 rounded-xl p-5 bg-red-500/5">
            <p className="text-red-400 font-bold mb-2">Genesis Retrospective</p>
            <p className="text-zinc-200 leading-7">{active.retrospective}</p>
          </div>
        </HudFrame>
      </div>
    </main>
  );
}
