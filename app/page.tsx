"use client";

import Link from "next/link";
import LiveNewsFeed from "./components/livenewsfeed";
import NewNEMap from "./components/NewNEMap";
import { useCallback, useState } from "react";
import MarketWatch from "./components/MarketWatch";
import IndiaMarketWatch from "./components/IndiaMarketWatch";
import NpcCounter from "./components/NpcCounter";
import WarRoomHud from "./components/WarRoomHud";
import HudFrame from "./components/HudFrame";
import ThreatBadge from "./components/ThreatBadge";
import TensionIndex from "./components/TensionIndex";
import CommandTerminal from "./components/CommandTerminal";
import IncidentTicker from "./components/IncidentTicker";
import AiBriefing from "./components/AiBriefing";
import { generateCallsign } from "./lib/callsign";
import { computeTensionScore } from "./lib/threat-levels";
import { useWatchlist } from "./lib/use-watchlist";
import SectorManager from "./components/SectorManager";
import KeywordWatch from "./components/KeywordWatch";
import type { FeedMatch } from "./components/livenewsfeed";

export default function HomePage() {
  const watch = useWatchlist();
  const { sectors, active, setActiveLabel, recordAlerts } = watch;
  const topics = sectors;
  const [callsign] = useState(generateCallsign);
  const tensionScore = computeTensionScore(topics.map((topic) => topic.threat));

  const handleMatches = useCallback(
    (matches: FeedMatch[]) =>
      recordAlerts(matches.map((match) => ({ ...match, sector: active.label }))),
    [recordAlerts, active.label]
  );

  return (
    <>
      <WarRoomHud alertLevel={active.threat} callsign={callsign} />

      <main className="min-h-screen text-slate-100 p-4 md:p-8 pb-16 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid pointer-events-none"></div>

        <div className="absolute -top-72 left-1/2 -translate-x-1/2 h-[760px] w-[760px] rounded-full overflow-hidden opacity-60 pointer-events-none">
          <div className="radar-sweep h-full w-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <HudFrame className="panel mb-8 p-6 md:p-8 text-accent/50">
            <p className="eyebrow">
              {"// Tactical Command Interface — Clearance Level 5"}
            </p>

            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mt-3 bg-gradient-to-r from-white via-slate-100 to-accent bg-clip-text text-transparent">
              GENESIS
              <span className="blink-cursor text-accent">_</span>
            </h1>

            <p className="font-tactical text-sm uppercase tracking-[0.2em] text-accent mt-2">
              Welcome, Resistance.
            </p>

            <p className="text-slate-400 mt-3">
              Monitoring global signals.
            </p>

            <p className="text-sm text-slate-300 mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400"></span>
              </span>
              <span>Genesis is monitoring <span className="text-white font-medium">{active.label}</span>.</span>
            </p>

            <Link
              href="/tracker"
              className="inline-flex items-center gap-2 mt-4 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-sm text-slate-300 hover:text-white hover:border-accent/50 hover:bg-accent/10 transition-colors"
            >
              Global Conflict Tracker: Live World Map
              <span aria-hidden className="text-accent">→</span>
            </Link>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <NpcCounter />
              <TensionIndex threats={topics.map((topic) => topic.threat)} />
            </div>

            <div className="relative mt-6 h-px overflow-hidden bg-line">
              <div className="scan-line absolute inset-0 bg-[linear-gradient(90deg,transparent_30%,var(--color-accent)_50%,transparent_70%)]"></div>
            </div>
          </HudFrame>

          <HudFrame className="mb-8 text-accent/50">
            <CommandTerminal
              sectors={sectors}
              active={active}
              tensionScore={tensionScore}
              callsign={callsign}
              onSelectTopic={setActiveLabel}
              onAddSector={watch.addSector}
              onRemoveSector={watch.removeSector}
              keywords={watch.keywords}
              onAddKeyword={watch.addKeyword}
              onRemoveKeyword={watch.removeKeyword}
              alerts={watch.alerts}
              onClearAlerts={watch.clearAlerts}
            />
          </HudFrame>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            <HudFrame className="panel p-5 md:sticky md:top-6 text-accent/50">
              <p className="eyebrow">
                {"// Sigint Feed"}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-white mt-2 mb-5">
                World Signal Feed
              </h2>

              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {topics.map((item) => (
                  <div key={item.label} className="relative group/sector">
                    <button
                      onClick={() => setActiveLabel(item.label)}
                      className={`w-full text-left rounded-xl border px-4 py-3 transition-all duration-200 ${
                        active.label === item.label
                          ? "border-accent/40 bg-accent/10 text-white shadow-[inset_3px_0_0_var(--color-accent)]"
                          : "border-line bg-white/[0.02] text-slate-300 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium truncate">
                          {item.label}
                          {item.custom && (
                            <span className="ml-2 font-tactical text-[10px] uppercase tracking-wider text-slate-500">
                              custom
                            </span>
                          )}
                        </p>
                        <ThreatBadge level={item.threat} />
                      </div>
                    </button>
                    {item.custom && (
                      <button
                        type="button"
                        onClick={() => watch.removeSector(item.label)}
                        aria-label={`Remove ${item.label}`}
                        className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full border border-line bg-slate-900 text-xs leading-none text-slate-400 hover:text-white hover:border-rose-400/60 opacity-100 md:opacity-0 md:group-hover/sector:opacity-100 focus:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <SectorManager onAdd={watch.addSector} />

              <KeywordWatch
                keywords={watch.keywords}
                alerts={watch.alerts}
                onAdd={watch.addKeyword}
                onRemove={watch.removeKeyword}
                onClearAlerts={watch.clearAlerts}
              />
            </HudFrame>

            <HudFrame className="panel md:col-span-2 p-6 md:p-8 text-accent/50">
              <p className="eyebrow">
                {"// Threat Assessment"}
              </p>

              <div className="flex items-center justify-between gap-3 flex-wrap mt-2">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  {active.label}
                </h2>
                <ThreatBadge level={active.threat} />
              </div>

              <p className="text-slate-400 mt-2 flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse"></span>
                Threat Level: <span className="text-rose-300 font-medium">{active.threat}</span>
              </p>

              <div className="panel-inset mt-6 p-5 border-l-2 border-l-rose-400/60">
                <p className="font-tactical text-[0.7rem] uppercase tracking-[0.25em] text-rose-300/80">
                  Brutal AI Read
                </p>

                <LiveNewsFeed
                  topic={active.search}
                  keywords={watch.keywords}
                  onMatches={handleMatches}
                />

                <p className="text-slate-300 leading-7 mt-5 text-[15px]">
                  {active.critic}
                </p>

                <AiBriefing topic={active.search} />
              </div>

              <a
                href={`https://news.google.com/search?q=${encodeURIComponent(
                  active.search
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 mt-6 text-sm text-accent hover:text-white transition-colors"
              >
                Open live news search <span aria-hidden>→</span>
              </a>

              <div className="mt-10">
                <NewNEMap />
              </div>

              <div className="mt-10">
                <MarketWatch />
              </div>

              <div className="mt-10">
                <IndiaMarketWatch />
              </div>
            </HudFrame>
          </div>
        </div>
      </main>

      <IncidentTicker
        activeLabel={active.label}
        alertLines={watch.alerts.map((alert) => `${alert.keyword} — ${alert.title}`)}
      />
    </>
  );
}
