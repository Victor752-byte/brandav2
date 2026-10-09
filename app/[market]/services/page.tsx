import { notFound } from "next/navigation";
import { isMarket, type MarketCode } from "@/lib/markets";
import { services } from "@/lib/services";
import { ServiceCard } from "@/components/services/service-card";
import Link from "next/link";
type Search = Record<string, string | string[] | undefined>;
function one(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}
export default async function ServicesPage({
  params: routeParams,
  searchParams,
}: {
  params: Promise<{ market: string }>;
  searchParams: Promise<Search>;
}) {
  const { market: code } = await routeParams;
  const q = await searchParams;
  if (!isMarket(code)) notFound();
  const market = code as MarketCode;
  const search = (one(q.search) || "").trim().toLowerCase(),
    category = one(q.category) || "",
    industry = one(q.industry) || "",
    urgency = one(q.urgency) || "",
    sort = one(q.sort) || "popular",
    page = Math.max(1, Number(one(q.page) || 1) || 1);
  const filtered = services.filter(
    (s) =>
      (!search ||
        `${s.name} ${s.category} ${s.description}`
          .toLowerCase()
          .includes(search)) &&
      (!category || s.category.toLowerCase() === category.toLowerCase()) &&
      (!industry ||
        s.industry.some((i) => i.toLowerCase() === industry.toLowerCase())) &&
      (!urgency || s.urgency.toLowerCase() === urgency.toLowerCase()),
  );
  if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);
  else filtered.sort((a, b) => b.popularity - a.popularity);
  const totalPages = Math.max(1, Math.ceil(filtered.length / 9));
  const rows = filtered.slice((page - 1) * 9, page * 9);
  const industries = Array.from(
    new Set(services.flatMap((s) => s.industry)),
  ).sort();
  const base = `/${market}/services`;
  const params = new URLSearchParams();
  if (search) params.set("search", one(q.search) || "");
  if (category) params.set("category", category);
  if (industry) params.set("industry", industry);
  if (urgency) params.set("urgency", urgency);
  if (sort !== "popular") params.set("sort", sort);
  function pageHref(n: number) {
    const p = new URLSearchParams(params);
    p.set("page", String(n));
    return `${base}?${p.toString()}`;
  }
  return (
    <main className="mx-auto max-w-[1440px] px-5 pb-20 pt-10 lg:px-12">
      <div className="mb-10 border-b border-[#e4e8e4] pb-9">
        <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#75867c]">
          The Branda edit
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-1.8px] sm:text-5xl">
          Services for the brand you’re building.
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#687671]">
          Good people. Thoughtful work. Everything you need to bring your brand
          to life, all in one place.
        </p>
      </div>
      <form
        action={base}
        className="mb-8 grid gap-3 rounded-2xl border border-[#e3e8e3] bg-white p-4 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_auto]"
      >
        <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-wider text-[#71817a]">
          Search
          <input
            name="search"
            defaultValue={one(q.search)}
            placeholder="Try “logo” or “packaging”"
            className="h-10 rounded-lg border border-[#e2e7e2] px-3 text-sm font-normal normal-case tracking-normal text-[#172b2a] outline-none focus:border-[#638479]"
          />
        </label>
        <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-wider text-[#71817a]">
          Category
          <select
            name="category"
            defaultValue={category}
            className="h-10 rounded-lg border border-[#e2e7e2] px-3 text-sm font-normal normal-case tracking-normal text-[#172b2a]"
          >
            <option value="">All categories</option>
            {["Digital", "Gifts", "Create", "Studio", "Prints"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-wider text-[#71817a]">
          Industry
          <select
            name="industry"
            defaultValue={industry}
            className="h-10 rounded-lg border border-[#e2e7e2] px-3 text-sm font-normal normal-case tracking-normal text-[#172b2a]"
          >
            <option value="">All industries</option>
            {industries.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-wider text-[#71817a]">
          Turnaround
          <select
            name="urgency"
            defaultValue={urgency}
            className="h-10 rounded-lg border border-[#e2e7e2] px-3 text-sm font-normal normal-case tracking-normal text-[#172b2a]"
          >
            <option value="">Any pace</option>
            <option value="Express">Express</option>
            <option value="Standard">Standard</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-wider text-[#71817a]">
          Sort by
          <select
            name="sort"
            defaultValue={sort}
            className="h-10 rounded-lg border border-[#e2e7e2] px-3 text-sm font-normal normal-case tracking-normal text-[#172b2a]"
          >
            <option value="popular">Most popular</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
        <button className="self-end rounded-lg bg-[#244b43] px-5 py-3 text-sm font-semibold text-white">
          Apply
        </button>
      </form>
      <div className="mb-4 flex items-center justify-between text-xs text-[#73807c]">
        <span>{filtered.length} services</span>
        {(search || category || industry || urgency) && (
          <Link href={base} className="underline">
            Clear filters
          </Link>
        )}
      </div>
      {rows.length ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((s) => (
              <ServiceCard key={s.id} service={s} market={market} />
            ))}
          </div>
          <nav
            aria-label="Pagination"
            className="mt-10 flex items-center justify-center gap-2"
          >
            {page > 1 && (
              <Link
                href={pageHref(page - 1)}
                className="rounded-full border border-[#dfe4df] px-4 py-2 text-sm"
              >
                ← Previous
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={pageHref(n)}
                aria-current={page === n ? "page" : undefined}
                className={`grid h-9 w-9 place-items-center rounded-full text-sm ${page === n ? "bg-[#244b43] text-white" : "border border-[#dfe4df]"}`}
              >
                {n}
              </Link>
            ))}
            {page < totalPages && (
              <Link
                href={pageHref(page + 1)}
                className="rounded-full border border-[#dfe4df] px-4 py-2 text-sm"
              >
                Next →
              </Link>
            )}
          </nav>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#ccd5cd] bg-white py-20 text-center">
          <span className="text-4xl">⌕</span>
          <h2 className="mt-3 text-xl font-semibold">No services found</h2>
          <p className="mt-2 text-sm text-[#70807a]">
            Try a different search or remove a filter.
          </p>
          <Link
            href={base}
            className="mt-5 inline-block rounded-full bg-[#244b43] px-5 py-3 text-sm text-white"
          >
            See all services
          </Link>
        </div>
      )}
    </main>
  );
}
