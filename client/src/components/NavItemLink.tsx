import type { ReactNode } from "react";
import { Link } from "wouter";

type NavItemLinkProps = {
  href: string;
  /** External destinations open in a new tab instead of routing in-app. */
  external?: boolean;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  children: ReactNode;
};

/**
 * Renders a navigation entry as an in-app route or, for external
 * destinations, as a plain link that opens in a new tab. Wouter's Link
 * treats every href as an internal path, so external URLs need an anchor.
 */
export default function NavItemLink({
  href,
  external,
  className,
  onClick,
  style,
  children,
}: NavItemLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick} style={style}>
      {children}
    </Link>
  );
}
