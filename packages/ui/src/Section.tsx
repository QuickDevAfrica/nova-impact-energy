import type { ReactNode } from 'react';

/**
 * Enforces the alternating dark/light section rhythm -- UI-UX Handoff
 * Section 3: never two dark or two light sections back to back.
 */
/**
 * 'yellow' deliberately removed as a section tone (Phase 2 design
 * correction): yellow is reserved for the primary Button fill only, never
 * a section/page background -- keeping that rule enforced at the type
 * level means a future page can't accidentally reintroduce it.
 *
 * 'soft' added for the About page content-standard redesign: a second
 * light section background (#F7FCF9), alternated with white instead of
 * `offwhite` -- explicit hex given for that page, distinct from the
 * warmer `offwhite` (#F4F1E9) used elsewhere.
 */
export type SectionTone = 'forest' | 'white' | 'offwhite' | 'soft';

const toneClasses: Record<SectionTone, string> = {
  forest: 'bg-forest text-white',
  white: 'bg-white text-nova-text',
  offwhite: 'bg-offwhite text-nova-text',
  soft: 'bg-soft text-nova-text',
};

export function Section({
  tone,
  children,
  className = '',
  id,
  maxWidthClassName = 'max-w-content',
  paddingClassName = 'px-5 py-16 md:px-12 md:py-24',
  noInnerPadding = false,
}: {
  tone: SectionTone;
  children: ReactNode;
  className?: string;
  id?: string;
  /** Homepage content-standard redesign only: the shared 1120px content
   * width stays the default for every other page; the homepage opts into
   * a wider 1280-1440px container instead of changing the sitewide token
   * (explicit instruction: layout width changes are homepage-only). */
  maxWidthClassName?: string;
  /** Homepage content-standard redesign only: the shared 64-96px section
   * padding stays the default elsewhere; the homepage opts into the
   * larger 120-180px vertical rhythm its spec calls for. */
  paddingClassName?: string;
  /** Section 6 ("Endless Possibilities") is one continuous, edge-to-edge
   * component (ticker + carousel, no gap) -- it manages its own inner
   * width/padding per row, so the wrapper must not add any. */
  noInnerPadding?: boolean;
}) {
  return (
    <section id={id} className={`${toneClasses[tone]} ${className}`}>
      {noInnerPadding ? children : <div className={`mx-auto ${maxWidthClassName} ${paddingClassName}`}>{children}</div>}
    </section>
  );
}
