'use client';

import { Icon } from '@/components/ui/Icon';
import { useSubscribers } from '../useSubscribers';

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export function SubscribersAdmin() {
  const { subscribers, hydrated, remove, clear } = useSubscribers();

  if (!hydrated) {
    return (
      <p
        data-testid="subscribers-loading"
        className="font-body text-label-caps text-secondary"
      >
        Loading…
      </p>
    );
  }

  return (
    <section data-testid="subscribers-admin" className="pb-section-gap">
      <div className="mb-stack-md flex flex-wrap items-center justify-between gap-stack-md">
        <p
          data-testid="subscribers-count"
          className="font-body text-label-caps text-secondary uppercase"
        >
          {subscribers.length} {subscribers.length === 1 ? 'subscriber' : 'subscribers'}
        </p>
        {subscribers.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Clear all subscribers from this browser?')) clear();
            }}
            className="font-body text-label-caps text-secondary hover:text-primary border-b border-transparent uppercase transition-colors hover:border-current"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {subscribers.length === 0 ? (
        <p
          data-testid="subscribers-empty"
          className="font-body text-body-md text-secondary py-stack-lg"
        >
          No signups yet. Submit an email through the newsletter form on the homepage to
          see it here.
        </p>
      ) : (
        <ul
          data-testid="subscribers-list"
          className="divide-outline-variant divide-y border-y border-[var(--outline-variant)]"
        >
          {subscribers.map((subscriber) => (
            <li
              key={subscriber.email}
              data-testid="subscriber-row"
              data-email={subscriber.email}
              className="flex flex-wrap items-center justify-between gap-stack-sm py-stack-md"
            >
              <div className="flex flex-col">
                <span className="font-body text-body-md">{subscriber.email}</span>
                <time
                  dateTime={subscriber.createdAt}
                  className="font-body text-label-caps text-secondary"
                >
                  {DATE_FORMATTER.format(new Date(subscriber.createdAt))}
                </time>
              </div>
              <button
                type="button"
                aria-label={`Remove ${subscriber.email}`}
                onClick={() => remove(subscriber.email)}
                className="text-secondary hover:text-primary transition-colors"
              >
                <Icon name="close" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
