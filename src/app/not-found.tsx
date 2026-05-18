import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-stack-md px-margin-mobile text-center md:px-margin-desktop">
      <p className="font-body text-label-caps text-secondary">404</p>
      <h2 className="font-display text-headline-lg italic">Page not found</h2>
      <p className="font-body text-body-md text-secondary max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="font-body text-label-caps border-primary mt-stack-md border-b pb-1"
      >
        BACK TO HOME
      </Link>
    </div>
  );
}
