"use client";

import { useEffect, useState } from "react";
import AssetCard from "./AssetCard";
import { MARKET_ASSETS, type MarketData } from "@/app/lib/market-assets";

const REFRESH_INTERVAL_MS = 60_000;

export default function MarketWatch() {
  const [data, setData] = useState<MarketData | null>(null);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

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
        setLastUpdated(new Date());
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
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-4xl font-bold text-yellow-300 animate-pulse">
          Market Watch
        </h2>

        <div className="text-right">
          <p
            className={`font-mono text-sm ${
              error ? "text-red-400" : "text-green-400"
            }`}
          >
            {error ? "● FEED ERROR" : "● LIVE CRYPTO SCAN"}
          </p>
          {lastUpdated && (
            <p className="text-zinc-500 text-xs mt-0.5">
              Updated {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {MARKET_ASSETS.map((asset) => {
          const quote = data?.[asset.id];
          const priceLabel =
            typeof quote?.usd === "number"
              ? `$${quote.usd.toLocaleString()}`
              : null;

          return (
            <AssetCard
              key={asset.id}
              name={asset.name}
              ticker={asset.symbol}
              priceLabel={priceLabel}
              changePercent={quote?.usd_24h_change ?? null}
              footer={
                <p className="text-zinc-400 text-sm">
                  Real-time market data feed.
                </p>
              }
            />
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
