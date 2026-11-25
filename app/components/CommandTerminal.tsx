"use client";

import { useEffect, useRef, useState } from "react";
import type { AlertEntry } from "@/app/lib/alerts";
import { matchKeywords } from "@/app/lib/alerts";
import {
  createCustomSector,
  findSector,
  parseThreatLevel,
  THREAT_LEVELS,
  type Sector,
} from "@/app/lib/sectors";
import type { MutationResult } from "@/app/lib/use-watchlist";

interface CommandTerminalProps {
  sectors: Sector[];
  active: Sector;
  tensionScore: number;
  callsign: string;
  onSelectTopic: (label: string) => void;
  onAddSector: (sector: Sector) => MutationResult;
  onRemoveSector: (query: string) => MutationResult;
  keywords: string[];
  onAddKeyword: (keyword: string) => MutationResult;
  onRemoveKeyword: (keyword: string) => MutationResult;
  alerts: AlertEntry[];
  onClearAlerts: () => void;
}

interface Line {
  id: number;
  kind: "input" | "output" | "error";
  text: string;
}

type Entry = Omit<Line, "id">;

const COMMANDS: { name: string; usage: string; about: string }[] = [
  { name: "help", usage: "help", about: "show this list" },
  { name: "status", usage: "status", about: "current operational summary" },
  { name: "topics", usage: "topics", about: "list monitored sectors" },
  { name: "focus", usage: "focus <sector>", about: "switch active sector" },
  { name: "next", usage: "next | prev", about: "cycle through sectors" },
  { name: "prev", usage: "", about: "" },
  { name: "add", usage: "add <name> [level]", about: "monitor a new sector" },
  { name: "remove", usage: "remove <sector>", about: "drop a custom sector" },
  { name: "watch", usage: "watch <keyword>", about: "alert on headlines with keyword" },
  { name: "unwatch", usage: "unwatch <keyword>", about: "stop watching a keyword" },
  { name: "keywords", usage: "keywords", about: "list watched keywords" },
  { name: "alerts", usage: "alerts [clear]", about: "show or clear the alert log" },
  { name: "news", usage: "news", about: "pull headlines for active sector" },
  { name: "scan", usage: "scan", about: "sweep active sector for keyword hits" },
  { name: "brief", usage: "brief", about: "request an AI SITREP" },
  { name: "time", usage: "time", about: "world clocks" },
  { name: "history", usage: "history", about: "show recent commands" },
  { name: "whoami", usage: "whoami", about: "show operator callsign" },
  { name: "clear", usage: "clear", about: "clear terminal output" },
];

const HELP_TEXT = [
  "AVAILABLE COMMANDS:",
  ...COMMANDS.filter((command) => command.usage).map(
    (command) => `  ${command.usage.padEnd(20)}${command.about}`
  ),
  `  LEVELS: ${THREAT_LEVELS.join(", ")}`,
  "  TAB completes · ↑/↓ recalls history · '/' focuses terminal",
];

const CLOCKS = [
  { label: "UTC", zone: "UTC" },
  { label: "NEW DELHI", zone: "Asia/Kolkata" },
  { label: "TAIPEI", zone: "Asia/Taipei" },
  { label: "KYIV", zone: "Europe/Kyiv" },
  { label: "WASHINGTON", zone: "America/New_York" },
];

const out = (text: string): Entry => ({ kind: "output", text });
const err = (text: string): Entry => ({ kind: "error", text });
const fromResult = (result: MutationResult): Entry =>
  result.ok ? out(result.message) : err(result.message);

interface NewsArticle {
  title: string;
  description?: string;
  source?: string;
}

async function fetchNews(topic: string): Promise<{ articles: NewsArticle[]; mode: string }> {
  const res = await fetch(`/api/news?topic=${encodeURIComponent(topic)}`);
  const data = await res.json();
  return { articles: data.articles ?? [], mode: data.mode ?? "fallback" };
}

export default function CommandTerminal(props: CommandTerminalProps) {
  const { sectors, active, tensionScore, callsign, keywords, alerts } = props;

  const [lines, setLines] = useState<Line[]>([
    { id: 0, kind: "output", text: "GENESIS COMMAND TERMINAL — TYPE 'help' TO BEGIN." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(1);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  // "/" anywhere on the page (outside a text field) focuses the terminal.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable) {
        return;
      }
      event.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function pushLines(entries: Entry[]) {
    setLines((prev) =>
      [...prev, ...entries.map((entry) => ({ ...entry, id: idCounter.current++ }))].slice(-300)
    );
  }

  function cycle(step: number) {
    const index = sectors.findIndex((sector) => sector.label === active.label);
    const next = sectors[(index + step + sectors.length) % sectors.length];
    props.onSelectTopic(next.label);
    pushLines([out(`FOCUS ACQUIRED: ${next.label} [${next.threat}]`)]);
  }

  async function runNews() {
    pushLines([out(`PULLING HEADLINES: ${active.search}...`)]);
    try {
      const { articles, mode } = await fetchNews(active.search);
      if (articles.length === 0) {
        pushLines([err("NO HEADLINES RETURNED.")]);
        return;
      }
      pushLines([
        ...articles.slice(0, 5).map((article, index) =>
          out(`  ${index + 1}. ${article.title}${article.source ? ` — ${article.source}` : ""}`)
        ),
        out(mode === "live" ? "SOURCE: LIVE FEED" : "SOURCE: FALLBACK (no GNEWS_API_KEY or feed down)"),
      ]);
    } catch {
      pushLines([err("NEWS UPLINK FAILED.")]);
    }
  }

  async function runScan() {
    pushLines([out(`SWEEPING PUBLIC SOURCES FOR ${active.label.toUpperCase()}...`)]);
    try {
      const { articles, mode } = await fetchNews(active.search);
      if (mode !== "live") {
        pushLines([
          out(`SCAN COMPLETE — ${articles.length} FALLBACK ITEMS, NO LIVE FEED.`),
        ]);
        return;
      }
      if (keywords.length === 0) {
        pushLines([
          out(`SCAN COMPLETE — ${articles.length} LIVE SIGNALS.`),
          out("NO KEYWORDS WATCHED. USE 'watch <keyword>' TO SET ALERTS."),
        ]);
        return;
      }
      const hits = articles.flatMap((article) =>
        matchKeywords(`${article.title} ${article.description ?? ""}`, keywords).map(
          (keyword) => `  [${keyword}] ${article.title}`
        )
      );
      pushLines([
        out(`SCAN COMPLETE — ${articles.length} LIVE SIGNALS, ${hits.length} KEYWORD HITS.`),
        ...hits.slice(0, 8).map(out),
      ]);
    } catch {
      pushLines([err("SCAN FAILED — UPLINK UNAVAILABLE.")]);
    }
  }

  async function runBrief() {
    pushLines([out("REQUESTING AI SITREP...")]);
    try {
      const res = await fetch(`/api/briefing?topic=${encodeURIComponent(active.search)}`);
      const data: { briefing: string | null; mode: string } = await res.json();
      if (data.briefing) {
        pushLines([out(`SITREP // ${active.label.toUpperCase()}`), out(data.briefing)]);
      } else if (data.mode === "offline") {
        pushLines([err("AI UPLINK OFFLINE — SET ANTHROPIC_API_KEY TO ENABLE.")]);
      } else {
        pushLines([err("AI UPLINK ERROR.")]);
      }
    } catch {
      pushLines([err("AI UPLINK ERROR.")]);
    }
  }

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    pushLines([{ kind: "input", text: trimmed }]);
    setHistory((prev) => [...prev.filter((item) => item !== trimmed), trimmed].slice(-50));
    setHistoryIndex(null);

    const [head, ...rest] = trimmed.split(/\s+/);
    const command = head.toLowerCase();
    const arg = rest.join(" ");

    switch (command) {
      case "help":
        pushLines(HELP_TEXT.map(out));
        break;

      case "status":
        pushLines(
          [
            `ACTIVE SECTOR: ${active.label}`,
            `THREAT LEVEL: ${active.threat}`,
            `GLOBAL TENSION INDEX: ${tensionScore}/100`,
            `SECTORS MONITORED: ${sectors.length} (${sectors.filter((s) => s.custom).length} custom)`,
            `KEYWORDS WATCHED: ${keywords.length} · ALERTS LOGGED: ${alerts.length}`,
            `OPERATOR: ${callsign}`,
          ].map(out)
        );
        break;

      case "topics":
      case "list":
      case "sectors":
        pushLines(
          sectors.map((sector) =>
            out(
              `  ${sector.label === active.label ? "▸" : " "} ${sector.label} — ${sector.threat}${
                sector.custom ? " (custom)" : ""
              }`
            )
          )
        );
        break;

      case "focus":
      case "select": {
        const match = findSector(sectors, arg);
        if (match) {
          props.onSelectTopic(match.label);
          pushLines([out(`FOCUS ACQUIRED: ${match.label} [${match.threat}]`)]);
        } else {
          pushLines([err(`UNKNOWN SECTOR: "${arg}". TYPE 'topics' TO LIST SECTORS.`)]);
        }
        break;
      }

      case "next":
        cycle(1);
        break;

      case "prev":
        cycle(-1);
        break;

      case "add": {
        if (!arg) {
          pushLines([err("USAGE: add <name> [level]  e.g. add Sudan severe")]);
          break;
        }
        const last = rest[rest.length - 1];
        const level = rest.length > 1 ? parseThreatLevel(last) : null;
        const label = level ? rest.slice(0, -1).join(" ") : arg;
        const sector = createCustomSector(label, level ?? "Moderate");
        const result = props.onAddSector(sector);
        pushLines([fromResult(result)]);
        if (result.ok) props.onSelectTopic(sector.label);
        break;
      }

      case "remove":
      case "rm":
        if (!arg) {
          pushLines([err("USAGE: remove <sector>")]);
          break;
        }
        pushLines([fromResult(props.onRemoveSector(arg))]);
        break;

      case "watch":
        if (!arg) {
          pushLines([err("USAGE: watch <keyword>")]);
          break;
        }
        pushLines([fromResult(props.onAddKeyword(arg))]);
        break;

      case "unwatch":
        if (!arg) {
          pushLines([err("USAGE: unwatch <keyword>")]);
          break;
        }
        pushLines([fromResult(props.onRemoveKeyword(arg))]);
        break;

      case "keywords":
        pushLines(
          keywords.length === 0
            ? [out("NO KEYWORDS WATCHED.")]
            : [out(`WATCHING: ${keywords.join(", ")}`)]
        );
        break;

      case "alerts":
        if (arg.toLowerCase() === "clear") {
          props.onClearAlerts();
          pushLines([out("ALERT LOG CLEARED.")]);
        } else if (alerts.length === 0) {
          pushLines([out("ALERT LOG EMPTY.")]);
        } else {
          pushLines(
            alerts
              .slice(0, 10)
              .map((alert) => out(`  [${alert.keyword}] ${alert.title} (${alert.sector})`))
          );
        }
        break;

      case "news":
        void runNews();
        break;

      case "scan":
        void runScan();
        break;

      case "brief":
      case "sitrep":
        void runBrief();
        break;

      case "time":
      case "clock": {
        const now = new Date();
        pushLines(
          CLOCKS.map(({ label, zone }) =>
            out(
              `  ${label.padEnd(12)}${now.toLocaleTimeString("en-GB", {
                timeZone: zone,
                hour12: false,
              })}`
            )
          )
        );
        break;
      }

      case "history":
        pushLines(
          history.length === 0
            ? [out("NO HISTORY.")]
            : history.slice(-15).map((item, index) => out(`  ${index + 1}  ${item}`))
        );
        break;

      case "whoami":
        pushLines([out(`OPERATOR CALLSIGN: ${callsign}`)]);
        break;

      case "clear":
        setLines([]);
        return;

      default:
        pushLines([err(`COMMAND NOT RECOGNIZED: "${command}". TYPE 'help'.`)]);
    }
  }

  function complete() {
    const [head, ...rest] = input.split(" ");
    if (rest.length === 0) {
      const matches = COMMANDS.map((c) => c.name).filter((name) =>
        name.startsWith(head.toLowerCase())
      );
      if (matches.length === 1) setInput(`${matches[0]} `);
      else if (matches.length > 1) pushLines([out(matches.join("  "))]);
      return;
    }

    const command = head.toLowerCase();
    const partial = rest.join(" ").toLowerCase();
    let pool: string[] = [];
    if (["focus", "select"].includes(command)) pool = sectors.map((s) => s.label);
    else if (["remove", "rm"].includes(command))
      pool = sectors.filter((s) => s.custom).map((s) => s.label);
    else if (command === "unwatch") pool = keywords;

    const matches = pool.filter((item) => item.toLowerCase().startsWith(partial));
    if (matches.length === 1) setInput(`${head} ${matches[0]}`);
    else if (matches.length > 1) pushLines([out(matches.join("  "))]);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      complete();
    } else if (event.key === "ArrowUp") {
      if (history.length === 0) return;
      event.preventDefault();
      const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setInput(history[index]);
    } else if (event.key === "ArrowDown") {
      if (historyIndex === null) return;
      event.preventDefault();
      const index = historyIndex + 1;
      if (index >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(index);
        setInput(history[index]);
      }
    } else if (event.key === "Escape") {
      inputRef.current?.blur();
    }
  }

  return (
    <div className="panel overflow-hidden font-tactical text-sm">
      <div className="border-b border-line bg-white/[0.02] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <p className="text-slate-400 tracking-widest text-xs uppercase">
            Command Terminal
          </p>
        </div>
        <div className="flex items-center gap-3">
          <kbd className="hidden md:inline text-[10px] text-slate-500 border border-line rounded px-1.5 py-0.5">
            /
          </kbd>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="h-56 overflow-y-auto px-4 py-3 space-y-1"
        aria-live="polite"
      >
        {lines.map((line) => (
          <p
            key={line.id}
            className={`whitespace-pre-wrap break-words ${
              line.kind === "input"
                ? "text-white"
                : line.kind === "error"
                  ? "text-rose-300"
                  : "text-accent/85"
            }`}
          >
            {line.kind === "input" ? `genesis@warroom:~$ ${line.text}` : line.text}
          </p>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          runCommand(input);
          setInput("");
        }}
        className="border-t border-line bg-black/20 px-4 py-2.5 flex items-center gap-2"
      >
        <span className="text-accent shrink-0">genesis@warroom:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setHistoryIndex(null);
          }}
          onKeyDown={onKeyDown}
          className="flex-1 min-w-0 bg-transparent outline-none text-white caret-accent placeholder:text-slate-600"
          placeholder="type a command..."
          aria-label="Terminal command"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
