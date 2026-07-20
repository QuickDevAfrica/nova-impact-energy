'use client';
import { useState } from 'react';
import { Button } from './Button';

export interface NavLink {
  label: string;
  href: string;
}

/** UI-UX Handoff 4.1. All copy (links, CTA label) comes from siteSettings --
 * this component never hardcodes "About / Services / Our Impact / Contact". */
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
    <header className="bg-forest text-white">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 md:px-12">
        <a href="/" className="flex items-center gap-2 no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint text-[14px] font-semibold text-forest">
            N
          </span>
          <span className="text-[14px] font-semibold text-white">{logoLabel}</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-[13px] text-offwhite no-underline hover:text-mint">
              {link.label}
            </a>
          ))}
          <Button href={ctaHref} variant="primary">
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
            <a key={link.href} href={link.href} className="text-[14px] text-offwhite no-underline">
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
