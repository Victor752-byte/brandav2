"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Service } from "@/lib/services";
import type { MarketCode } from "@/lib/markets";
import { formatPrice } from "@/lib/markets";
import { servicePrice } from "@/lib/services";
import { useCart } from "@/components/cart/cart-context";
export function ServiceBuyBox({
  service,
  market,
}: {
  service: Service;
  market: MarketCode;
}) {
  const [option, setOption] = useState(service.variations[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const cart = useCart();
  const router = useRouter();
  const price = servicePrice(service, market);
  function add(go = false) {
    for (let i = 0; i < qty; i++) cart.add(service.slug, option);
    setAdded(true);
    if (go) router.push(`/${market}/checkout`);
  }
  return (
    <div className="rounded-2xl border border-[#e1e6e1] bg-white p-5 sm:p-6">
      <div className="text-xs font-semibold text-[#74827b]">Starting at</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight">
        {formatPrice(price, market)}
      </div>
      <label className="mt-6 block text-xs font-semibold">
        Choose a package
        <select
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="mt-2 h-12 w-full rounded-xl border border-[#dfe5df] bg-white px-3 text-sm"
        >
          {service.variations.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </label>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold">Quantity</span>
        <div className="flex h-10 items-center overflow-hidden rounded-full border border-[#dfe5df]">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="h-10 w-10 text-lg"
          >
            −
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty(qty + 1)}
            className="h-10 w-10 text-lg"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => add()}
        className="mt-6 w-full rounded-full bg-[#244b43] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#173a34]"
      >
        {added ? "Added to cart ✓" : "Add to cart"}
      </button>
      <button
        onClick={() => add(true)}
        className="mt-2 w-full rounded-full border border-[#d8e0d9] px-5 py-3 text-sm font-semibold hover:bg-[#f7f9f5]"
      >
        Order now
      </button>
      <p className="mt-4 text-center text-[11px] text-[#7a8782]">
        A Branda specialist will guide your project from here.
      </p>
    </div>
  );
}
