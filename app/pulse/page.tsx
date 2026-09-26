import Link from "next/link";

export default function PulsePage() {
  const signals = [
    { region: "Northeast India", threat: "Moderate", color: "border-l-emerald-400/60", text: "text-emerald-300" },
    { region: "India Myanmar Border", threat: "High", color: "border-l-rose-400/60", text: "text-rose-300" },
    { region: "Taiwan Strait", threat: "Watch", color: "border-l-amber-300/60", text: "text-amber-200" },
    { region: "Cybersecurity", threat: "Active", color: "border-l-accent/60", text: "text-accent" },
  ];

  return (
    <main className="min-h-screen text-slate-100 p-4 md:p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="eyebrow">{"// Signal Overview"}</p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mt-3 bg-gradient-to-r from-white via-slate-100 to-accent bg-clip-text text-transparent">
          GENESIS PULSE
        </h1>

        <p className="text-slate-400 mt-4 max-w-2xl leading-7">
          Monitoring global signals, regional instability, markets,
          cybersecurity, and strategic developments.
        </p>

        <p className="text-slate-300 text-sm mt-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400"></span>
          </span>
          <span>Genesis is monitoring <span className="text-white font-medium">India Myanmar Border</span>.</span>
        </p>

        <div className="mt-6 h-px bg-gradient-to-r from-accent/60 via-line to-transparent"></div>

        {/* STATUS */}
        <section className="panel mt-8 p-6 md:p-8">
          <p className="eyebrow">{"// Status"}</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mt-1">
            Genesis Status
          </h2>

          <p className="text-slate-300 mt-3">
            Busy during daylight. Operational at night.
          </p>

          <div className="panel-inset mt-6 p-4 font-tactical text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Exhausted users connected:
            <span className="font-mono text-lg text-emerald-300 tabular-nums">5,661</span>
          </div>
        </section>

        {/* SIGNAL FEED */}
        <section className="panel mt-8 p-6 md:p-8">
          <p className="eyebrow">{"// Sigint Feed"}</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mt-1 mb-6">
            World Signal Feed
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {signals.map((item) => (
              <div
                key={item.region}
                className={`panel-inset border-l-2 ${item.color} p-4 hover:bg-white/[0.04] transition-colors`}
              >
                <h3 className="text-lg font-semibold text-white">
                  {item.region}
                </h3>

                <p className="text-slate-400 text-sm mt-1">
                  Threat Level: <span className={item.text}>{item.threat}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* INDIA MYANMAR */}
        <section className="panel mt-8 p-6 md:p-8">
          <p className="eyebrow">{"// Hotspot"}</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mt-1">
            India Myanmar Border
          </h2>

          <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse"></span>
            Threat Level: <span className="text-rose-300 font-medium">High</span>
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="panel-inset p-4">
              <h3 className="font-semibold text-white">
                Regional Security Watch
              </h3>

              <p className="text-slate-400 text-sm leading-6 mt-2">
                Border security, migration flows,
                smuggling activity, and geopolitical pressure
                remain important strategic concerns.
              </p>
            </div>

            <div className="panel-inset p-4">
              <h3 className="font-semibold text-white">
                Cybersecurity Signal
              </h3>

              <p className="text-slate-400 text-sm leading-6 mt-2">
                Digital fraud, phishing, cybercrime,
                and information warfare remain active
                challenges throughout the region.
              </p>
            </div>
          </div>
        </section>

        {/* PROJECT NEW NE */}
        <section className="panel mt-8 p-6 md:p-8">
          <p className="eyebrow">{"// Regional Focus"}</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mt-1">
            Project New NE
          </h2>

          <p className="text-slate-300 mt-3 leading-7">
            Northeast India is India&apos;s eastern gateway toward
            Myanmar, Bangladesh, ASEAN trade routes,
            logistics corridors, and future connectivity.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="panel-inset border-l-2 border-l-emerald-400/60 p-4">
              <h3 className="text-lg font-semibold text-emerald-300">
                Mizoram
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Gateway toward Myanmar and the Kaladan Corridor.
              </p>
            </div>

            <div className="panel-inset border-l-2 border-l-amber-300/60 p-4">
              <h3 className="text-lg font-semibold text-amber-200">
                Manipur
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Strategic ASEAN land bridge potential.
              </p>
            </div>
          </div>
        </section>

        {/* MARKET WATCH */}
        <section className="panel mt-8 p-6 md:p-8">
          <p className="eyebrow">{"// Markets"}</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mt-1">
            Market Watch
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="panel-inset p-4 hover:border-accent/40 transition-colors">
              <h3 className="text-white text-lg font-semibold">
                Bitcoin
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                High volatility global risk indicator.
              </p>
            </div>

            <div className="panel-inset p-4 hover:border-accent/40 transition-colors">
              <h3 className="text-white text-lg font-semibold">
                Gold
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Traditional defensive asset.
              </p>
            </div>
          </div>
        </section>

        <Link
          href="/"
          className="inline-flex items-center gap-1 mt-8 text-sm text-accent hover:text-white transition-colors"
        >
          <span aria-hidden>←</span> Return to Genesis Dashboard
        </Link>
      </div>
    </main>
  );
}
