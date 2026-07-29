import type { Icon as TablerIconType } from '@tabler/icons-react';

/**
 * Equal-weight benefit card: an icon, a bold title, one short body
 * sentence, and an optional link. Used wherever the content-standard
 * redesign calls for "four/five equal cards" instead of a numbered list
 * or dense text block -- Solutions page's "What you'll gain" / OEM
 * benefits / Platforms sections.
 *
 * `icon` is a Tabler icon component (@tabler/icons-react), chosen per
 * card by the caller based on its title/content -- falls back to the
 * neutral placeholder square when omitted.
 */
export function FeatureCard({
  title,
  body,
  linkLabel,
  linkHref,
  icon: Icon,
}: {
  title: string;
  body: string;
  linkLabel?: string;
  linkHref?: string;
  icon?: TablerIconType;
}) {
  return (
    <div className="flex flex-col rounded-md border border-border bg-white p-6">
      {Icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-muted-bg text-teal">
          <Icon size={26} stroke={1.75} aria-hidden="true" />
        </div>
      ) : (
        <div className="mb-4 h-12 w-12 rounded-md bg-muted-bg" aria-hidden="true" />
      )}
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
