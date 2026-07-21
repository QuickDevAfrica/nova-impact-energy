'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Master Build Brief 9.8: "motion used sparingly, on purpose... it signals
 * state changes, it is never decorative." Apple's own pages use a restrained
 * fade/rise as sections enter view -- this is that, and nothing more: no
 * animation library, a single IntersectionObserver and a CSS transition
 * using the shared --ease-standard/--duration-base tokens. Respects
 * prefers-reduced-motion by rendering fully visible immediately.
 */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)',
      }}
    >
      {children}
    </div>
  );
}
