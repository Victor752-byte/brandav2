export const markets = {
  ng: {
    name: "Nigeria",
    currency: "NGN",
    symbol: "₦",
    locale: "en-NG",
    taxRate: 0.075,
  },
  us: {
    name: "United States",
    currency: "USD",
    symbol: "$",
    locale: "en-US",
    taxRate: 0.08,
  },
  uk: {
    name: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    locale: "en-GB",
    taxRate: 0.2,
  },
  ca: {
    name: "Canada",
    currency: "CAD",
    symbol: "C$",
    locale: "en-CA",
    taxRate: 0.13,
  },
} as const;
export type MarketCode = keyof typeof markets;
export function isMarket(value: string): value is MarketCode {
  return value in markets;
}
export function formatPrice(amount: number, market: MarketCode) {
  return new Intl.NumberFormat(markets[market].locale, {
    style: "currency",
    currency: markets[market].currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
export const rates: Record<MarketCode, number> = {
  ng: 1,
  us: 0.00065,
  uk: 0.00051,
  ca: 0.00089,
};
