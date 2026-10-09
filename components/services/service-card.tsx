import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { formatPrice, type MarketCode } from "@/lib/markets";
import { servicePrice } from "@/lib/services";
export function ServiceCard({
  service,
  market,
}: {
  service: Service;
  market: MarketCode;
}) {
  const price = servicePrice(service, market);
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e4e8e4] bg-white transition hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(23,43,42,.09)]">
      <Link
        href={`/${market}/services/${service.slug}`}
        aria-label={`Explore ${service.name}`}
      >
        <div className="relative aspect-[1.3] overflow-hidden bg-[#e9ece6]">
          <Image
            src={service.image}
            alt={`${service.name} by Branda`}
            fill
            sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em]">
            {service.category}
          </span>
          {service.discount && (
            <span className="absolute right-3 top-3 rounded-full bg-[#d6ee76] px-3 py-1.5 text-[10px] font-bold">
              -{service.discount}%
            </span>
          )}
        </div>
      </Link>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/${market}/services/${service.slug}`}
              className="text-[17px] font-semibold tracking-[-.3px] hover:underline"
            >
              {service.name}
            </Link>
            <div className="mt-1 text-xs text-[#73807c]">
              From{" "}
              <span className="font-semibold text-[#244b43]">
                {formatPrice(price, market)}
              </span>
              {service.discount && (
                <span className="ml-2 text-[#939b97] line-through">
                  {formatPrice(
                    Math.round(price / (1 - service.discount / 100)),
                    market,
                  )}
                </span>
              )}
            </div>
          </div>
          <span className="mt-1 flex shrink-0 items-center gap-1 text-xs text-[#53625f]">
            ↗ {service.popularity}
          </span>
        </div>
        <Link
          href={`/${market}/services/${service.slug}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#d7dfd9] py-2.5 text-xs font-semibold transition hover:border-[#244b43] hover:bg-[#244b43] hover:text-white"
        >
          Explore service <span className="ml-2">↗</span>
        </Link>
      </div>
    </article>
  );
}
