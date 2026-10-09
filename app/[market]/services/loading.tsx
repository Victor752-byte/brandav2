export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-20">
      <div className="h-10 w-72 animate-pulse rounded bg-[#e6eae5]" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="aspect-[1.3] animate-pulse rounded-2xl bg-[#e6eae5]"
          />
        ))}
      </div>
    </main>
  );
}
