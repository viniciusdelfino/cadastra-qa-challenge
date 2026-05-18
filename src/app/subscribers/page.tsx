import type { Metadata } from 'next';
import { SubscribersAdmin } from '@/features/subscribers/components/SubscribersAdmin';

export const metadata: Metadata = {
  title: 'Subscribers',
  description: 'Local list of newsletter signups for QA validation.',
};

export default function SubscribersPage() {
  return (
    <div className="px-margin-mobile pt-stack-lg md:px-margin-desktop">
      <header className="border-outline-variant mb-stack-lg border-b pb-stack-lg">
        <p className="font-body text-label-caps text-secondary mb-2">QA VIEW</p>
        <h1 className="font-display text-headline-xl">Subscribers</h1>
        <p className="font-body text-body-md text-secondary mt-stack-sm max-w-md">
          Newsletter signups are stored locally in this browser (localStorage). Use this
          view to validate the signup flow.
        </p>
      </header>
      <SubscribersAdmin />
    </div>
  );
}
