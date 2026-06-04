"use client";

import { useEffect, useState } from "react";

export default function MarketWatch() {
  const [data, setData] = useState<any>(null);

  async function loadMarket() {
    const res = await fetch("/api/market");
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    loadMarket();
    const timer = setInterval(loadMarket, 60000);
    return () => clearInterval(timer);
  }, []);

  const assets = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "ripple", name: "XRP", symbol: "XRP" },
    { id: "cardano", name: "Cardano", symbol: "ADA" },
  ];

  return (
    <section className="border border-yellow-400 rounded-2xl p-6 bg-black shadow-[0_0_30px_#eab30855]">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-yellow-300 animate-pulse">
          Market Watch
        </h2>

        <p className="text-green-400 font-mono text-sm">
          ● LIVE CRYPTO SCAN
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {assets.map((asset) => {
          const price = data?.[asset.id]?.usd;
          const change = data?.[asset.id]?.usd_24h_change;

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
                {price ? `$${price.toLocaleString()}` : "Loading..."}
              </p>

              <p
                className={`mt-2 font-bold ${
                  change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {change ? `${change.toFixed(2)}% / 24h` : "Scanning..."}
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