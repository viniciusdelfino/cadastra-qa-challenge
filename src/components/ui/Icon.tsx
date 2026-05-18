import { cn } from '@/lib/cn';

interface IconProps {
  name: string;
  className?: string;
  ariaHidden?: boolean;
}

export function Icon({ name, className, ariaHidden = true }: IconProps) {
  return (
    <span
      className={cn('material-symbols-outlined', className)}
      aria-hidden={ariaHidden}
    >
      {name}
    </span>
  );
}
