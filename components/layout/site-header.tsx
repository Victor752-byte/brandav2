"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MarketCode } from "@/lib/markets";
import { useCart } from "@/components/cart/cart-context";
export function SiteHeader({ market }: { market: MarketCode }) {
  const pathname = usePathname();
  const cart = useCart();
  function changeMarket(next: MarketCode) {
    const parts = pathname.split("/");
    parts[1] = next;
    window.location.href = parts.join("/") + (window.location.search || "");
  }
  return (
    <header className="sticky top-0 z-30 border-b border-[#e4e8e4] bg-[#f8f8f5]/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-12">
        <Link
          href={`/${market}`}
          className="flex items-center gap-2 text-[23px] font-black tracking-[-1.3px]"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#244b43] text-sm text-white">
            b.
          </span>
          branda
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#40514e] md:flex">
          <Link href={`/${market}/services?category=Digital`}>Digital</Link>
          <Link href={`/${market}/services?category=Gifts`}>Gifts</Link>
          <Link href={`/${market}/services?category=Create`}>Create</Link>
          <Link href={`/${market}/services?category=Studio`}>Studio</Link>
          <Link href={`/${market}/services?category=Prints`}>Prints</Link>
        </nav>
        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="market-select">
            Choose your market
          </label>
          <select
            id="market-select"
            value={market}
            onChange={(e) => changeMarket(e.target.value as MarketCode)}
            className="max-w-[118px] rounded-full border border-[#dfe4df] bg-transparent px-3 py-2 text-xs font-semibold outline-none"
          >
            <option value="ng">Nigeria · NGN</option>
            <option value="us">USA · USD</option>
            <option value="uk">UK · GBP</option>
            <option value="ca">Canada · CAD</option>
          </select>
          <Link
            href={`/${market}/cart`}
            aria-label={`Cart with ${cart.count} items`}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-[#dfe4df] text-lg"
          >
            ♧
            {cart.count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#d6ee76] px-1 text-[10px] font-bold">
                {cart.count}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="flex justify-center gap-5 border-t border-[#e4e8e4] px-4 py-2 text-[11px] font-medium text-[#596965] md:hidden">
        <Link href={`/${market}/services?category=Digital`}>Digital</Link>
        <Link href={`/${market}/services?category=Gifts`}>Gifts</Link>
        <Link href={`/${market}/services?category=Create`}>Create</Link>
        <Link href={`/${market}/services?category=Studio`}>Studio</Link>
        <Link href={`/${market}/services?category=Prints`}>Prints</Link>
      </div>
    </header>
  );
}
