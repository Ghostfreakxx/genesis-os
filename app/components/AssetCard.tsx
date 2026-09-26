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
    <div className="panel-inset p-4 hover:border-accent/40 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="text-base font-semibold text-white leading-tight">
            {name}
          </h3>
          {badge && (
            <span className="inline-block mt-1 text-[10px] tracking-wider uppercase text-slate-400 border border-line rounded px-1.5 py-0.5">
              {badge}
            </span>
          )}
        </div>

        <span className="text-slate-400 font-mono text-xs font-medium shrink-0 rounded bg-white/5 px-1.5 py-0.5">
          {ticker}
        </span>
      </div>

      <p className="text-white text-2xl font-mono tabular-nums tracking-tight mt-3">
        {priceLabel ?? "Loading..."}
      </p>

      <p
        className={`mt-2 text-sm font-medium flex items-center gap-1 tabular-nums ${
          !hasChange ? "text-slate-500" : isUp ? "text-emerald-400" : "text-rose-400"
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

      {footer && <div className="mt-3 pt-3 border-t border-line">{footer}</div>}
    </div>
  );
}
