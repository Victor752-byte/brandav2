import Link from "next/link";
import type { MarketCode } from "@/lib/markets";
export function SiteFooter({ market }: { market: MarketCode }) {
  return (
    <footer className="mt-24 bg-[#173a34] text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between lg:px-12">
        <div>
          <Link
            href={`/${market}`}
            className="text-2xl font-black tracking-tight"
          >
            branda<span className="text-[#d6ee76]">.</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
            Good brands make people feel something. We make it easier to get
            there.
          </p>
        </div>
        <div className="flex gap-6 text-sm text-white/75">
          <Link href={`/${market}/services`}>Explore services</Link>
          <Link href={`/${market}/cart`}>Your cart</Link>
          <span>© 2026 Branda</span>
        </div>
      </div>
    </footer>
  );
}
