import Link from 'next/link';
import { PRIMARY_NAV } from '@/constants/navigation';
import { Logo } from '@/components/ui/Logo';
import { HeaderSearch } from '@/components/layout/HeaderSearch';
import { CartButton } from '@/features/cart/components/CartButton';

export function Header() {
  return (
    <nav
      aria-label="Primary"
      className="bg-background border-outline-variant fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b px-margin-mobile md:px-margin-desktop"
    >
      <div className="flex items-center gap-stack-lg">
        {PRIMARY_NAV.slice(0, 3).map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              index === 0
                ? 'font-body text-label-caps text-primary border-primary border-b pb-1'
                : 'font-body text-label-caps text-secondary hover:text-primary hidden transition-colors duration-300 lg:block'
            }
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 [&_img]:max-h-20">
        <Logo />
      </div>

      <div className="flex items-center gap-stack-md">
        <Link
          href={PRIMARY_NAV[3]?.href ?? '#'}
          className="font-body text-label-caps text-secondary hover:text-primary hidden transition-colors duration-300 lg:block"
        >
          {PRIMARY_NAV[3]?.label}
        </Link>
        <HeaderSearch />
        <CartButton />
      </div>
    </nav>
  );
}
