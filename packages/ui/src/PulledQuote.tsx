/**
 * About page "what we believe" -- UI-UX Handoff 5.2: pulled-quote block,
 * nova-teal accent bar on the left edge. Phase 2 correction: previously a
 * one-off 20/24px size with no source-document basis; now uses the same
 * --type-h2 scale as every Section H2 (22-26px, weight 600, Master Build
 * Brief Section 1) rather than introducing an unlisted size.
 */
export function PulledQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-teal pl-6 text-[length:var(--type-h2)] font-semibold leading-snug tracking-[-0.01em] text-nova-text">
      {children}
    </blockquote>
  );
}
