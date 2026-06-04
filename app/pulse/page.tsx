export default function PulsePage() {
  const signals = [
    { region: "Northeast India", threat: "Moderate", color: "border-green-500", glow: "hover:shadow-green-500/40" },
    { region: "India Myanmar Border", threat: "High", color: "border-red-500", glow: "hover:shadow-red-500/40" },
    { region: "Taiwan Strait", threat: "Watch", color: "border-yellow-500", glow: "hover:shadow-yellow-500/40" },
    { region: "Cybersecurity", threat: "Active", color: "border-cyan-500", glow: "hover:shadow-cyan-500/40" },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6 overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#22d3ee22_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee22_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse"></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-cyan-300 drop-shadow-[0_0_20px_#22d3ee] animate-pulse">
          GENESIS PULSE
        </h1>

        <p className="text-zinc-400 mt-4">
          Monitoring global signals, regional instability, markets,
          cybersecurity, and strategic developments.
        </p>

        <p className="text-cyan-400 mt-2 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500 animate-ping"></span>
          Genesis is monitoring India Myanmar Border.
        </p>

        <div className="mt-6 h-1 bg-cyan-500 rounded-full shadow-[0_0_20px_#22d3ee] animate-pulse"></div>

        {/* STATUS */}
        <section className="mt-8 border border-cyan-500 rounded-3xl p-6 shadow-[0_0_25px_#0891b255] hover:shadow-[0_0_45px_#22d3ee99] transition-all duration-500">
          <h2 className="text-3xl font-bold text-cyan-300">
            GENESIS STATUS
          </h2>

          <p className="text-zinc-300 mt-4">
            Busy during daylight. Operational at night.
          </p>

          <div className="mt-6 border border-green-500 rounded-2xl p-4 text-green-400 font-mono text-xl shadow-[0_0_20px_#22c55e55] animate-pulse">
            EXHAUSTED USERS CONNECTED: 5661
          </div>
        </section>

        {/* SIGNAL FEED */}
        <section className="mt-8 border border-cyan-500 rounded-3xl p-6 shadow-[0_0_25px_#0891b255]">
          <h2 className="text-4xl font-bold text-cyan-300 mb-6">
            World Signal Feed
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {signals.map((item) => (
              <div
                key={item.region}
                className={`border ${item.color} rounded-2xl p-4 hover:scale-[1.03] hover:shadow-2xl ${item.glow} transition-all duration-300`}
              >
                <h3 className="text-xl font-bold">
                  {item.region}
                </h3>

                <p className="text-zinc-400 mt-2">
                  Threat Level: {item.threat}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* INDIA MYANMAR */}
        <section className="mt-8 border border-red-500 rounded-3xl p-6 shadow-[0_0_25px_#ef444455] hover:shadow-[0_0_45px_#ef444499] transition-all duration-500">
          <h2 className="text-4xl font-bold text-cyan-300">
            India Myanmar Border
          </h2>

          <p className="text-red-400 mt-2 font-semibold flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
            Threat Level: High
          </p>

          <div className="mt-6 space-y-4">
            <div className="border border-cyan-500 rounded-2xl p-4 hover:scale-[1.02] transition-all duration-300">
              <h3 className="font-bold">
                Regional Security Watch
              </h3>

              <p className="text-zinc-400 mt-2">
                Border security, migration flows,
                smuggling activity, and geopolitical pressure
                remain important strategic concerns.
              </p>
            </div>

            <div className="border border-cyan-500 rounded-2xl p-4 hover:scale-[1.02] transition-all duration-300">
              <h3 className="font-bold">
                Cybersecurity Signal
              </h3>

              <p className="text-zinc-400 mt-2">
                Digital fraud, phishing, cybercrime,
                and information warfare remain active
                challenges throughout the region.
              </p>
            </div>
          </div>
        </section>

        {/* PROJECT NEW NE */}
        <section className="mt-8 border border-cyan-500 rounded-3xl p-6 shadow-[0_0_25px_#0891b255]">
          <h2 className="text-4xl font-bold text-cyan-300">
            Project New NE
          </h2>

          <p className="text-zinc-300 mt-4">
            Northeast India is India's eastern gateway toward
            Myanmar, Bangladesh, ASEAN trade routes,
            logistics corridors, and future connectivity.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="border border-green-500 rounded-2xl p-4 hover:scale-[1.03] hover:shadow-[0_0_25px_#22c55e88] transition-all duration-300">
              <h3 className="text-xl font-bold text-green-400">
                Mizoram
              </h3>

              <p className="text-zinc-400 mt-2">
                Gateway toward Myanmar and the Kaladan Corridor.
              </p>
            </div>

            <div className="border border-yellow-500 rounded-2xl p-4 hover:scale-[1.03] hover:shadow-[0_0_25px_#eab30888] transition-all duration-300">
              <h3 className="text-xl font-bold text-yellow-400">
                Manipur
              </h3>

              <p className="text-zinc-400 mt-2">
                Strategic ASEAN land bridge potential.
              </p>
            </div>
          </div>
        </section>

        {/* MARKET WATCH */}
        <section className="mt-8 border border-yellow-500 rounded-3xl p-6 shadow-[0_0_25px_#eab30855]">
          <h2 className="text-4xl font-bold text-yellow-400 drop-shadow-[0_0_15px_#eab308]">
            Market Watch
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="border border-zinc-600 rounded-2xl p-4 hover:border-cyan-400 hover:scale-[1.03] transition-all duration-300">
              <h3 className="text-cyan-300 text-xl font-bold">
                Bitcoin
              </h3>

              <p className="text-zinc-400 mt-2">
                High volatility global risk indicator.
              </p>
            </div>

            <div className="border border-zinc-600 rounded-2xl p-4 hover:border-yellow-400 hover:scale-[1.03] transition-all duration-300">
              <h3 className="text-cyan-300 text-xl font-bold">
                Gold
              </h3>

              <p className="text-zinc-400 mt-2">
                Traditional defensive asset.
              </p>
            </div>
          </div>
        </section>

        <a
          href="/"
          className="inline-block mt-8 text-green-400 underline hover:text-cyan-300 transition-colors"
        >
          Return to Genesis Dashboard
        </a>
      </div>
    </main>
  );
}