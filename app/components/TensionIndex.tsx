"use client";

import { useEffect, useState } from "react";
import { computeTensionScore, getTensionLevel } from "@/app/lib/threat-levels";

export default function TensionIndex({ threats }: { threats: string[] }) {
  const baseScore = computeTensionScore(threats);
  const [jitter, setJitter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setJitter(Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const score = Math.min(100, Math.max(0, baseScore + jitter));
  const level = getTensionLevel(score);

  return (
    <div className={`mt-5 border rounded-xl p-4 ${level.border} ${level.bg}`}>
      <div className="flex items-center justify-between gap-2">
        <p className="font-tactical text-xs uppercase tracking-[0.2em] text-zinc-400">
          Global Tension Index
        </p>
        <span className={`font-tactical text-xs uppercase tracking-wider ${level.text}`}>
          {level.label}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <div className="relative flex-1 h-2 rounded-full bg-zinc-900 overflow-hidden">
          <div
            className={`h-full ${level.bar} transition-all duration-700`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={`font-mono text-lg font-bold ${level.text}`}>{score}</span>
      </div>
    </div>
  );
}
