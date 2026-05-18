'use client';

import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ reset }: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-stack-md px-margin-mobile text-center md:px-margin-desktop">
      <h2 className="font-display text-headline-lg italic">Something went wrong.</h2>
      <p className="font-body text-body-md text-secondary max-w-md">
        An unexpected error occurred while rendering this view. You can retry below.
      </p>
      <Button variant="ghost" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
