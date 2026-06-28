
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/Icons";

const navItems = [
  { href: "/aircraft", label: "Aircraft" },
  { href: "/rockets", label: "Rockets" },
  { href: "/missiles", label: "Missiles" },
  { href: "/misc", label: "Misc" }
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#f7f6f2]/85 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          aria-label="BLACK SKY LABS home"
          className="flex items-center gap-3 text-[#111111]"
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Black Sky Labs logo"
            width={500}
            height={500}
            className="h-12 w-12 rounded-full object-contain"
          />
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">
              BLACK SKY LABS
            </p>
            <p className="text-sm font-medium text-black/80">
              Portfolio Apparel Concept
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                className={`text-sm tracking-[0.22em] transition ${
                  active ? "text-black" : "text-black/55 hover:text-black"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-black/70 md:block">
            Checkout Coming Soon
          </div>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-full border border-black/10 bg-white/80 p-3 text-black transition hover:bg-white md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-black/10 bg-[#f7f6f2] px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            <div className="mb-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-xs uppercase tracking-[0.22em] text-black/60">
              Checkout Coming Soon
            </div>
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  className={`rounded-2xl px-4 py-3 text-sm tracking-[0.22em] ${
                    active
                      ? "bg-black text-white"
                      : "text-black/70 hover:bg-black/[0.04] hover:text-black"
                  }`}
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
