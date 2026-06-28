import Link from "next/link";

export default function NotFound() {
  return (
    <section className="rounded-[32px] border border-dashed border-black/12 bg-white/90 px-6 py-16 text-center shadow-[0_24px_60px_rgba(17,17,17,0.08)] md:px-8">
      <p className="text-[11px] uppercase tracking-[0.35em] text-black/42">
        Not Found
      </p>
      <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#111111] md:text-5xl">
        That page drifted off course
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-black/58">
        The page you requested is unavailable. Head back home to continue
        browsing the collection.
      </p>
      <Link
        className="mt-8 inline-flex rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/88"
        href="/"
      >
        Return Home
      </Link>
    </section>
  );
}
