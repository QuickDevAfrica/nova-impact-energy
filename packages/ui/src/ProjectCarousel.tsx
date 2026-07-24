/**
 * Homepage Section 6, Row Two -- large cinematic Apple TV+-style carousel
 * of real-world renewable energy projects. Sits immediately under the
 * Ticker with zero gap -- the two rows read as one continuous component
 * (Section 6, "Endless Possibilities"). Infinite, right-to-left (see
 * .nova-carousel-track in globals.css).
 *
 * Project names are deliberately generic/anonymized project *types*
 * (explicit decision) rather than named companies -- the brief's own
 * examples (Tesla Gigafactory, Apple Park, etc.) would be unverified
 * capacity claims about companies with no relationship to Nova, which
 * isn't something to publish on a live production site without sourcing
 * each figure. Same visual concept and category spread, no named brands.
 */
export interface CarouselCard {
  title: string;
  location: string;
  stat: string;
}

export function ProjectCarousel({ items, heightPx = 520 }: { items: CarouselCard[]; heightPx?: number }) {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden bg-forest" style={{ height: heightPx }} aria-label="Renewable energy projects around the world">
      <div className="nova-carousel-track flex h-full items-stretch gap-5 py-6 pl-6">
        {loop.map((card, i) => (
          <div
            key={i}
            className="relative flex h-full w-[340px] shrink-0 flex-col justify-end overflow-hidden rounded-[24px] bg-white/[0.06] md:w-[420px]"
          >
            {/* cinematic project photography placeholder -- see
                /images/home/endless/{slug}.webp, reserves this card's
                exact aspect ratio for the final photography library */}
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{ background: 'linear-gradient(180deg, rgba(18,61,54,0) 45%, rgba(18,61,54,0.92) 100%)' }}
            />
            <div className="relative z-10 flex flex-col gap-1 p-7">
              <p className="text-[length:var(--type-h3)] font-semibold text-white">{card.title}</p>
              <p className="text-[length:var(--type-label)] text-light-mint">{card.location}</p>
              <p className="text-[length:var(--type-label)] text-white/80">{card.stat}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
