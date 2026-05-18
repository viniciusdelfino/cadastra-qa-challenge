'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import type { FilterFacet } from '@/services/products.service';
import type { ProductCategory, ProductSection } from '@/types/product';

interface CollectionFiltersProps {
  sections: FilterFacet<ProductSection>[];
  categories: FilterFacet<ProductCategory>[];
}

const SECTION_LABELS: Record<ProductSection, string> = {
  'new-arrivals': 'New Arrivals',
  trending: 'Trending',
  essentials: 'Essentials',
};

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function CollectionFilters({ sections, categories }: CollectionFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openMenu, setOpenMenu] = useState<'section' | 'category' | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  const activeSection = searchParams.get('section');
  const activeCategory = searchParams.get('category');
  const hasAnyFilter = Boolean(activeSection || activeCategory);

  useEffect(() => {
    if (!openMenu) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenMenu(null);
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

  function applyFilter(key: 'section' | 'category', value: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (value === null) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    next.delete('page');
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
    setOpenMenu(null);
  }

  function clearAllHref(): string {
    const next = new URLSearchParams(searchParams.toString());
    next.delete('section');
    next.delete('category');
    next.delete('page');
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  return (
    <section
      ref={rootRef}
      className="mb-section-gap flex flex-wrap items-center gap-gutter"
    >
      <FilterDropdown
        label="Section"
        activeValue={activeSection}
        activeLabel={activeSection ? SECTION_LABELS[activeSection as ProductSection] : null}
        isOpen={openMenu === 'section'}
        onToggle={() => setOpenMenu(openMenu === 'section' ? null : 'section')}
        onClear={() => applyFilter('section', null)}
        options={sections.map((facet) => ({
          value: facet.value,
          label: SECTION_LABELS[facet.value],
          count: facet.count,
        }))}
        onSelect={(value) => applyFilter('section', value)}
      />

      <FilterDropdown
        label="Category"
        activeValue={activeCategory}
        activeLabel={activeCategory ? titleCase(activeCategory) : null}
        isOpen={openMenu === 'category'}
        onToggle={() => setOpenMenu(openMenu === 'category' ? null : 'category')}
        onClear={() => applyFilter('category', null)}
        options={categories.map((facet) => ({
          value: facet.value,
          label: titleCase(facet.value),
          count: facet.count,
        }))}
        onSelect={(value) => applyFilter('category', value)}
      />

      <div className="ml-auto">
        <Link
          href={clearAllHref()}
          aria-disabled={!hasAnyFilter}
          tabIndex={hasAnyFilter ? 0 : -1}
          className={cn(
            'font-body text-label-caps border-b border-transparent transition-all',
            hasAnyFilter
              ? 'text-primary hover:border-primary'
              : 'text-outline pointer-events-none',
          )}
        >
          Clear All
        </Link>
      </div>
    </section>
  );
}

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface FilterDropdownProps {
  label: string;
  activeValue: string | null;
  activeLabel: string | null;
  isOpen: boolean;
  options: FilterOption[];
  onToggle: () => void;
  onSelect: (value: string) => void;
  onClear: () => void;
}

function FilterDropdown({
  label,
  activeValue,
  activeLabel,
  isOpen,
  options,
  onToggle,
  onSelect,
  onClear,
}: FilterDropdownProps) {
  const buttonId = `filter-${label.toLowerCase()}-button`;
  const menuId = `filter-${label.toLowerCase()}-menu`;
  const hasActive = Boolean(activeValue);

  return (
    <div className="relative">
      <button
        id={buttonId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={onToggle}
        className={cn(
          'flex items-center gap-4 border-b px-1 py-2 transition-colors',
          hasActive ? 'border-primary text-primary' : 'border-outline text-primary',
        )}
      >
        <span className="font-body text-label-caps uppercase">
          {label}
          {activeLabel ? `: ${activeLabel}` : ''}
        </span>
        <Icon
          name={isOpen ? 'expand_less' : 'expand_more'}
          className="text-[16px]"
        />
      </button>

      {isOpen ? (
        <ul
          id={menuId}
          role="listbox"
          aria-labelledby={buttonId}
          className="bg-background border-outline-variant absolute left-0 top-full z-30 mt-2 min-w-[220px] border shadow-sm"
        >
          {hasActive ? (
            <li>
              <button
                type="button"
                onClick={onClear}
                className="font-body text-label-caps text-secondary hover:bg-surface-container-low flex w-full items-center justify-between px-4 py-2 uppercase"
              >
                <span>All {label.toLowerCase()}</span>
                <span aria-hidden>×</span>
              </button>
            </li>
          ) : null}
          {options.map((option) => {
            const isSelected = option.value === activeValue;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelect(option.value)}
                  className={cn(
                    'font-body text-body-md hover:bg-surface-container-low flex w-full items-center justify-between px-4 py-2 text-left',
                    isSelected && 'text-primary font-semibold',
                  )}
                >
                  <span>{option.label}</span>
                  <span className="text-secondary text-label-caps ml-stack-md">
                    {option.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
