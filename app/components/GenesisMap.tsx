"use client";

type MapTarget = {
  name: string;
  lat: number;
  lng: number;
  threat: string;
};

export default function GenesisMap({ target }: { target: MapTarget }) {
  return (
    <div className="border border-cyan-400 rounded-2xl p-5 bg-[#080808] min-h-[320px]">
      <h2 className="text-3xl font-bold text-cyan-300 mb-4">
        Intelligence Summary
      </h2>

      <div className="border border-purple-500 rounded-2xl p-4 bg-black">
        <p className="text-purple-400 font-bold">Current Focus</p>

        <h3 className="text-3xl font-bold text-cyan-300 mt-2">
          {target.name}
        </h3>

        <p className="text-zinc-300 mt-3 leading-7">
          Genesis is scanning public news sources for geopolitical, border,
          cyber, and regional security signals. This is public OSINT style
          monitoring, not personal tracking.
        </p>
      </div>

      <div className="mt-4 border border-red-500 rounded-2xl p-4 bg-black">
        <p className="text-red-400 font-bold">Brutal Read</p>

        <p className="text-zinc-300 mt-2 leading-7">
          Geopolitics is usually not mysterious. It is bad leadership, weak
          institutions, economic pressure, border problems, and powerful people
          acting shocked when their decisions create chaos.
        </p>
      </div>

      <div className="mt-4 border border-green-500 rounded-2xl p-4 bg-black font-mono">
        <p className="text-green-400">&gt; signal zone loaded</p>
        <p className="text-green-400">&gt; zone: {target.name}</p>
        <p className="text-green-400">&gt; threat: {target.threat}</p>
        <p className="text-cyan-400 animate-pulse">
          &gt; Genesis analysis engine online...
        </p>
      </div>
    </div>
  );
}