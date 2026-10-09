import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isMarket, type MarketCode, markets } from "@/lib/markets";
import { services } from "@/lib/services";
import { ServiceCard } from "@/components/services/service-card";
export default async function MarketHome({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market: code } = await params;
  if (!isMarket(code)) notFound();
  const market = code as MarketCode;
  const featured = services.slice(0, 4);
  const us = market === "us";
  return (
    <main>
      <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-[1fr_.92fr] md:py-16 lg:px-12 lg:py-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e0e5df] bg-white px-3 py-2 text-[11px] font-semibold text-[#586761]">
            <span className="h-2 w-2 rounded-full bg-[#9dbd43]" /> A creative
            partner for your next chapter
          </div>
          <h1 className="max-w-[650px] text-[48px] font-semibold leading-[.99] tracking-[-2.8px] sm:text-6xl lg:text-[76px]">
            {us
              ? "Make your brand feel like you."
              : "Your next big idea deserves a good brand."}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#62716d]">
            {us
              ? "Thoughtful design, print and studio services for the businesses building what’s next."
              : "From your first logo to your next big launch, find good people and thoughtful services to help you grow."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${market}/services`}
              className="rounded-full bg-[#244b43] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#173a34]"
            >
              Explore services <span className="ml-3">↗</span>
            </Link>
            <Link
              href={`/${market}/services?category=Digital`}
              className="rounded-full border border-[#d8dfd9] px-6 py-3.5 text-sm font-semibold hover:bg-white"
            >
              How Branda works
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-xs text-[#65736f]">
            <div className="flex -space-x-2">
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#f8f8f5] bg-[#d9b79e] text-[10px]">
                A
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#f8f8f5] bg-[#bdd0c3] text-[10px]">
                T
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#f8f8f5] bg-[#d9c8a1] text-[10px]">
                J
              </span>
            </div>
            <span>
              <strong className="text-[#233a35]">4.9/5</strong> from 1,200+
              happy brands
            </span>
          </div>
        </div>
        <div className="relative min-h-[370px] overflow-hidden rounded-[26px] bg-[#dfe5d8] md:min-h-[500px]">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85"
            alt="Sunlit creative studio where brands come to life"
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute bottom-5 left-5 rounded-xl bg-white/95 p-4 shadow-lg">
            <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[#6b7873]">
              {markets[market].name} market
            </span>
            <p className="mt-1 text-sm font-semibold">
              Good work, made together.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#7b8c83]">
                A few favourites
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-1px]">
                Made for your next move
              </h2>
            </div>
            <Link
              href={`/${market}/services`}
              className="hidden text-sm font-semibold underline underline-offset-4 sm:block"
            >
              See all services ↗
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((s) => (
              <ServiceCard key={s.id} service={s} market={market} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href={`/${market}/services`}
              className="text-sm font-semibold underline"
            >
              See all services ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-12">
        <div className="rounded-[24px] bg-[#dce8d4] px-7 py-10 md:flex md:items-center md:justify-between md:px-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#5c7060]">
              The Branda difference
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-1px]">
              Big-brand thinking. Built around your business.
            </h2>
          </div>
          <Link
            href={`/${market}/services`}
            className="mt-6 inline-flex rounded-full bg-[#244b43] px-6 py-3 text-sm font-semibold text-white md:mt-0"
          >
            Find your service ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
