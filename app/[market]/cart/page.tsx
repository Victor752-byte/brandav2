import { notFound } from "next/navigation";
import { isMarket, type MarketCode } from "@/lib/markets";
import { CartView } from "@/components/cart/cart-view";
export default async function CartPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  return (
    <main className="mx-auto min-h-[55vh] max-w-[1200px] px-5 py-12 lg:px-12">
      <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#7b8c83]">
        Your next move
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Your cart</h1>
      <CartView market={market as MarketCode} />
    </main>
  );
}
