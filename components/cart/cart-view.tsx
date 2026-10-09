"use client";
import Link from "next/link";
import Image from "next/image";
import type { MarketCode } from "@/lib/markets";
import { formatPrice, markets } from "@/lib/markets";
import { getService, servicePrice } from "@/lib/services";
import { useCart } from "./cart-context";
export function CartView({ market }: { market: MarketCode }) {
  const cart = useCart();
  const subtotal = cart.subtotal(market),
    tax = Math.round(subtotal * markets[market].taxRate),
    total = subtotal + tax;
  if (!cart.items.length)
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-[#cfd8d0] bg-white py-16 text-center">
        <div className="text-4xl">♧</div>
        <h2 className="mt-3 text-xl font-semibold">
          Your cart is taking a breather
        </h2>
        <p className="mt-2 text-sm text-[#72807a]">
          The good stuff goes here when you find it.
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
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
      <section className="space-y-3">
        {cart.items.map((item) => {
          const service = getService(item.slug);
          if (!service) return null;
          const price = servicePrice(service, market);
          return (
            <article
              key={`${item.slug}-${item.option}`}
              className="flex gap-4 rounded-2xl border border-[#e1e6e1] bg-white p-3 sm:gap-5 sm:p-4"
            >
              <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-[#e9ece6] sm:h-28 sm:w-36">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                <div className="flex justify-between gap-3">
                  <div>
                    <Link
                      href={`/${market}/services/${service.slug}`}
                      className="font-semibold hover:underline"
                    >
                      {service.name}
                    </Link>
                    <p className="mt-1 text-xs text-[#77847e]">{item.option}</p>
                  </div>
                  <strong className="whitespace-nowrap text-sm">
                    {formatPrice(price * item.quantity, market)}
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex h-8 items-center rounded-full border border-[#dfe4df]">
                    <button
                      aria-label={`Decrease ${service.name} quantity`}
                      onClick={() =>
                        cart.setQuantity(
                          item.slug,
                          item.option,
                          item.quantity - 1,
                        )
                      }
                      className="h-8 w-8"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-xs">
                      {item.quantity}
                    </span>
                    <button
                      aria-label={`Increase ${service.name} quantity`}
                      onClick={() =>
                        cart.setQuantity(
                          item.slug,
                          item.option,
                          item.quantity + 1,
                        )
                      }
                      className="h-8 w-8"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => cart.remove(item.slug, item.option)}
                    className="text-xs text-[#8b6259] underline underline-offset-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          );
        })}
        <Link
          href={`/${market}/services`}
          className="inline-block pt-2 text-sm font-semibold underline underline-offset-4"
        >
          ← Continue exploring
        </Link>
      </section>
      <aside className="h-fit rounded-2xl border border-[#e1e6e1] bg-white p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="mt-5 space-y-3 border-b border-[#e6eae5] pb-5">
          {cart.items.map((i) => {
            const s = getService(i.slug);
            return s ? (
              <div
                key={i.slug + i.option}
                className="flex justify-between gap-4 text-xs text-[#63716c]"
              >
                <span>
                  {s.name} × {i.quantity}
                </span>
                <span>
                  {formatPrice(servicePrice(s, market) * i.quantity, market)}
                </span>
              </div>
            ) : null;
          })}
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#6b7973]">Subtotal</span>
            <span>{formatPrice(subtotal, market)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b7973]">Estimated tax</span>
            <span>{formatPrice(tax, market)}</span>
          </div>
          <div className="flex justify-between border-t border-[#e6eae5] pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(total, market)}</span>
          </div>
        </div>
        <Link
          href={`/${market}/checkout`}
          className="mt-6 block rounded-full bg-[#244b43] py-3.5 text-center text-sm font-semibold text-white"
        >
          Continue to checkout ↗
        </Link>
        <p className="mt-3 text-center text-[10px] text-[#7c8983]">
          Tax estimate based on your selected market
        </p>
      </aside>
    </div>
  );
}
