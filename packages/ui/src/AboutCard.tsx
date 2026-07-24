/**
 * About page content-standard redesign: equal-weight card used across
 * Sections 2/4/5/7 (pillars, "how we create value," process steps, core
 * values). Distinct from FeatureCard (used on the Solutions page) because
 * the design notes for this page specify their own values: 20-24px
 * rounded corners, a #DCEFE7 border, a minimal hover effect, and 32-40px
 * internal padding -- not the same spec as Solutions' cards, so kept as
 * its own component rather than overloading FeatureCard with page-specific
 * variants.
 *
 * The icon placeholder reserves the layout/aspect ratio a real icon will
 * occupy later (Nova-Impact-Energy-SVG-Design-System-Spec.md) -- explicit
 * instruction not to wait on final illustrations.
 */
export function AboutCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col rounded-[20px] border border-card-border bg-white p-8 transition-colors duration-150 hover:border-teal md:p-9">
      <div className="mb-4 h-12 w-12 rounded-md bg-muted-bg" aria-hidden="true" />
      <h4 className="mb-2 text-[length:var(--type-h3)] font-semibold">{title}</h4>
      <p className="text-[length:var(--type-body)] leading-normal">{body}</p>
    </div>
  );
}
