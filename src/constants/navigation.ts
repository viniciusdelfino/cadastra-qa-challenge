import type { FooterColumn, NavLink } from '@/types/navigation';

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Collections', href: '/collections' },
  { label: 'New Arrivals', href: '/collections?section=new-arrivals' },
  { label: 'Ready to Wear', href: '/collections?category=dresses' },
  { label: 'Accessories', href: '/collections?category=accessories' },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Information',
    links: [
      { label: 'Sustainability', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Shipping & Returns', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Store Locator', href: '#' },
    ],
  },
];
