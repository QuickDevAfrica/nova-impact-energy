'use client';
import { useState } from 'react';
import { Button } from './Button';
import { Logo } from './Logo';

export interface NavLink {
  label: string;
  href: string;
}

/**
 * UI-UX Handoff 4.1, restructured to Apple's actual header pattern (Phase 2
 * visual-system rework): sticky, translucent + blurred rather than solid,
 * compact height. All copy (links, CTA label) still comes from siteSettings
 * -- this component never hardcodes "About / Services / Our Impact / Contact".
 */
export function Nav({
  logoLabel,
  links,
  ctaLabel,
  ctaHref,
}: {
  logoLabel: string;
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-forest/90 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3 md:px-12">
        <a href="/" className="flex items-center gap-2 no-underline">
          {/* Official brand mark -- 30px on mobile, 36px on desktop, per
              brand guide. Kept at its own #2C6E49 color (never recolored),
              which is a lighter/brighter green than this bar's bg-forest
              (#0B3B37) -- worth checking in person for contrast, since the
              brand guide's own "dark background" reference is a different,
              lighter shade (#1F4D3A) than what this Nav actually uses. */}
          <Logo heightPx={30} className="h-[30px] md:h-9" />
          <span className="text-[length:var(--type-label)] font-semibold text-white">{logoLabel}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[length:var(--type-label)] text-offwhite no-underline hover:text-mint"
            >
              {link.label}
            </a>
          ))}
          <Button href={ctaHref} variant="primary" className="px-4 py-2">
            {ctaLabel}
          </Button>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 bg-forest px-5 pb-6 md:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-[length:var(--type-label)] text-offwhite no-underline">
              {link.label}
            </a>
          ))}
          <Button href={ctaHref} variant="primary" className="w-full">
            {ctaLabel}
          </Button>
        </div>
      )}
    </header>
  );
}
