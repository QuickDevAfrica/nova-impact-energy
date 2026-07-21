/**
 * Build Charter rule 4 -- status honesty is structural, not manual.
 * This is the one place the muted "coming soon" treatment is defined;
 * every card that renders a planned/latent object reuses this, so no
 * page can forget to add the caveat by hand.
 */
export function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-sm bg-muted-bg px-2.5 py-1 text-[length:var(--type-label)] font-semibold tracking-[0.3px] text-muted-text">
      {label}
    </span>
  );
}
