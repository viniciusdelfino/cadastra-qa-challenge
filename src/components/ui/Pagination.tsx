import Link from 'next/link';
import { cn } from '@/lib/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams: Record<string, string | undefined>;
}

function buildHref(
  basePath: string,
  searchParams: Record<string, string | undefined>,
  page: number,
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (value && key !== 'page' && key !== 'category') params.set(key, value);
  }

  if (page > 1) params.set('page', String(page));

  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

function formatPage(page: number): string {
  return page.toString().padStart(2, '0');
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-section-gap pb-section-gap flex items-center justify-center gap-8"
    >
      {isFirst ? (
        <span
          aria-disabled="true"
          className="font-body text-label-caps text-outline-variant cursor-not-allowed"
        >
          Previous
        </span>
      ) : (
        <Link
          href={buildHref(basePath, searchParams, currentPage - 1)}
          className="font-body text-label-caps text-secondary hover:text-primary transition-colors"
        >
          Previous
        </Link>
      )}

      <ol className="flex gap-4">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <li key={page}>
              {isActive ? (
                <span
                  aria-current="page"
                  className="font-body text-label-caps text-primary border-primary border-b"
                >
                  {formatPage(page)}
                </span>
              ) : (
                <Link
                  href={buildHref(basePath, searchParams, page)}
                  className={cn(
                    'font-body text-label-caps text-secondary hover:text-primary transition-colors',
                  )}
                >
                  {formatPage(page)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {isLast ? (
        <span
          aria-disabled="true"
          className="font-body text-label-caps text-outline-variant cursor-not-allowed"
        >
          Next
        </span>
      ) : (
        <Link
          href={buildHref(basePath, searchParams, currentPage + 1)}
          className="font-body text-label-caps text-secondary hover:text-primary transition-colors"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
