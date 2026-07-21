import type { NavLink } from './Nav';

/**
 * UI-UX Handoff 4.6, restructured to Apple's multi-column footer pattern
 * (Phase 2 visual-system rework) -- scaled down to what Nova actually has:
 * two real columns (site links, contact details) rather than Apple's dozen
 * category columns, since fabricating extra columns would mean inventing
 * links that don't exist. A thin border separates the link grid from the
 * legal line, same structural rhythm as apple.com's footer.
 */
export function Footer({
  companyName,
  navLinks,
  contactEmail,
  contactPhone,
  contactWebsite,
  copyrightLine,
}: {
  companyName: string;
  navLinks: NavLink[];
  contactEmail: string;
  contactPhone: string;
  contactWebsite: string;
  copyrightLine: string;
}) {
  return (
    <footer className="bg-forest text-offwhite">
      <div className="mx-auto max-w-content px-5 py-12 md:px-12">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-3">
          <div>
            <p className="mb-3 text-[15px] font-semibold text-white">{companyName}</p>
            <p className="text-[13px] leading-relaxed text-sage">
              Technical credibility for Nigeria&rsquo;s clean energy transition.
            </p>
          </div>
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.5px] text-sage">Explore</p>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-[13px] text-offwhite no-underline hover:text-mint">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.5px] text-sage">Contact</p>
            <div className="flex flex-col gap-2 text-[13px]">
              <a href={`mailto:${contactEmail}`} className="text-offwhite no-underline hover:text-mint">
                {contactEmail}
              </a>
              <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="text-offwhite no-underline hover:text-mint">
                {contactPhone}
              </a>
              <span>{contactWebsite}</span>
            </div>
          </div>
        </div>
        <p className="pt-6 text-[12px] text-sage">{copyrightLine}</p>
      </div>
    </footer>
  );
}
