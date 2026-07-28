/**
 * 7Band Financial Agency — Footer
 * Design: Dark navy background, 3-column layout matching reference site.
 */
export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0d1f2d] text-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/manus-storage/7band-logo-icon_d358cad1.png"
                alt="7Band Financial Agency"
                className="w-10 h-10 object-contain"
              />
              <div>
                <div className="font-display font-bold text-white text-lg leading-none">7Band Financial</div>
                <div className="font-body text-[#22c55e] text-xs tracking-widest uppercase">Agency</div>
              </div>
            </div>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              Helping families protect their loved ones and build generational wealth through smart life insurance solutions.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {[
                "Term Life Insurance",
                "Whole Life Insurance",
                "Indexed Universal Life",
                "Final Expense Insurance",
                "Mortgage Protection",
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo("#services")}
                    className="font-body text-sm text-white/60 hover:text-[#22c55e] transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="font-body text-sm text-white/60 hover:text-[#22c55e] transition-colors text-left"
                >
                  Book a Free Consultation
                </button>
              </li>
              <li>
                <a
                  href="mailto:info@7bandfinancial.com"
                  className="font-body text-sm text-white/60 hover:text-[#22c55e] transition-colors"
                >
                  info@7bandfinancial.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <button
                onClick={() => scrollTo("#contact")}
                className="bg-[#f97316] hover:bg-[#ea6c0a] text-white font-body font-semibold text-sm px-5 py-2.5 rounded-md transition-all active:scale-95"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} 7Band Financial Agency. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/40">
            Licensed Life Insurance Agency
          </p>
        </div>
      </div>
    </footer>
  );
}
