"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-28 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-[#75867c]">
        A little hiccup
      </p>
      <h1 className="mt-3 text-3xl font-semibold">
        That didn’t go as planned.
      </h1>
      <p className="mt-3 text-sm text-[#73807c]">
        Give it another try. Your cart is safe.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-[#244b43] px-6 py-3 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </main>
  );
}
