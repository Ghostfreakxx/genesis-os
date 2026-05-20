"use client";

type MapTarget = {
  name: string;
  lat: number;
  lng: number;
  threat: string;
};

export default function GenesisMap({ target }: { target: MapTarget }) {
  return (
    <div className="h-[320px] rounded-2xl overflow-hidden border border-cyan-400 bg-black relative flex items-center justify-center">
      <div className="w-64 h-64 rounded-full border-2 border-cyan-400 bg-[radial-gradient(circle,#064b6b_0%,#02111d_60%,#000_100%)] shadow-[0_0_50px_#00ffff88] relative">
        <div className="absolute left-[48%] top-[50%] w-4 h-4 rounded-full bg-red-500 shadow-[0_0_20px_red]" />
        <div className="absolute left-[55%] top-[45%] w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_20px_yellow]" />
        <div className="absolute left-[42%] top-[58%] w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_cyan]" />
      </div>

      <div className="absolute bottom-4 left-4 bg-black/80 border border-cyan-400 rounded-xl p-3">
        <p className="text-cyan-300 font-bold">{target.name}</p>
        <p className="text-zinc-400 text-sm">Threat: {target.threat}</p>
      </div>
    </div>
  );
}