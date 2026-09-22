"use client";

import { useEffect, useRef, useState } from "react";

interface Topic {
  label: string;
  threat: string;
}

interface CommandTerminalProps {
  topics: Topic[];
  activeLabel: string;
  threatLevel: string;
  tensionScore: number;
  callsign: string;
  onSelectTopic: (label: string) => void;
}

interface Line {
  id: number;
  kind: "input" | "output";
  text: string;
}

const HELP_TEXT = [
  "AVAILABLE COMMANDS:",
  "  help              show this list",
  "  status            current operational summary",
  "  topics            list monitored sectors",
  "  focus <sector>    switch active sector",
  "  scan              run a signal sweep",
  "  whoami            show operator callsign",
  "  clear             clear terminal output",
];

export default function CommandTerminal({
  topics,
  activeLabel,
  threatLevel,
  tensionScore,
  callsign,
  onSelectTopic,
}: CommandTerminalProps) {
  const [lines, setLines] = useState<Line[]>([
    {
      id: 0,
      kind: "output",
      text: "GENESIS COMMAND TERMINAL — TYPE 'help' TO BEGIN.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(1);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function pushLines(entries: Omit<Line, "id">[]) {
    setLines((prev) => [
      ...prev,
      ...entries.map((entry) => ({ ...entry, id: idCounter.current++ })),
    ]);
  }

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    pushLines([{ kind: "input", text: trimmed }]);

    const [command, ...rest] = trimmed.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    switch (command) {
      case "help":
        pushLines(HELP_TEXT.map((text) => ({ kind: "output", text })));
        break;

      case "status":
        pushLines(
          [
            `ACTIVE SECTOR: ${activeLabel}`,
            `THREAT LEVEL: ${threatLevel}`,
            `GLOBAL TENSION INDEX: ${tensionScore}/100`,
            `OPERATOR: ${callsign}`,
          ].map((text) => ({ kind: "output", text }))
        );
        break;

      case "topics":
      case "list":
        pushLines(
          topics.map((topic) => ({
            kind: "output",
            text: `  ${topic.label} — ${topic.threat}`,
          }))
        );
        break;

      case "focus":
      case "select": {
        const match = topics.find((topic) =>
          topic.label.toLowerCase().includes(arg)
        );
        if (match) {
          onSelectTopic(match.label);
          pushLines([{ kind: "output", text: `FOCUS ACQUIRED: ${match.label}` }]);
        } else {
          pushLines([
            {
              kind: "output",
              text: `UNKNOWN SECTOR: "${arg}". TYPE 'topics' TO LIST SECTORS.`,
            },
          ]);
        }
        break;
      }

      case "scan":
        pushLines(
          ["SWEEPING PUBLIC SOURCES...", "SCAN COMPLETE — NO NEW ANOMALIES."].map(
            (text) => ({ kind: "output", text })
          )
        );
        break;

      case "whoami":
        pushLines([{ kind: "output", text: `OPERATOR CALLSIGN: ${callsign}` }]);
        break;

      case "clear":
        setLines([]);
        return;

      default:
        pushLines([
          {
            kind: "output",
            text: `COMMAND NOT RECOGNIZED: "${command}". TYPE 'help'.`,
          },
        ]);
    }
  }

  return (
    <div className="border border-green-500 rounded-2xl bg-black shadow-[0_0_25px_#22c55e33] font-tactical text-sm">
      <div className="border-b border-green-500/40 px-4 py-2 flex items-center justify-between">
        <p className="text-green-400 tracking-widest text-xs uppercase">
          Command Terminal
        </p>
        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
      </div>

      <div ref={scrollRef} className="h-48 overflow-y-auto px-4 py-3 space-y-1">
        {lines.map((line) => (
          <p
            key={line.id}
            className={line.kind === "input" ? "text-cyan-300" : "text-green-400/90"}
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
        className="border-t border-green-500/40 px-4 py-2 flex items-center gap-2"
      >
        <span className="text-cyan-400">genesis@warroom:~$</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-600"
          placeholder="type a command..."
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
