import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#75867c]">
          404 · Off the moodboard
        </p>
        <h1 className="mt-3 text-4xl font-semibold">
          We can’t find that page.
        </h1>
        <p className="mt-3 text-sm text-[#73807c]">
          Let’s get you back to the good stuff.
        </p>
        <Link
          href="/ng"
          className="mt-6 inline-block rounded-full bg-[#244b43] px-6 py-3 text-sm font-semibold text-white"
        >
          Go to Branda
        </Link>
      </div>
    </main>
  );
}
