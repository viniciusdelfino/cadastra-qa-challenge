import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  as?: 'div' | 'section' | 'main' | 'article';
}

export function Container({
  children,
  className,
  as: Component = 'div',
  ...rest
}: ContainerProps) {
  return (
    <Component
      className={cn('px-margin-mobile md:px-margin-desktop', className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
