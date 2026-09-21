"use client";

import { useEffect, useState } from "react";
import AssetCard from "./AssetCard";
import {
  HOW_TO_INVEST,
  INDIA_MARKET_ASSETS,
  type IndiaMarketData,
  type IndiaMarketMode,
} from "@/app/lib/india-market-assets";

const REFRESH_INTERVAL_MS = 60_000;

const rupeeFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const PLAYBOOK = [
  {
    title: "SIP (Systematic Investment Plan)",
    detail:
      "Invest a fixed amount every month into a mutual fund or index fund — smooths out market ups and downs over time.",
  },
  {
    title: "Index Funds / ETFs",
    detail:
      "Low-cost funds that mirror an index like Nifty 50 or Sensex instead of betting on individual stocks.",
  },
  {
    title: "ELSS (Tax-saving Mutual Funds)",
    detail:
      "Equity funds with a 3-year lock-in that qualify for a tax deduction under Section 80C.",
  },
  {
    title: "PPF (Public Provident Fund)",
    detail:
      "Government-backed, 15-year lock-in, fixed interest — virtually risk-free for long-term safety.",
  },
  {
    title: "NPS (National Pension System)",
    detail:
      "Market-linked retirement savings with an extra tax benefit under Section 80CCD(1B).",
  },
];

export default function IndiaMarketWatch() {
  const [data, setData] = useState<IndiaMarketData | null>(null);
  const [mode, setMode] = useState<IndiaMarketMode | null>(null);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMarket() {
      try {
        const res = await fetch("/api/india-market");
        if (!res.ok) throw new Error("Request failed");
        const json: { data: IndiaMarketData; mode: IndiaMarketMode } =
          await res.json();
        if (cancelled) return;
        setData(json.data);
        setMode(json.mode);
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

  const statusLabel = error
    ? "● FEED ERROR"
    : mode === "live"
      ? "● LIVE NSE/BSE SCAN"
      : mode
        ? "● DEMO DATA"
        : "● CONNECTING";

  return (
    <section className="border border-orange-400 rounded-2xl p-6 bg-black shadow-[0_0_30px_#fb923c55]">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-4xl font-bold text-orange-300 animate-pulse">
          India Market Watch
        </h2>

        <div className="text-right">
          <p
            className={`font-mono text-sm ${
              error ? "text-red-400" : mode === "live" ? "text-green-400" : "text-yellow-400"
            }`}
          >
            {statusLabel}
          </p>
          {lastUpdated && (
            <p className="text-zinc-500 text-xs mt-0.5">
              Updated {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {INDIA_MARKET_ASSETS.map((asset) => {
          const quote = data?.[asset.symbol];
          const priceLabel =
            typeof quote?.price === "number"
              ? rupeeFormatter.format(quote.price)
              : null;

          return (
            <AssetCard
              key={asset.symbol}
              name={asset.name}
              ticker={asset.ticker}
              priceLabel={priceLabel}
              changePercent={quote?.changePercent ?? null}
              badge={asset.category === "index" ? "Index" : "Stock"}
              footer={
                <details>
                  <summary className="text-cyan-400 text-sm cursor-pointer select-none">
                    How to invest
                  </summary>
                  <p className="text-zinc-400 text-sm mt-2 leading-6">
                    {HOW_TO_INVEST[asset.category]}
                  </p>
                </details>
              }
            />
          );
        })}
      </div>

      <div className="mt-6 border border-green-500 rounded-xl p-4 bg-green-500/5">
        <p className="text-green-400 font-bold">Investment Playbook</p>

        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          {PLAYBOOK.map((item) => (
            <div key={item.title}>
              <p className="text-zinc-100 font-semibold text-sm">{item.title}</p>
              <p className="text-zinc-400 text-sm mt-1 leading-6">{item.detail}</p>
            </div>
          ))}
        </div>

        <p className="text-zinc-500 text-xs mt-4 border-t border-zinc-800 pt-3">
          General educational information only, not personalized investment
          advice. Markets carry risk, including loss of principal. Speak with
          a SEBI-registered financial advisor before investing.
        </p>
      </div>
    </section>
  );
}
