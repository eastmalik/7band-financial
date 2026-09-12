import type { ReactNode } from "react";
import { Link } from "wouter";

type NavItemLinkProps = {
  href: string;
  /** External destinations need a plain anchor: wouter routes every href in-app. */
  external?: boolean;
  /**
   * External links stay in the same tab by default so the browser back
   * button returns the visitor to the site. Set this to open a new tab.
   */
  newTab?: boolean;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  children: ReactNode;
};

/**
 * Renders a navigation entry as an in-app route, or as a plain anchor for
 * external destinations — wouter's Link treats every href as an internal
 * path. External links stay in the same tab unless newTab is set, so the
 * browser back button can return the visitor to the site.
 */
export default function NavItemLink({
  href,
  external,
  newTab,
  className,
  onClick,
  style,
  children,
}: NavItemLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
