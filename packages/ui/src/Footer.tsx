/** UI-UX Handoff 4.6. */
export function Footer({
  companyName,
  contactEmail,
  contactPhone,
  contactWebsite,
  copyrightLine,
}: {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  contactWebsite: string;
  copyrightLine: string;
}) {
  return (
    <footer className="bg-forest text-offwhite">
      <div className="mx-auto max-w-content px-5 py-12 md:px-12">
        <p className="mb-4 text-[15px] font-semibold text-white">{companyName}</p>
        <div className="mb-6 flex flex-col gap-1 text-[14.5px]">
          <a href={`mailto:${contactEmail}`} className="text-offwhite no-underline hover:text-mint">
            {contactEmail}
          </a>
          <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="text-offwhite no-underline hover:text-mint">
            {contactPhone}
          </a>
          <span>{contactWebsite}</span>
        </div>
        <p className="text-[12px] text-sage">{copyrightLine}</p>
      </div>
    </footer>
  );
}
