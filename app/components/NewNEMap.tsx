export default function NewNEMap() {
  const zones = [
    {
      name: "Mizoram",
      role: "Gateway to Myanmar",
      signal: "Kaladan corridor, border trade, strategic hill routes",
    },
    {
      name: "Assam",
      role: "Logistics Core",
      signal: "Rail, river, air, and administrative hub of Northeast India",
    },
    {
      name: "Manipur",
      role: "ASEAN Land Bridge",
      signal: "Moreh route, India Myanmar Thailand highway potential",
    },
    {
      name: "Tripura",
      role: "Bangladesh Access",
      signal: "Shortest land connectivity toward Chittagong and mainland trade",
    },
  ];

  return (
    <section className="mt-10 rounded-2xl border border-cyan-400 p-6 shadow-[0_0_25px_rgba(34,211,238,0.35)]">
      <p className="text-green-400 text-sm font-bold">PROJECT NEW NE</p>

      <h2 className="mt-2 text-3xl font-bold text-cyan-200">
        India’s Eastern Strategic Frontier
      </h2>

      <p className="mt-3 max-w-3xl text-zinc-300">
        The Northeast is not India’s edge. It is India’s eastern gateway toward
        Myanmar, Bangladesh, ASEAN trade routes, border security, hydropower,
        logistics, and future connectivity.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
       <div className="relative min-h-[420px] rounded-xl border border-cyan-400 bg-black/50 overflow-hidden">
  <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

  <div className="absolute left-[45%] top-[10%] h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_cyan]" />
  <div className="absolute left-[35%] top-[35%] h-4 w-4 rounded-full bg-green-400 shadow-[0_0_20px_lime]" />
  <div className="absolute left-[55%] top-[48%] h-4 w-4 rounded-full bg-yellow-300 shadow-[0_0_20px_yellow]" />
  <div className="absolute left-[42%] top-[70%] h-4 w-4 rounded-full bg-red-400 shadow-[0_0_20px_red]" />

  <div className="absolute left-[10%] top-[52%] h-[2px] w-[75%] rotate-[-12deg] bg-cyan-300 shadow-[0_0_15px_cyan]" />
  <div className="absolute left-[35%] top-[42%] h-[2px] w-[45%] rotate-[35deg] bg-green-400 shadow-[0_0_15px_lime]" />
  <div className="absolute left-[40%] top-[60%] h-[2px] w-[35%] rotate-[80deg] bg-yellow-300 shadow-[0_0_15px_yellow]" />

  <p className="absolute left-[45%] top-[14%] text-xs text-cyan-200">ASSAM CORE</p>
  <p className="absolute left-[28%] top-[39%] text-xs text-green-300">MIZORAM</p>
  <p className="absolute left-[58%] top-[52%] text-xs text-yellow-200">MANIPUR</p>
  <p className="absolute left-[35%] top-[75%] text-xs text-red-300">TRIPURA</p>

  <div className="absolute bottom-4 left-4 rounded border border-cyan-400 bg-black/70 px-3 py-2 text-xs text-cyan-200">
    Eastern corridor simulation active
  </div>
 </div>

        <div className="space-y-4">
          {zones.map((zone) => (
            <div
              key={zone.name}
              className="rounded-xl border border-zinc-600 bg-zinc-900/70 p-4 hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]"
            >
              <h3 className="text-xl font-bold text-cyan-200">{zone.name}</h3>
              <p className="mt-1 text-green-400 font-semibold">{zone.role}</p>
              <p className="mt-2 text-zinc-300">{zone.signal}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-red-400 p-4 text-red-200">
        <strong>Strategic Warning:</strong> Without infrastructure, border
        stability, and trade planning, Northeast India remains underused despite
        its position as India’s gateway to ASEAN.
      </div>
    </section>
  );
}