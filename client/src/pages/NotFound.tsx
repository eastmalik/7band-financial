import { Home, Compass } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050400] flex items-center justify-center px-4">
      {/* Ambient gold glow, matching the site's hero treatment */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.10)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050400]/60 via-transparent to-[#050400]" />
      </div>

      <div className="relative z-10 w-full max-w-xl text-center">
        <img
          src="/manus-storage/7band-logo-clean_7b539e21.png"
          alt="7Band Financial Agency"
          className="mx-auto mb-8 h-20 w-20 object-contain"
        />

        <p className="font-tactical text-xs uppercase tracking-[0.35em] text-[#c9a84c]/70 mb-4">
          Off the Map
        </p>

        <h1 className="font-display text-6xl sm:text-7xl font-black text-[#c9a84c] gold-text-glow-intense mb-4">
          404
        </h1>

        <h2 className="font-display text-2xl sm:text-3xl font-black text-white mb-4">
          This Level Doesn't Exist Yet
        </h2>

        <p className="font-tactical text-white/60 leading-relaxed tracking-wide mb-10">
          The page you're looking for isn't here — it may have moved, or it may
          still be under construction. Your progress is safe. Pick a path below
          and keep building.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="hud-cta hud-cta-primary inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#e8c97a] transition-all"
          >
            <Home size={14} /> Return to Base
          </Link>
          <Link
            href="/game-map"
            className="hud-cta inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#c9a84c] font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#c9a84c]/10 transition-all"
          >
            <Compass size={14} /> View the Game Map
          </Link>
        </div>

        <p className="mt-12 font-tactical text-xs text-white/40 tracking-wide">
          Need a person instead?{" "}
          <a
            href="mailto:malik@7bandfinancialagency.com"
            className="text-[#c9a84c]/80 hover:text-[#c9a84c] transition-colors"
          >
            malik@7bandfinancialagency.com
          </a>
        </p>
      </div>
    </div>
  );
}
