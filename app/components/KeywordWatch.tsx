"use client";

import { useEffect, useState } from "react";
import type { AlertEntry } from "@/app/lib/alerts";
import type { MutationResult } from "@/app/lib/use-watchlist";

interface KeywordWatchProps {
  keywords: string[];
  alerts: AlertEntry[];
  onAdd: (keyword: string) => MutationResult;
  onRemove: (keyword: string) => MutationResult;
  onClearAlerts: () => void;
}

function timeAgo(at: number, now: number): string {
  const minutes = Math.max(0, Math.round((now - at) / 60000));
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export default function KeywordWatch({
  keywords,
  alerts,
  onAdd,
  onRemove,
  onClearAlerts,
}: KeywordWatchProps) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8">
      <p className="eyebrow">{"// Keyword Watch"}</p>
      <h3 className="text-lg font-semibold tracking-tight text-white mt-2">Alerts</h3>
      <p className="text-slate-500 text-xs mt-1 leading-5">
        Live headlines that mention a watched keyword are flagged and logged.
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const result = onAdd(draft);
          if (result.ok) {
            setDraft("");
            setError(null);
          } else {
            setError(result.message);
          }
        }}
        className="mt-3 flex gap-2"
      >
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={40}
          placeholder="e.g. drone, sanctions"
          aria-label="Keyword to watch"
          className="flex-1 min-w-0 rounded-lg border border-line bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-accent/60"
        />
        <button
          type="submit"
          className="rounded-lg border border-accent/50 bg-accent/15 px-3 py-2 text-sm text-white hover:bg-accent/25 transition-colors"
        >
          Watch
        </button>
      </form>

      {error && <p className="text-rose-300 text-xs font-tactical uppercase mt-2">{error}</p>}

      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 pl-2.5 pr-1 py-0.5 text-xs text-amber-200"
            >
              {keyword}
              <button
                type="button"
                onClick={() => onRemove(keyword)}
                aria-label={`Stop watching ${keyword}`}
                className="rounded-full px-1 text-amber-200/70 hover:text-white"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="font-tactical text-xs uppercase tracking-[0.2em] text-slate-400">
            Alert log ({alerts.length})
          </p>
          {alerts.length > 0 && (
            <button
              type="button"
              onClick={onClearAlerts}
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {alerts.length === 0 ? (
          <p className="text-slate-600 text-xs mt-2">No keyword hits yet.</p>
        ) : (
          <ul className="mt-2 space-y-1.5 max-h-64 overflow-y-auto pr-1">
            {alerts.map((alert) => (
              <li key={alert.id}>
                <a
                  href={alert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border border-line bg-white/[0.02] px-3 py-2 hover:border-amber-400/40 transition-colors"
                >
                  <p className="text-slate-200 text-xs leading-5 line-clamp-2">{alert.title}</p>
                  <p className="font-tactical text-[10px] uppercase tracking-wider text-amber-300/80 mt-1">
                    {alert.keyword} · {alert.sector} · {timeAgo(alert.at, Math.max(now, alert.at))}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
