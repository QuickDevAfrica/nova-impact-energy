import type { Icon as TablerIconType } from '@tabler/icons-react';

/**
 * About page content-standard redesign: equal-weight card used across
 * Sections 2/4/5/7 (pillars, "how we create value," process steps, core
 * values). Distinct from FeatureCard (used on the Solutions page) because
 * the design notes for this page specify their own values: 20-24px
 * rounded corners, a #DCEFE7 border, a minimal hover effect, and 32-40px
 * internal padding -- not the same spec as Solutions' cards, so kept as
 * its own component rather than overloading FeatureCard with page-specific
 * variants.
 *
 * `icon` is a Tabler icon component (@tabler/icons-react), chosen per
 * card by the caller based on its title/content -- falls back to the
 * neutral placeholder square when omitted.
 */
export function AboutCard({ title, body, icon: Icon }: { title: string; body: string; icon?: TablerIconType }) {
  return (
    <div className="flex flex-col rounded-[20px] border border-card-border bg-white p-8 transition-colors duration-150 hover:border-teal md:p-9">
      {Icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-muted-bg text-teal">
          <Icon size={26} stroke={1.75} aria-hidden="true" />
        </div>
      ) : (
        <div className="mb-4 h-12 w-12 rounded-md bg-muted-bg" aria-hidden="true" />
      )}
      <h4 className="mb-2 text-[length:var(--type-h3)] font-semibold">{title}</h4>
      <p className="text-[length:var(--type-body)] leading-normal">{body}</p>
    </div>
  );
}
