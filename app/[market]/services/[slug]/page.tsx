import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isMarket, type MarketCode } from "@/lib/markets";
import { getService } from "@/lib/services";
import { ServiceBuyBox } from "@/components/services/service-buy-box";
import { ServiceCard } from "@/components/services/service-card";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string; slug: string }>;
}): Promise<Metadata> {
  const { market: code, slug } = await params;
  const service = getService(slug);
  if (!service || !isMarket(code)) return { title: "Service not found" };
  return {
    title: `${service.name} — Branda`,
    description: service.description,
    alternates: { canonical: `/${code}/services/${slug}` },
    openGraph: {
      title: `${service.name} | Branda`,
      description: service.description,
      images: [
        { url: service.image, width: 1000, height: 750, alt: service.name },
      ],
    },
  };
}
export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ market: string; slug: string }>;
}) {
  const { market: code, slug } = await params;
  if (!isMarket(code)) notFound();
  const service = getService(slug);
  if (!service) notFound();
  const market = code as MarketCode;
  const related = service.related
    .map(getService)
    .filter((s) => s && s.slug !== slug)
    .slice(0, 3);
  const complementary = service.complementary
    .map(getService)
    .filter((s) => s && s.slug !== slug)
    .slice(0, 2);
  const gallery = [
    service.image,
    ...service.gallery.map(
      (id) =>
        `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=85`,
    ),
  ];
  return (
    <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-6 lg:px-12">
      <div className="mb-6 flex items-center gap-2 text-xs text-[#77847e]">
        <Link href={`/${market}/services`} className="hover:underline">
          Services
        </Link>
        <span>/</span>
        <span>{service.name}</span>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
        <section>
          <div className="relative aspect-[1.25] overflow-hidden rounded-2xl bg-[#e7ebe5]">
            <Image
              src={gallery[0]}
              alt={`${service.name} example`}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {gallery.slice(1, 3).map((src, i) => (
              <div
                key={src}
                className="relative aspect-[1.9] overflow-hidden rounded-xl bg-[#e7ebe5]"
              >
                <Image
                  src={src}
                  alt={`${service.name} detail ${i + 1}`}
                  fill
                  sizes="(max-width:768px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
        <section className="lg:sticky lg:top-28 lg:self-start">
          <div className="inline-flex rounded-full bg-[#e8eee4] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.13em] text-[#4c6559]">
            {service.category} · {service.turnaround}
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-1.7px] sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#65736e]">
            {service.description}
          </p>
          <div className="my-6 border-t border-[#e3e8e2]" />
          <h2 className="text-sm font-semibold">What’s included</h2>
          <ul className="mt-3 space-y-3">
            {service.included.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-[#53645d]">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e4edd8] text-[11px] text-[#315d4c]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="my-6 border-t border-[#e3e8e2]" />
          <ServiceBuyBox service={service} market={market} />
          <p className="mt-4 text-[11px] text-[#7b8882]">
            Rated {service.popularity}/100 by Branda customers · Designed for{" "}
            {service.industry.slice(0, 2).join(" and ")}
          </p>
        </section>
      </div>
      {related.length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#788980]">
                Keep the momentum
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Pairs well with
              </h2>
            </div>
            <span className="text-xs text-[#74817b]">Related services</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s!.id} service={s!} market={market} />
            ))}
          </div>
        </section>
      )}
      {complementary.length > 0 && (
        <section className="mt-14">
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#788980]">
              Complete the picture
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              A little extra, a lot of impact
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {complementary.map((s) => (
              <ServiceCard key={s!.id} service={s!} market={market} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
