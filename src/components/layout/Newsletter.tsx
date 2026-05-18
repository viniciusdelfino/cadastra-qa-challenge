'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSubscribers } from '@/features/subscribers/useSubscribers';

type Status =
  | { kind: 'idle' }
  | { kind: 'success'; email: string }
  | { kind: 'invalid' }
  | { kind: 'duplicate'; email: string };

export function Newsletter() {
  const { subscribe, hydrated } = useSubscribers();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = subscribe(email);
    if (result.ok) {
      setStatus({ kind: 'success', email: result.subscriber.email });
      setEmail('');
    } else if (result.reason === 'invalid') {
      setStatus({ kind: 'invalid' });
    } else {
      setStatus({ kind: 'duplicate', email: email.trim().toLowerCase() });
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus({ kind: 'idle' }), 6000);
  }

  const message = renderMessage(status);

  return (
    <section className="bg-surface-container-low border-outline-variant flex w-full flex-col items-center border-y py-section-gap">
      <h3 className="font-display text-headline-lg mb-stack-md italic">
        The Editorial Letter
      </h3>
      <p className="font-body text-body-md text-secondary mb-stack-lg max-w-xl px-margin-mobile text-center">
        Curated insights into the world of contemporary design, high-fashion, and the
        art of modern living. Delivered monthly.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-margin-mobile"
        aria-label="Newsletter signup"
        noValidate
      >
        <div className="border-primary flex border-b pb-2">
          <input
            type="email"
            required
            placeholder="EMAIL ADDRESS"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={!hydrated}
            aria-invalid={status.kind === 'invalid' || status.kind === 'duplicate'}
            aria-describedby="newsletter-status"
            className="font-body text-label-caps placeholder:text-outline w-full border-none bg-transparent focus:ring-0 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!hydrated}
            className="font-body text-label-caps tracking-widest transition-opacity hover:opacity-50 disabled:opacity-40"
          >
            SUBSCRIBE
          </button>
        </div>
        <div
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className="mt-stack-sm min-h-[1.25rem]"
        >
          {message ? (
            <p
              className={`font-body text-label-caps ${
                status.kind === 'success' ? 'text-secondary' : 'text-primary'
              }`}
            >
              {message}
            </p>
          ) : null}
        </div>
        <p className="font-body text-label-caps text-outline mt-stack-sm">
          QA tip: view all signups at{' '}
          <Link href="/subscribers" className="text-secondary hover:text-primary underline">
            /subscribers
          </Link>
          .
        </p>
      </form>
    </section>
  );
}

function renderMessage(status: Status): string | null {
  switch (status.kind) {
    case 'success':
      return `Thank you. ${status.email} is now subscribed.`;
    case 'duplicate':
      return `${status.email} is already subscribed.`;
    case 'invalid':
      return 'Please enter a valid email address.';
    default:
      return null;
  }
}
