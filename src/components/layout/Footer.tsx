import Link from 'next/link';
import { FOOTER_COLUMNS } from '@/constants/navigation';
import { SITE } from '@/constants/site';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="bg-background border-outline-variant grid w-full grid-cols-1 gap-gutter border-t px-margin-mobile py-stack-lg md:grid-cols-2 md:px-margin-desktop">
      <div className="flex flex-col justify-between gap-stack-lg">
        <Logo height={64} width={200} className="h-16" />
        <p className="font-body text-label-caps text-secondary">
          © {SITE.copyrightYear} {SITE.shortName.toUpperCase()}. ALL RIGHTS RESERVED.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-gutter">
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title} className="flex flex-col gap-stack-md">
            <h5 className="font-body text-label-caps text-primary mb-2 uppercase">
              {column.title}
            </h5>
            {column.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-label-caps text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
