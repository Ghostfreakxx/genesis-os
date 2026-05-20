"use client";

type MapTarget = {
  name: string;
  lat: number;
  lng: number;
  threat: string;
};

export default function GenesisMap({ target }: { target: MapTarget }) {
  const threatColor =
    target.threat === "High"
      ? "text-red-400 border-red-500"
      : target.threat === "Medium"
      ? "text-yellow-300 border-yellow-400"
      : "text-cyan-300 border-cyan-400";

  return (
    <div className="border border-cyan-400 rounded-2xl p-5 bg-[#080808] min-h-[320px]">
      <h2 className="text-3xl font-bold text-cyan-300 mb-4">
        Intelligence Focus
      </h2>

      <div className={`border rounded-2xl p-5 ${threatColor}`}>
        <p className="text-sm text-zinc-400">Current Signal Zone</p>

        <h3 className="text-4xl font-bold mt-2">
          {target.name}
        </h3>

        <p className="mt-3 text-xl">
          Threat Level: {target.threat}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        <div className="border border-cyan-700 rounded-xl p-3 bg-black">
          <p className="text-xs text-zinc-500">LAT</p>
          <p className="font-bold">{target.lat}</p>
        </div>

        <div className="border border-cyan-700 rounded-xl p-3 bg-black">
          <p className="text-xs text-zinc-500">LNG</p>
          <p className="font-bold">{target.lng}</p>
        </div>

        <div className="border border-cyan-700 rounded-xl p-3 bg-black">
          <p className="text-xs text-zinc-500">MODE</p>
          <p className="font-bold">OSINT</p>
        </div>
      </div>

      <div className="mt-5 border border-green-500 rounded-2xl p-4 bg-black font-mono">
        <p className="text-green-400">&gt; signal zone loaded</p>
        <p className="text-green-400">&gt; public source scan active</p>
        <p className="text-cyan-400 animate-pulse">
          &gt; Genesis analysis engine online...
        </p>
      </div>
    </div>
  );
}