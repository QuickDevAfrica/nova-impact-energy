/** About page "what we believe" -- UI-UX Handoff 5.2: pulled-quote block,
 * larger text, nova-teal accent bar on the left edge. */
export function PulledQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-teal pl-6 text-[20px] leading-snug text-nova-text md:text-[24px]">
      {children}
    </blockquote>
  );
}
