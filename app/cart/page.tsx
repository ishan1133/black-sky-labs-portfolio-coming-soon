import Link from "next/link";

export default function CartRoute() {
  return (
    <section className="rounded-[36px] border border-black/8 bg-white/90 px-6 py-16 text-center shadow-[0_24px_60px_rgba(17,17,17,0.08)] md:px-8">
      <p className="text-[11px] uppercase tracking-[0.35em] text-black/42">
        Launch Status
      </p>
      <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#111111] md:text-5xl">
        Checkout is coming soon
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-black/58">
        This version of Black Sky Labs is designed as a portfolio storefront,
        so product purchasing is intentionally disabled for now.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          className="inline-flex justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/88"
          href="/"
        >
          Return Home
        </Link>
        <Link
          className="inline-flex justify-center rounded-full border border-black/10 px-5 py-3 text-sm text-black transition hover:bg-black/[0.04]"
          href="/coming-soon"
        >
          View Launch Page
        </Link>
      </div>
    </section>
  );
}
