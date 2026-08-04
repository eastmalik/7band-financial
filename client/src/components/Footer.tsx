/**
 * 7Band Financial Agency — Footer
 * Theme: Gold & Dark RPG — consistent with homepage
 */
import { Link } from "wouter";
import { Youtube, ExternalLink, Heart, CreditCard, Users } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#080808", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-md flex items-center justify-center font-display font-bold text-sm"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", color: "#c9a84c" }}>
                7B
              </div>
              <div>
                <p className="font-display font-bold text-sm" style={{ color: "#f5f0e8" }}>7Band Financial</p>
                <p className="font-body tracking-widest uppercase" style={{ color: "#c9a84c", fontSize: "0.6rem" }}>Agency</p>
              </div>
            </div>
            <p className="font-body text-xs leading-relaxed mb-4" style={{ color: "rgba(232,213,163,0.45)" }}>
              Stop Funding Their Dreams. Start Funding Yours.
            </p>
            <p className="font-body text-xs" style={{ color: "rgba(232,213,163,0.3)" }}>
              Licensed Life Insurance Agent<br />Jackson, Mississippi
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-body text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#c9a84c" }}>
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Lifetime LOC", href: "/lifetime-loc" },
                { label: "Credit Restoration", href: "/#quest-map" },
                { label: "LLC Structure", href: "/#quest-map" },
                { label: "IUL Engine", href: "/lifetime-loc" },
                { label: "Trust & Legacy", href: "/#quest-map" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="font-body text-sm transition-colors duration-150 hover:text-[#c9a84c]"
                    style={{ color: "rgba(232,213,163,0.55)" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="font-body text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#c9a84c" }}>
              Our Ecosystem
            </h4>
            <ul className="space-y-3">
              {[
                { label: "7Band Inc.", sub: "Non-Profit", href: "https://www.7bandinc.org", icon: <Heart size={12} /> },
                { label: "Arise Credit Pro", sub: "Credit Education", href: "https://www.arisecreditpro.com", icon: <CreditCard size={12} /> },
                { label: "Skool Community", sub: "The Real Ethical Agents", href: "https://www.skool.com/the-real-ethical-agents-4233", icon: <Users size={12} /> },
                { label: "YouTube", sub: "@Malik_East", href: "https://www.youtube.com/@Malik_East", icon: <Youtube size={12} /> },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer"
                    className="group flex items-start gap-2 transition-colors duration-150">
                    <span className="mt-0.5 shrink-0" style={{ color: "rgba(201,168,76,0.4)" }}>{item.icon}</span>
                    <div>
                      <p className="font-body text-sm group-hover:text-[#c9a84c] transition-colors duration-150 flex items-center gap-1"
                        style={{ color: "rgba(232,213,163,0.55)" }}>
                        {item.label}
                        <ExternalLink size={10} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                      </p>
                      <p className="font-body text-xs" style={{ color: "rgba(232,213,163,0.3)" }}>{item.sub}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#c9a84c" }}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="https://calendly.com/malikeast/15-minute-quick-meeting-phone-call-via-zoom"
                  target="_blank" rel="noopener noreferrer"
                  className="font-body text-sm transition-colors duration-150 hover:text-[#c9a84c]"
                  style={{ color: "rgba(232,213,163,0.55)" }}>
                  Book a Free Needs Analysis
                </a>
              </li>
              <li>
                <a href="mailto:info@7bandfinancialagency.com"
                  className="font-body text-sm transition-colors duration-150 hover:text-[#c9a84c]"
                  style={{ color: "rgba(232,213,163,0.55)" }}>
                  info@7bandfinancialagency.com
                </a>
              </li>
              <li>
                <Link href="/about"
                  className="font-body text-sm transition-colors duration-150 hover:text-[#c9a84c]"
                  style={{ color: "rgba(232,213,163,0.55)" }}>
                  Meet the Team
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          <p className="font-body text-xs" style={{ color: "rgba(232,213,163,0.3)" }}>
            © {new Date().getFullYear()} 7Band Financial Agency. All rights reserved.
          </p>
          <p className="font-body text-xs text-center" style={{ color: "rgba(232,213,163,0.25)" }}>
            Life insurance products and services offered through 7Band Financial Agency. Licensed in Mississippi. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

