export const MARKET_ASSETS = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "ripple", name: "XRP", symbol: "XRP" },
  { id: "cardano", name: "Cardano", symbol: "ADA" },
] as const;

export interface AssetPrice {
  usd: number;
  usd_24h_change: number;
}

export type MarketData = Partial<Record<string, AssetPrice>>;
