/**
 * UI-UX Handoff 4.4. Numbers are *derived* upstream (apps/marketing/lib/
 * getStats.ts) from real Project documents -- this component only renders
 * whatever it's given, it never invents or hardcodes a figure.
 */
export function StatStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-6">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="text-[20px] font-medium text-forest">{s.value}</div>
          <div className="text-[11.5px] text-nova-text">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
