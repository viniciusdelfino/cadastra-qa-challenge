import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export function SectionHeader({
  title,
  ctaHref,
  ctaLabel = 'VIEW ALL',
}: SectionHeaderProps) {
  return (
    <div className="border-outline-variant mb-stack-lg flex items-end justify-between border-b pb-stack-sm">
      <h3 className="font-display text-headline-lg italic">{title}</h3>
      {ctaHref ? (
        <Link
          href={ctaHref}
          className="font-body text-label-caps text-secondary hover:text-primary transition-colors"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
