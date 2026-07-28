/**
 * 7Band Financial Agency — Navbar
 * Design: Transparent over hero, transitions to white/navy on scroll.
 * Brand: Playfair Display headings, Inter body, green accent, orange CTA.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Life Insurance", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
  ];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/manus-storage/7band-logo-icon_d358cad1.png"
              alt="7Band Financial Agency"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span
                className={`font-display font-bold text-lg leading-none transition-colors ${
                  scrolled ? "text-[#0d1f2d]" : "text-white"
                }`}
              >
                7Band Financial
              </span>
              <span
                className={`font-body text-xs tracking-widest uppercase transition-colors ${
                  scrolled ? "text-[#22c55e]" : "text-[#22c55e]"
                }`}
              >
                Agency
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`font-body text-sm font-medium transition-colors hover:text-[#22c55e] ${
                  scrolled ? "text-[#0d1f2d]" : "text-white/90"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => scrollTo("#contact")}
              className="bg-[#f97316] hover:bg-[#ea6c0a] text-white font-body font-semibold text-sm px-5 py-2.5 rounded-md transition-all duration-150 active:scale-95"
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 rounded-md transition-colors ${
              scrolled ? "text-[#0d1f2d]" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d1f2d] border-t border-white/10 px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="font-body text-white/90 text-base font-medium text-left hover:text-[#22c55e] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="mt-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-body font-semibold text-sm px-5 py-3 rounded-md transition-all active:scale-95 text-center"
          >
            Free Consultation
          </button>
        </div>
      )}
    </header>
  );
}
