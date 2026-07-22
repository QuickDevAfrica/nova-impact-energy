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
 */
export type SectionTone = 'forest' | 'white' | 'offwhite';

const toneClasses: Record<SectionTone, string> = {
  forest: 'bg-forest text-white',
  white: 'bg-white text-nova-text',
  offwhite: 'bg-offwhite text-nova-text',
};

export function Section({
  tone,
  children,
  className = '',
  id,
}: {
  tone: SectionTone;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`${toneClasses[tone]} ${className}`}>
      <div className="mx-auto max-w-content px-5 py-16 md:px-12 md:py-24">{children}</div>
    </section>
  );
}
