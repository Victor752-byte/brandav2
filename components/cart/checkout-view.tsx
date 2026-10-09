"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { MarketCode } from "@/lib/markets";
import { formatPrice, markets } from "@/lib/markets";
import { getService, servicePrice } from "@/lib/services";
import { useCart } from "./cart-context";
export function CheckoutView({ market }: { market: MarketCode }) {
  const cart = useCart();
  const [done, setDone] = useState(false);
  const subtotal = cart.subtotal(market),
    tax = Math.round(subtotal * markets[market].taxRate),
    total = subtotal + tax;
  if (done)
    return (
      <div className="mt-10 rounded-3xl bg-[#e5eddc] px-6 py-16 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#244b43] text-2xl text-white">
          ✓
        </div>
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[.18em] text-[#66796d]">
          You’re in good hands
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Your project is on its way.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#63716a]">
          This is a demo confirmation. A Branda specialist would follow up to
          get the details just right.
        </p>
        <Link
          href={`/${market}/services`}
          className="mt-7 inline-block rounded-full bg-[#244b43] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to services
        </Link>
      </div>
    );
  if (!cart.items.length)
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-[#cfd8d0] bg-white py-16 text-center">
        <h2 className="text-xl font-semibold">Nothing to check out yet</h2>
        <p className="mt-2 text-sm text-[#72807a]">
          Add a service and we’ll take it from there.
        </p>
        <Link
          href={`/${market}/services`}
          className="mt-6 inline-block rounded-full bg-[#244b43] px-6 py-3 text-sm font-semibold text-white"
        >
          Explore services
        </Link>
      </div>
    );
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_370px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
        className="rounded-2xl border border-[#e1e6e1] bg-white p-5 sm:p-7"
      >
        <h2 className="text-xl font-semibold">Where should we reach you?</h2>
        <p className="mt-1 text-sm text-[#73807c]">
          Your project specialist will be in touch after checkout.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold">
            First name
            <input
              required
              autoComplete="given-name"
              className="mt-2 h-11 w-full rounded-lg border border-[#dfe4df] px-3 text-sm outline-none focus:border-[#638479]"
              placeholder="Your name"
            />
          </label>
          <label className="text-xs font-semibold">
            Last name
            <input
              required
              autoComplete="family-name"
              className="mt-2 h-11 w-full rounded-lg border border-[#dfe4df] px-3 text-sm outline-none focus:border-[#638479]"
              placeholder="Surname"
            />
          </label>
          <label className="text-xs font-semibold sm:col-span-2">
            Email address
            <input
              required
              type="email"
              autoComplete="email"
              className="mt-2 h-11 w-full rounded-lg border border-[#dfe4df] px-3 text-sm outline-none focus:border-[#638479]"
              placeholder="you@yourbrand.com"
            />
          </label>
          <label className="text-xs font-semibold sm:col-span-2">
            Tell us a little about your project{" "}
            <span className="font-normal text-[#829089]">(optional)</span>
            <textarea
              rows={4}
              className="mt-2 w-full resize-y rounded-lg border border-[#dfe4df] p-3 text-sm outline-none focus:border-[#638479]"
              placeholder="What are you hoping to make?"
            />
          </label>
        </div>
        <div className="mt-5 flex items-start gap-2 text-xs text-[#6f7d76]">
          <input
            id="updates"
            type="checkbox"
            className="mt-0.5 accent-[#244b43]"
          />
          <label htmlFor="updates">
            Keep me posted with occasional brand inspiration.
          </label>
        </div>
        <button className="mt-7 w-full rounded-full bg-[#244b43] py-3.5 text-sm font-semibold text-white hover:bg-[#173a34]">
          Place demo order · {formatPrice(total, market)}
        </button>
        <p className="mt-3 text-center text-[10px] text-[#849089]">
          No payment is collected in this prototype.
        </p>
      </form>
      <aside className="h-fit rounded-2xl border border-[#e1e6e1] bg-white p-5">
        <h2 className="text-lg font-semibold">Your order</h2>
        <div className="mt-5 space-y-4">
          {cart.items.map((item) => {
            const s = getService(item.slug);
            return s ? (
              <div key={item.slug + item.option} className="flex gap-3">
                <div className="relative h-14 w-16 overflow-hidden rounded-lg">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 justify-between gap-2 text-xs">
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="mt-1 text-[#78847f]">
                      {item.option} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold">
                    {formatPrice(
                      servicePrice(s, market) * item.quantity,
                      market,
                    )}
                  </span>
                </div>
              </div>
            ) : null;
          })}
        </div>
        <div className="mt-5 space-y-3 border-t border-[#e6eae5] pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-[#6b7973]">Subtotal</span>
            <span>{formatPrice(subtotal, market)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b7973]">Estimated tax</span>
            <span>{formatPrice(tax, market)}</span>
          </div>
          <div className="flex justify-between border-t border-[#e6eae5] pt-4 font-semibold">
            <span>Total</span>
            <span>{formatPrice(total, market)}</span>
          </div>
        </div>
        <p className="mt-4 text-[10px] leading-4 text-[#849089]">
          Market: {markets[market].name} · Prices shown in{" "}
          {markets[market].currency}
        </p>
      </aside>
    </div>
  );
}
