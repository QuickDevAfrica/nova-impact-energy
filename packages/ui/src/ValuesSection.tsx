import { IconTools, IconAffiliate, IconDeviceDesktopAnalytics } from '@tabler/icons-react';

/**
 * Apple "Designed to make a difference" pattern: a row of exactly 3
 * columns, each an icon, a bold column title, short body text, and a
 * "->" link underneath. Solutions page only -- not a general-purpose
 * component reused on Home.
 *
 * The eyebrow/headline/body intro block is optional and, as of the
 * content-standard redesign, no longer used on the Solutions page (that
 * headline moved up to become the page's own hero) -- kept optional
 * rather than removed so the component still works standalone if reused
 * with its own heading elsewhere later.
 *
 * Icons are Tabler (@tabler/icons-react), assigned by column position
 * rather than CMS-driven -- they're decorative/structural, not copy, so
 * this doesn't violate the "everything user-facing comes from Sanity" rule
 * the way invented body text would.
 */
const ICONS = [
  IconTools, // Engineering & capacity building
  IconAffiliate, // Strategic partnerships
  IconDeviceDesktopAnalytics, // Digital innovation
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
  headline?: string;
  body?: string;
  columns: ValueColumn[];
}) {
  return (
    <div className="mx-auto max-w-[960px]">
      {headline && (
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          {eyebrow && (
            <span className="mb-3 block text-[length:var(--type-label)] font-semibold uppercase tracking-[0.5px] text-teal">
              {eyebrow}
            </span>
          )}
          <h2 className="mb-4 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{headline}</h2>
          {body && <p className="text-[length:var(--type-body)] leading-normal">{body}</p>}
        </div>
      )}

      <div className="grid gap-10 md:grid-cols-3">
        {columns.map((column, i) => {
          const ColumnIcon = ICONS[i % ICONS.length];
          return (
            <div key={column.leadIn} className="flex flex-col items-center text-center">
              <div className="mb-4 h-8 w-8 text-teal">
                <ColumnIcon size={32} stroke={1.6} aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-[length:var(--type-h3)] font-semibold">{column.leadIn}</h3>
              <p className="mb-3 text-[length:var(--type-body)] leading-normal">{column.bodyText}</p>
              <a
                href={column.linkHref}
                className="text-[length:var(--type-button)] font-semibold text-teal no-underline hover:underline"
              >
                {column.linkLabel}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
