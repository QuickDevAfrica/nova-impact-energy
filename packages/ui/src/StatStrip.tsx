/**
 * UI-UX Handoff 4.4 -- number 20px/500 forest, label 11.5px nova-text
 * (exact spec values, deliberately not part of the fluid --type-* scale,
 * same as the original build). Phase 2 design correction: switched from
 * flex-wrap (unequal column widths, so a longer label like "Lagos & Ogun
 * States" wrapping to two lines threw off every other column's alignment)
 * to a grid with equal-width columns -- every stat now occupies the same
 * width regardless of how much its own label wraps.
 */
export function StatStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-6 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="text-[20px] font-medium text-forest">{s.value}</div>
          <div className="text-[11.5px] text-nova-text">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
