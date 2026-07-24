/**
 * Homepage Section 6, Row One -- "Bloomberg meets Apple" market-price
 * ticker. ~70px tall, dark, infinite, scrolls left-to-right (see
 * .nova-ticker-track in globals.css).
 *
 * Prices/changes here are illustrative placeholders, not a live feed --
 * there's no market-data source wired up yet (explicit decision: build
 * the visual component now, swap in real data later rather than block on
 * a pricing API integration). Marked aria-hidden as a whole since it's a
 * decorative, constantly-moving strip, not primary page content.
 */
export interface TickerItem {
  manufacturer: string;
  model: string;
  price: string;
  change: string;
  direction: 'up' | 'down' | 'flat';
}

const directionClasses: Record<TickerItem['direction'], string> = {
  up: 'text-mint',
  down: 'text-error',
  flat: 'text-white/60',
};

export function Ticker({ items }: { items: TickerItem[] }) {
  const loop = [...items, ...items];

  return (
    <div className="flex h-[70px] items-center overflow-hidden bg-forest" aria-hidden="true">
      <div className="nova-ticker-track flex items-center">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap border-r border-white/10 px-6">
            {/* product image placeholder -- see /images/home/ticker/{slug}.webp */}
            <div className="h-7 w-7 shrink-0 rounded-sm bg-white/10" />
            <span className="text-[length:var(--type-label)] font-semibold text-white">{item.manufacturer}</span>
            <span className="text-[length:var(--type-label)] text-light-mint">{item.model}</span>
            <span className="text-[length:var(--type-label)] font-semibold text-white">{item.price}</span>
            <span className={`text-[length:var(--type-label)] font-semibold ${directionClasses[item.direction]}`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
