export function Footer() {
  return (
    <footer className="border-t border-black/8 bg-transparent">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-black/60 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-black/42">
            Black Sky Labs
          </p>
          <p className="mt-2 max-w-xl leading-6">
            Portfolio storefront concept with a cleaner editorial treatment and
            product-first aerospace visuals.
          </p>
        </div>

        <p className="max-w-2xl leading-6 text-black/45">
          Original artwork. Not affiliated with or endorsed by any aerospace
          company, agency, or manufacturer. Vehicle and program names are used
          only as factual descriptors.
        </p>
      </div>
    </footer>
  );
}
