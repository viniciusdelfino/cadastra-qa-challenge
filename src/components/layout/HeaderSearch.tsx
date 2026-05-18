'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

export function HeaderSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();
    if (!query) return;

    router.push(`/collections?q=${encodeURIComponent(query)}`);
    setOpen(false);
    setValue('');
  }

  return (
    <>
      <button
        type="button"
        aria-label="Search"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="text-primary p-2 opacity-70 transition-opacity hover:opacity-100"
      >
        <Icon name="search" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Search collections"
          className="bg-background border-outline-variant fixed inset-x-0 top-0 z-[60] border-b"
        >
          <form
            onSubmit={handleSubmit}
            className="flex h-20 items-center gap-stack-md px-margin-mobile md:px-margin-desktop"
          >
            <Icon name="search" className="text-secondary" />
            <input
              autoFocus
              type="search"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="SEARCH COLLECTIONS"
              className="font-body text-label-caps placeholder:text-outline w-full border-none bg-transparent uppercase tracking-widest focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setOpen(false)}
              className="text-primary opacity-70 transition-opacity hover:opacity-100"
            >
              <Icon name="close" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
