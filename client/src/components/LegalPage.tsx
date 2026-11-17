/*
 * 7Band Financial Agency — shared layout for the legal pages.
 * Same section format as East Consulting LLC's legal pages, in 7Band's black & gold.
 */

import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import LegalLinks from "@/components/LegalLinks";

export type LegalSection = { heading: string; body: ReactNode };

export default function LegalPage({
  title,
  lastUpdated,
  sections,
}: {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = `${title} | 7Band Financial Agency`;
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col bg-[#050400] text-white">
      <header className="border-b border-[#c9a84c]/15">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/manus-storage/7band-logo-clean_7b539e21.png" alt="7Band Financial Agency" className="h-9 w-9 object-contain" />
            <span className="font-tactical text-sm font-bold uppercase tracking-wider">
              7Band <span className="text-[#c9a84c]">Financial</span>
            </span>
          </Link>
          <Link href="/" className="font-tactical text-xs uppercase tracking-widest text-white/60 hover:text-[#c9a84c] transition-colors">
            ← Home
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b border-[#c9a84c]/15 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.12)_0%,transparent_70%)] py-14 lg:py-20">
          <div className="mx-auto max-w-5xl px-5">
            <h1 className="font-display text-4xl font-black text-[#c9a84c] sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="mt-4 font-tactical text-sm tracking-wide text-white/60">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="py-14 lg:py-16">
          <div className="mx-auto max-w-5xl px-5">
            <div className="max-w-3xl space-y-10">
              {sections.map(({ heading, body }) => (
                <div key={heading}>
                  <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-[#c9a84c]">{heading}</h2>
                  <div className="space-y-3 text-base leading-relaxed text-white/75 [&_a]:font-semibold [&_a]:text-[#e8c97a] [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                    {body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#c9a84c]/15 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 text-center">
          <LegalLinks />
          <p className="font-tactical text-xs tracking-wide text-white/40">
            © {new Date().getFullYear()} 7Band Financial Agency. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
