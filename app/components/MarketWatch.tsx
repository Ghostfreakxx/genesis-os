```tsx
"use client";

const markets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    reason: "Emotional global risk indicator.",
    status: "High Volatility",
    warning: "Most traders buy tops and sell fear.",
  },
  {
    name: "Gold",
    symbol: "XAU",
    reason: "War and inflation safe haven.",
    status: "Defensive Asset",
    warning: "Patience beats greed.",
  },
  {
    name: "Oil",
    symbol: "WTI",
    reason: "Middle East tension moves oil hard.",
    status: "Geopolitical Asset",
    warning: "Oil destroys weak stop losses.",
  },
  {
    name: "US Dollar",
    symbol: "DXY",
    reason: "Strong dollar pressures global markets.",
    status: "Macro Signal",
    warning: "Ignoring DXY is rookie behaviour.",
  },
];

export default function MarketWatch() {
  return (
    <div className="border border-yellow-400 rounded-2xl p-5 bg-[#0a0a0a]">
      <h2 className="text-4xl font-bold text-yellow-300 mb-4">
        Market Watch
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {markets.map((market) => (
          <div
            key={market.symbol}
            className="border border-zinc-700 rounded-xl p-4 bg-black"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-cyan-300">
                {market.name}
              </h3>

              <span className="text-yellow-300">
                {market.symbol}
              </span>
            </div>

            <p className="text-green-400 mt-2">
              {market.status}
            </p>

            <p className="text-zinc-400 mt-3">
              {market.reason}
            </p>

            <p className="text-red-400 mt-4 font-bold">
              AI Critic: {market.warning}
            </p>
          </div>
        ))}

      </div>

      <div className="mt-6 border border-red-500 rounded-xl p-4 bg-black">
        <p className="text-red-400 font-bold">
          Trader Warning
        </p>

        <p className="text-zinc-400 mt-2 leading-7">
          The market rewards discipline, not excitement.
          If your strategy changes every hour,
          you are trading emotions, not probability.
        </p>
      </div>
    </div>
  );
}
```
