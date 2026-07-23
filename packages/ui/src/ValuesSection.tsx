/**
 * Apple "Designed to make a difference" pattern: eyebrow -> large headline
 * -> one body paragraph -> a row of exactly 3 columns, each an icon, a bold
 * lead-in phrase followed by regular body text, and a "->" link underneath.
 * Solutions page only (Phase 2 explicit instruction) -- not a general-
 * purpose component reused on Home.
 *
 * No real icon assets exist yet (per the asset pipeline's honest-placeholder
 * rule), so the 3 icons are simple inline SVGs assigned by column position
 * rather than CMS-driven -- they're decorative/structural, not copy, so
 * this doesn't violate the "everything user-facing comes from Sanity" rule
 * the way invented body text would.
 */
const ICONS = [
  // Engineering & capacity building -- wrench/tools
  <svg key="engineering" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path
      d="M22.5 6.5a5.5 5.5 0 0 0-7.6 6.9L6 22.3a2.5 2.5 0 0 0 3.5 3.5l8.9-8.9a5.5 5.5 0 0 0 6.9-7.6l-3.6 3.6-2.8-.8-.8-2.8 3.6-3.6Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  // Strategic partnerships -- linked nodes / handshake
  <svg key="partnerships" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="9" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="23" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="16" cy="23" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M11.8 12.2 13.6 20M20.2 12.2 18.4 20M12.5 10h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  // Digital innovation -- monitor / connected platform
  <svg key="digital" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="5" y="7" width="22" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 25h8M16 21v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M9.5 17.5 13 14l3 3 6.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

interface ValueColumn {
  leadIn: string;
  bodyText: string;
  linkLabel: string;
  linkHref: string;
}

export function ValuesSection({
  eyebrow,
  headline,
  body,
  columns,
}: {
  eyebrow?: string;
  headline: string;
  body: string;
  columns: ValueColumn[];
}) {
  return (
    <div className="mx-auto max-w-[960px]">
      <div className="mx-auto mb-12 max-w-[640px] text-center">
        {eyebrow && (
          <span className="mb-3 block text-[length:var(--type-label)] font-semibold uppercase tracking-[0.5px] text-teal">
            {eyebrow}
          </span>
        )}
        <h2 className="mb-4 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{headline}</h2>
        <p className="text-[length:var(--type-body)] leading-normal">{body}</p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {columns.map((column, i) => (
          <div key={column.leadIn} className="flex flex-col items-center text-center">
            <div className="mb-4 h-8 w-8 text-teal">{ICONS[i % ICONS.length]}</div>
            <p className="mb-3 text-[length:var(--type-body)] leading-normal">
              <span className="font-semibold">{column.leadIn}</span> {column.bodyText}
            </p>
            <a href={column.linkHref} className="text-[length:var(--type-button)] font-semibold text-teal no-underline hover:underline">
              {column.linkLabel}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
