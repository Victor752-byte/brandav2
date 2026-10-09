import { notFound } from "next/navigation";
import { isMarket, type MarketCode } from "@/lib/markets";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
export function generateStaticParams() {
  return [
    { market: "ng" },
    { market: "us" },
    { market: "uk" },
    { market: "ca" },
  ];
}
export default async function MarketLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  return (
    <>
      <SiteHeader market={market as MarketCode} />
      {children}
      <SiteFooter market={market as MarketCode} />
    </>
  );
}
