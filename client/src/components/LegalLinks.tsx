import { Link } from "wouter";

/** Privacy Policy and Terms links shown in every footer (needed for A2P SMS compliance). */
export default function LegalLinks({ className = "" }: { className?: string }) {
  const link = "underline-offset-2 hover:underline hover:text-[#c9a84c] transition-colors";
  return (
    <p className={`font-tactical text-xs tracking-wide text-[#c9a84c]/70 ${className}`}>
      <Link href="/privacy-policy" className={link}>Privacy Policy</Link>
      {" · "}
      <Link href="/terms-and-conditions" className={link}>Terms &amp; Conditions</Link>
    </p>
  );
}
