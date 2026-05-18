import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/constants/site';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
  href?: string;
}

export function Logo({
  className,
  height = 48,
  width = 160,
  href = '/',
}: LogoProps) {
  return (
    <Link href={href} aria-label={SITE.name} className={cn('inline-flex', className)}>
      <Image
        src={SITE.logoUrl}
        alt={`${SITE.name} logo`}
        width={width}
        height={height}
        className="h-auto w-auto object-contain"
        priority
        unoptimized
      />
    </Link>
  );
}
