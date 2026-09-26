type MapTarget = {
  name: string;
  lat: number;
  lng: number;
  threat: string;
};

export default function GenesisMap({ target }: { target: MapTarget }) {
  return (
    <div className="panel p-5 min-h-[320px]">
      <h2 className="text-2xl font-semibold tracking-tight text-white mb-4">
        Intelligence Summary
      </h2>

      <div className="panel-inset p-4 border-l-2 border-l-indigo-400/60">
        <p className="text-indigo-200 font-semibold">Current Focus</p>

        <h3 className="text-2xl font-semibold text-white mt-2">
          {target.name}
        </h3>

        <p className="text-slate-300 mt-3 leading-7">
          Genesis is scanning public news sources for geopolitical, border,
          cyber, and regional security signals. This is public OSINT style
          monitoring, not personal tracking.
        </p>
      </div>

      <div className="mt-4 panel-inset p-4 border-l-2 border-l-rose-400/60">
        <p className="text-rose-300 font-semibold">Brutal Read</p>

        <p className="text-slate-300 mt-2 leading-7">
          Geopolitics is usually not mysterious. It is bad leadership, weak
          institutions, economic pressure, border problems, and powerful people
          acting shocked when their decisions create chaos.
        </p>
      </div>

      <div className="mt-4 panel-inset p-4 font-mono text-sm">
        <p className="text-accent/85">&gt; signal zone loaded</p>
        <p className="text-accent/85">&gt; zone: {target.name}</p>
        <p className="text-accent/85">&gt; threat: {target.threat}</p>
        <p className="text-white animate-pulse">
          &gt; Genesis analysis engine online...
        </p>
      </div>
    </div>
  );
}