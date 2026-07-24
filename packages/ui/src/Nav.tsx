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
 *
 * Second pass, matched directly against apple.com's own header (client
 * screenshot reference): apple.com's bar is a *light* frosted-glass blur
 * (translucent white/gray, dark text) -- not a dark, colored one. Changed
 * from bg-forest/90 + white text to bg-white/70 + backdrop-blur + dark
 * text. The brand mark itself is untouched (still its own fixed #2C6E49,
 * never recolored) -- it now simply reads correctly against a light bar
 * instead of fighting the previous dark-green one for contrast.
 *
 * The mobile menu is rebuilt to match apple.com's own mobile nav exactly
 * (client screenshot reference): a full-screen white overlay, a single
 * close (X) in the same top-right spot the hamburger occupied, and a
 * left-aligned, large-type list of links -- no dark background, no CTA
 * button crammed into the list (kept below the links, since this site
 * has one real CTA apple.com's own nav doesn't need).
 *
 * Bug fix (live-site report: only the first link showed, huge blank gap
 * below it, page content visible underneath): the overlay was a `fixed`
 * child *inside* `<header>`, and `backdrop-filter` (the header's own
 * backdrop-blur-xl) creates a new containing block for fixed descendants
 * -- so the overlay was positioning itself relative to the ~57px-tall
 * header box, not the viewport, collapsing it to almost no height. Fixed
 * by moving the overlay out to be a sibling of `<header>` instead of a
 * child of it, so `fixed` resolves against the viewport as intended.
 * Link gap also tightened (28px -> 22px) per feedback that the spacing
 * read as too loose once the layout itself was fixed.
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
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 text-nova-text backdrop-blur-xl">
        <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3 md:px-12">
          <a href="/" className="flex items-center gap-2 no-underline">
            {/* Official brand mark -- 30px on mobile, 36px on desktop, per
                brand guide. Fixed at its own #2C6E49 (never recolored). */}
            <Logo heightPx={30} className="h-[30px] md:h-9" />
            <span className="text-[length:var(--type-label)] font-semibold text-nova-text">{logoLabel}</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[length:var(--type-label)] text-nova-text no-underline hover:text-teal"
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
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="text-nova-text md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Full-screen white overlay, apple.com's own mobile-menu pattern --
          left-aligned, large type, tightened vertical rhythm, no dividers.
          Deliberately a SIBLING of <header>, not a child -- see the note
          above about backdrop-filter and fixed-position containing blocks. */}
      {open && (
        <div className="fixed inset-x-0 top-[57px] bottom-0 z-50 flex flex-col overflow-y-auto bg-white px-6 pb-10 pt-8 md:hidden">
          <nav className="flex flex-col gap-[22px]">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[28px] font-normal leading-none text-nova-text no-underline"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button href={ctaHref} variant="primary" className="mt-8 w-fit" onClick={() => setOpen(false)}>
            {ctaLabel}
          </Button>
        </div>
      )}
    </>
  );
}
