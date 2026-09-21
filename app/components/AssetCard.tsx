import type { ReactNode } from "react";

interface AssetCardProps {
  name: string;
  ticker: string;
  priceLabel: string | null;
  changePercent: number | null;
  badge?: string;
  footer?: ReactNode;
}

export default function AssetCard({
  name,
  ticker,
  priceLabel,
  changePercent,
  badge,
  footer,
}: AssetCardProps) {
  const hasChange = typeof changePercent === "number";
  const isUp = hasChange && changePercent >= 0;

  return (
    <div className="border border-zinc-700 rounded-xl p-4 bg-[#090909] hover:border-cyan-400 hover:scale-[1.02] transition-all duration-300 flex flex-col">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="text-xl font-bold text-cyan-300 leading-tight">
            {name}
          </h3>
          {badge && (
            <span className="inline-block mt-1 text-[10px] tracking-wider uppercase text-zinc-500 border border-zinc-700 rounded px-1.5 py-0.5">
              {badge}
            </span>
          )}
        </div>

        <span className="text-yellow-300 font-bold font-mono text-sm shrink-0">
          {ticker}
        </span>
      </div>

      <p className="text-white text-2xl font-mono mt-3">
        {priceLabel ?? "Loading..."}
      </p>

      <p
        className={`mt-2 font-bold flex items-center gap-1 ${
          !hasChange ? "text-zinc-400" : isUp ? "text-green-400" : "text-red-400"
        }`}
      >
        {hasChange ? (
          <>
            <span aria-hidden>{isUp ? "▲" : "▼"}</span>
            {Math.abs(changePercent).toFixed(2)}% / 24h
          </>
        ) : (
          "Scanning..."
        )}
      </p>

      {footer && <div className="mt-3 pt-3 border-t border-zinc-800">{footer}</div>}
    </div>
  );
}
