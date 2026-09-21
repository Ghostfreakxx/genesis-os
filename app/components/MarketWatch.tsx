"use client";

import { useEffect, useState } from "react";
import { MARKET_ASSETS, type MarketData } from "@/app/lib/market-assets";

const REFRESH_INTERVAL_MS = 60_000;

export default function MarketWatch() {
  const [data, setData] = useState<MarketData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadMarket() {
      try {
        const res = await fetch("/api/market");
        if (!res.ok) throw new Error("Request failed");
        const json: MarketData = await res.json();
        if (cancelled) return;
        setData(json);
        setError(false);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    loadMarket();
    const timer = setInterval(loadMarket, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="border border-yellow-400 rounded-2xl p-6 bg-black shadow-[0_0_30px_#eab30855]">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-yellow-300 animate-pulse">
          Market Watch
        </h2>

        <p
          className={`font-mono text-sm ${
            error ? "text-red-400" : "text-green-400"
          }`}
        >
          {error ? "● FEED ERROR" : "● LIVE CRYPTO SCAN"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {MARKET_ASSETS.map((asset) => {
          const price = data?.[asset.id]?.usd;
          const change = data?.[asset.id]?.usd_24h_change;
          const hasPrice = typeof price === "number";
          const hasChange = typeof change === "number";

          return (
            <div
              key={asset.id}
              className="border border-zinc-500 rounded-xl p-4 bg-[#090909] hover:border-cyan-400 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex justify-between">
                <h3 className="text-2xl font-bold text-cyan-300">
                  {asset.name}
                </h3>

                <span className="text-yellow-300 font-bold">
                  {asset.symbol}
                </span>
              </div>

              <p className="text-white text-2xl mt-3">
                {hasPrice ? `$${price.toLocaleString()}` : "Loading..."}
              </p>

              <p
                className={`mt-2 font-bold ${
                  !hasChange
                    ? "text-zinc-400"
                    : change >= 0
                      ? "text-green-400"
                      : "text-red-400"
                }`}
              >
                {hasChange ? `${change.toFixed(2)}% / 24h` : "Scanning..."}
              </p>

              <p className="text-zinc-400 mt-3">
                Real-time market data feed.
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border border-red-500 rounded-xl p-4 bg-red-500/5">
        <p className="text-red-400 font-bold">Trader Warning</p>
        <p className="text-zinc-200 mt-2">
          Live price does not mean live wisdom. Do not chase candles.
        </p>
      </div>
    </section>
  );
}
