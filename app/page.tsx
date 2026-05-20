import MarketWatch from "./components/MarketWatch";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-5xl font-bold text-cyan-300 animate-pulse">
            GENESIS
          </h1>

          <p className="text-zinc-400 mt-2">
            Late night operations online, Ghost.
          </p>

          <p className="text-sm text-cyan-500 mt-1">
            Genesis is monitoring India Myanmar Border.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <div className="border border-cyan-400 rounded-2xl p-5 bg-[#0a0a0a]">
            <p className="text-cyan-300 text-sm">
              Northeast India
            </p>

            <h2 className="text-4xl font-bold text-cyan-200 mt-2">
              Watch
            </h2>

            <p className="text-zinc-400 mt-2">
              Regional feed active
            </p>
          </div>

          <div className="border border-red-400 rounded-2xl p-5 bg-[#0a0a0a]">
            <p className="text-red-300 text-sm">
              Cyber Threat Level
            </p>

            <h2 className="text-4xl font-bold text-red-300 mt-2">
              Medium
            </h2>

            <p className="text-zinc-400 mt-2">
              Scam activity detected
            </p>
          </div>

          <div className="border border-green-400 rounded-2xl p-5 bg-[#0a0a0a]">
            <p className="text-green-300 text-sm">
              Active Surveillance
            </p>

            <h2 className="text-4xl font-bold text-green-300 mt-2">
              24/7
            </h2>

            <p className="text-zinc-400 mt-2">
              News API connected
            </p>
          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 border border-cyan-400 rounded-2xl p-5 bg-[#0a0a0a]">

            <h2 className="text-4xl font-bold text-cyan-300 mb-2">
              Live Geopolitical Feed
            </h2>

            <p className="text-sm text-cyan-500 mb-5">
              Current topic: India Myanmar Border
            </p>

            <div className="space-y-5">

              <div className="border border-zinc-700 rounded-xl overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80"
                  alt="news"
                  className="w-full h-[260px] object-cover"
                />

                <div className="p-4">
                  <h3 className="text-2xl font-bold text-cyan-200">
                    India strengthens border surveillance in Northeast region
                  </h3>

                  <p className="text-zinc-400 mt-3 leading-7">
                    Regional instability, smuggling routes, cyber fraud,
                    and geopolitical tension continue to shape strategic
                    discussions around India’s eastern frontier.
                  </p>

                  <p className="text-red-400 mt-4 font-bold">
                    AI Critic:
                    Most retail traders panic buy headlines after the move already happened.
                  </p>
                </div>
              </div>

              <div className="border border-zinc-700 rounded-xl overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                  alt="news"
                  className="w-full h-[260px] object-cover"
                />

                <div className="p-4">
                  <h3 className="text-2xl font-bold text-yellow-300">
                    Myanmar conflict pressure remains active
                  </h3>

                  <p className="text-zinc-400 mt-3 leading-7">
                    Analysts continue to monitor border movement,
                    refugee pressure, trafficking networks, and regional security risks.
                  </p>

                  <p className="text-red-400 mt-4 font-bold">
                    Brutal Reality:
                    Most people react emotionally to fear instead of preparing before crisis.
                  </p>
                </div>
              </div>

            </div>

          </div>

          <div className="space-y-6">

            <div className="border border-cyan-400 rounded-2xl p-5 bg-[#0a0a0a]">
              <h2 className="text-4xl font-bold text-cyan-300 mb-4">
                <div className="border border-purple-400 rounded-2xl p-5 bg-[#0a0a0a]">
  <h2 className="text-3xl font-bold text-purple-300">
    World Signal Feed
  </h2>

  <p className="text-zinc-400 mt-3 leading-7">
    Select a command below. Genesis will shift the public news focus for
    aspirants, researchers, and Mizoram-based observers.
  </p>

  <div className="mt-5 border border-cyan-500 rounded-xl p-4 bg-black">
    <p className="text-cyan-300 font-bold">
      {active.label}
    </p>

    <p className="text-zinc-400 mt-1">
      Threat: {active.threat}
    </p>

    <p className="text-red-400 mt-4 font-bold">
      Brutal AI Read
    </p>

    <p className="text-zinc-300 mt-2 leading-7">
      {active.critic}
    </p>

    <a
      href={`https://news.google.com/search?q=${encodeURIComponent(
        active.search
      )}`}
      target="_blank"
      className="inline-block mt-5 text-green-400 underline"
    >
      Open live news search →
    </a>
  </div>
</div>
              </h2>

              <div className="rounded-2xl border border-cyan-500 h-[260px] flex items-center justify-center relative overflow-hidden bg-black">

                <div className="w-40 h-40 rounded-full bg-cyan-500/20 animate-pulse absolute"></div>

                <div className="w-5 h-5 rounded-full bg-red-500 absolute top-[45%] left-[55%]"></div>

                <div className="w-4 h-4 rounded-full bg-yellow-400 absolute top-[50%] left-[60%]"></div>

                <div className="w-3 h-3 rounded-full bg-cyan-300 absolute top-[55%] left-[50%]"></div>

              </div>

              <div className="mt-4 border border-yellow-400 rounded-xl p-4 bg-black">
                <p className="text-zinc-400 text-sm">
                  Current Signal Zone
                </p>

                <h3 className="text-3xl font-bold text-yellow-300 mt-2">
                  India Myanmar Border
                </h3>

                <p className="text-red-400 mt-2">
                  Threat Level: High
                </p>
              </div>

            </div>

            <div className="border border-green-400 rounded-2xl p-5 bg-[#0a0a0a]">
              <h2 className="text-4xl font-bold text-green-300 mb-4">
                Command Console
              </h2>

              <div className="space-y-3">

                {[
                  "Northeast India",
                  "India Myanmar Border",
                  "China Taiwan",
                  "Cybersecurity",
                  "Global Conflict",
                ].map((item) => (
                  <div
                    key={item}
                    className="border border-green-500 rounded-lg px-4 py-3 text-green-300"
                  >
                    {">"} {item}
                  </div>
                ))}

              </div>

              <p className="text-green-400 mt-5 animate-pulse">
                {">"} Awaiting command.
              </p>
            </div>

          </div>

        </div>

        <div className="mt-8">
          <MarketWatch />
        </div>

      </div>
    </main>
  );
}

