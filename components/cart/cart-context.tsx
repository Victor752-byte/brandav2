"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { MarketCode } from "@/lib/markets";
import { servicePrice, services } from "@/lib/services";
export type CartItem = { slug: string; quantity: number; option: string };
type CartApi = {
  items: CartItem[];
  add: (slug: string, option?: string) => void;
  remove: (slug: string, option: string) => void;
  setQuantity: (slug: string, option: string, quantity: number) => void;
  count: number;
  subtotal: (market: MarketCode) => number;
};
const Context = createContext<CartApi | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("branda-cart");
      if (saved) setItems(JSON.parse(saved) as CartItem[]);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem("branda-cart", JSON.stringify(items));
  }, [items, ready]);
  const api = useMemo<CartApi>(
    () => ({
      items,
      add: (slug, option = "Core") =>
        setItems((current) => {
          const found = current.find(
            (i) => i.slug === slug && i.option === option,
          );
          return found
            ? current.map((i) =>
                i === found ? { ...i, quantity: i.quantity + 1 } : i,
              )
            : [...current, { slug, option, quantity: 1 }];
        }),
      remove: (slug, option) =>
        setItems((current) =>
          current.filter((i) => i.slug !== slug || i.option !== option),
        ),
      setQuantity: (slug, option, quantity) =>
        setItems((current) =>
          quantity < 1
            ? current.filter((i) => i.slug !== slug || i.option !== option)
            : current.map((i) =>
                i.slug === slug && i.option === option ? { ...i, quantity } : i,
              ),
        ),
      count: items.reduce((a, i) => a + i.quantity, 0),
      subtotal: (market) =>
        items.reduce(
          (sum, i) =>
            sum +
            servicePrice(services.find((s) => s.slug === i.slug)!, market) *
              i.quantity,
          0,
        ),
    }),
    [items],
  );
  return <Context.Provider value={api}>{children}</Context.Provider>;
}
export function useCart() {
  const value = useContext(Context);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
