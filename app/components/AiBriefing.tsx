"use client";

import { useEffect, useState } from "react";

type BriefingMode = "live" | "offline" | "error";

interface BriefingResponse {
  briefing: string | null;
  mode: BriefingMode;
}

const MODE_LABEL: Record<BriefingMode, string> = {
  live: "Claude uplink active",
  offline: "Uplink offline",
  error: "Uplink error",
};

export default function AiBriefing({ topic }: { topic: string }) {
  const [briefing, setBriefing] = useState<string | null>(null);
  const [mode, setMode] = useState<BriefingMode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadBriefing() {
      setLoading(true);
      try {
        const res = await fetch(`/api/briefing?topic=${encodeURIComponent(topic)}`);
        const data: BriefingResponse = await res.json();
        if (cancelled) return;
        setBriefing(data.briefing);
        setMode(data.mode);
      } catch {
        if (!cancelled) {
          setBriefing(null);
          setMode("error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadBriefing();
    return () => {
      cancelled = true;
    };
  }, [topic]);

  return (
    <div className="mt-6 border border-purple-500 rounded-xl p-5 bg-purple-500/5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="text-purple-300 font-bold flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
          AI SITREP
        </p>

        {mode && (
          <span className="text-[10px] font-tactical uppercase tracking-wider text-zinc-500">
            {MODE_LABEL[mode]}
          </span>
        )}
      </div>

      {loading && (
        <p className="text-zinc-400 mt-3 text-sm animate-pulse">
          Synthesizing briefing...
        </p>
      )}

      {!loading && briefing && (
        <p className="text-zinc-200 mt-3 leading-7 text-sm">{briefing}</p>
      )}

      {!loading && !briefing && mode === "offline" && (
        <p className="text-zinc-500 mt-3 text-sm">
          AI briefing unavailable — set ANTHROPIC_API_KEY to enable live
          synthesis of the signal feed below.
        </p>
      )}

      {!loading && !briefing && mode === "error" && (
        <p className="text-zinc-500 mt-3 text-sm">
          AI uplink failed. Showing raw signal feed only.
        </p>
      )}
    </div>
  );
}
