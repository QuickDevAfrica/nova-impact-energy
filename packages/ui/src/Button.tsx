import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

/**
 * Master Build Brief Section 2 / UI-UX Handoff 4.2.
 * Primary = yellow bg, nova-text label. Secondary = forest bg, white label
 * (used inside yellow sections). Ghost = teal outline, rarely needed in V1.
 * 8px radius, no shadows, no gradients -- enforced here so no page can
 * improvise a fourth variant.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-yellow text-nova-text hover:bg-teal hover:text-white',
  secondary: 'bg-forest text-white hover:bg-teal',
  ghost: 'bg-transparent text-teal border border-teal hover:bg-teal hover:text-white',
};

/**
 * Transition timing/easing and the fluid button-text size come from the
 * shared tokens (--ease-standard/--duration-fast/--type-button) rather than
 * Tailwind's defaults, so every interactive element in the site eases the
 * same way -- one of the things that makes Apple's UI feel like one system
 * rather than a pile of individually-tuned components. The active:scale is
 * the one bit of press feedback Apple's own buttons use -- subtle, and
 * still just a state change, not decoration.
 */
const base =
  'inline-flex items-center justify-center rounded-sm px-5 py-3 text-[length:var(--type-button)] font-semibold no-underline active:scale-[0.97]';
const baseStyle = {
  transition: 'background-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)',
};

interface CommonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: AsButton | AsLink) {
  const { variant = 'primary', children, className = '', ...rest } = props as CommonProps & Record<string, unknown>;
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if ('href' in rest && typeof rest.href === 'string') {
    return (
      <a className={classes} style={baseStyle} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} style={baseStyle} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
