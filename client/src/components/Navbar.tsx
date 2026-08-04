/**
 * 7Band Financial Agency — Navbar
 * Theme: Gold & Dark RPG — dark background, gold accents, Cinzel display font
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Quest Map", href: "/#quest-map" },
  { label: "Pricing", href: "/#expansion-packs" },
  { label: "Lifetime LOC", href: "/lifetime-loc" },
  { label: "About", href: "/about" },
  { label: "The Book", href: "/the-book" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const handleHashLink = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      if (location === "/") {
        const id = href.slice(1);
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-md flex items-center justify-center font-display font-bold text-sm"
              style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", color: "#c9a84c" }}>
              7B
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-sm" style={{ color: "#f5f0e8" }}>7Band Financial</p>
              <p className="font-body tracking-widest uppercase" style={{ color: "#c9a84c", fontSize: "0.6rem" }}>Agency</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.href.startsWith("/#") ? (
                <button
                  key={link.label}
                  onClick={() => handleHashLink(link.href)}
                  className="font-body text-sm font-medium px-4 py-2 rounded-md transition-all duration-150 hover:bg-white/5"
                  style={{ color: "rgba(232,213,163,0.7)" }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm font-medium px-4 py-2 rounded-md transition-all duration-150 hover:bg-white/5"
                  style={{ color: "rgba(232,213,163,0.7)" }}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://calendly.com/malikeast/15-minute-quick-meeting-phone-call-via-zoom"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-bold text-sm px-5 py-2.5 rounded-md transition-all duration-150 active:scale-95"
              style={{ backgroundColor: "#c9a84c", color: "#0a0a0a" }}
            >
              Free Needs Analysis
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md"
            style={{ color: "#c9a84c" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-6 pt-2" style={{ backgroundColor: "rgba(10,10,10,0.98)", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
          <nav className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => (
              link.href.startsWith("/#") ? (
                <button
                  key={link.label}
                  onClick={() => handleHashLink(link.href)}
                  className="font-body text-sm font-medium px-4 py-3 rounded-md text-left transition-all duration-150 hover:bg-white/5"
                  style={{ color: "rgba(232,213,163,0.8)" }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm font-medium px-4 py-3 rounded-md transition-all duration-150 hover:bg-white/5"
                  style={{ color: "rgba(232,213,163,0.8)" }}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
          <a
            href="https://calendly.com/malikeast/15-minute-quick-meeting-phone-call-via-zoom"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center font-body font-bold text-sm px-5 py-3 rounded-md transition-all duration-150 active:scale-95 block"
            style={{ backgroundColor: "#c9a84c", color: "#0a0a0a" }}
          >
            Free Needs Analysis
          </a>
        </div>
      )}
    </header>
  );
}
