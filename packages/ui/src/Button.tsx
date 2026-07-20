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

const base =
  'inline-flex items-center justify-center rounded-sm px-5 py-3 text-[14px] md:text-[15px] font-semibold transition-colors duration-150 no-underline';

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
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
