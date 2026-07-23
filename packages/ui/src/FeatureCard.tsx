/**
 * Equal-weight benefit card: a reserved icon placeholder, a bold title,
 * one short body sentence, and an optional link. Used wherever the
 * content-standard redesign calls for "four/five equal cards" instead of
 * a numbered list or dense text block -- Solutions page's "What you'll
 * gain" / OEM benefits / Platforms sections.
 *
 * The placeholder is a fixed-size square reserving the layout an icon
 * will occupy once real illustrations exist (Nova-Impact-Energy-SVG-
 * Design-System-Spec.md) -- explicit instruction: don't wait for final
 * illustrations, reserve the correct aspect ratio now rather than
 * shipping with no visual slot at all and having to rework the layout
 * later.
 */
export function FeatureCard({
  title,
  body,
  linkLabel,
  linkHref,
}: {
  title: string;
  body: string;
  linkLabel?: string;
  linkHref?: string;
}) {
  return (
    <div className="flex flex-col rounded-md border border-border bg-white p-6">
      <div className="mb-4 h-12 w-12 rounded-md bg-muted-bg" aria-hidden="true" />
      <h4 className="mb-2 text-[length:var(--type-h3)] font-semibold">{title}</h4>
      <p className="text-[length:var(--type-body)] leading-normal">{body}</p>
      {linkLabel && linkHref && (
        <a href={linkHref} className="mt-3 text-[length:var(--type-button)] font-semibold text-teal no-underline hover:underline">
          {linkLabel}
        </a>
      )}
    </div>
  );
}
