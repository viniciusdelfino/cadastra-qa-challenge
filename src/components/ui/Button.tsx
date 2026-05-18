import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'solid' | 'ghost' | 'underline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  solid:
    'bg-primary text-on-primary px-12 py-4 hover:bg-on-background/80 transition-colors duration-500',
  ghost:
    'border border-primary text-primary px-12 py-4 hover:bg-primary hover:text-on-primary transition-colors duration-500',
  underline:
    'border-b border-primary pb-1 hover:opacity-60 transition-opacity duration-300',
};

export function Button({
  variant = 'solid',
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'font-body tracking-[0.1em] text-[12px] font-semibold uppercase',
        VARIANT_CLASSES[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
