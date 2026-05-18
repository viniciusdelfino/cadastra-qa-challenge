'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  SUBSCRIBERS_STORAGE_KEY,
  isValidEmail,
  loadSubscribers,
  normalizeEmail,
  saveSubscribers,
} from './storage';
import type { Subscriber } from './types';

export type SubscribeResult =
  | { ok: true; subscriber: Subscriber }
  | { ok: false; reason: 'invalid' | 'duplicate' };

export interface UseSubscribersValue {
  subscribers: Subscriber[];
  hydrated: boolean;
  subscribe: (email: string) => SubscribeResult;
  remove: (email: string) => void;
  clear: () => void;
}

export function useSubscribers(): UseSubscribersValue {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSubscribers(loadSubscribers());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveSubscribers(subscribers);
  }, [subscribers, hydrated]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== SUBSCRIBERS_STORAGE_KEY) return;
      setSubscribers(loadSubscribers());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const subscribe = useCallback(
    (rawEmail: string): SubscribeResult => {
      const email = normalizeEmail(rawEmail);
      if (!isValidEmail(email)) return { ok: false, reason: 'invalid' };

      const subscriber: Subscriber = {
        email,
        createdAt: new Date().toISOString(),
      };
      setSubscribers((prev) => [...prev, subscriber]);
      return { ok: true, subscriber };
    },
    [],
  );

  const remove = useCallback((email: string) => {
    const normalized = normalizeEmail(email);
    setSubscribers((prev) => prev.filter((sub) => sub.email !== normalized));
  }, []);

  const clear = useCallback(() => setSubscribers([]), []);

  return { subscribers, hydrated, subscribe, remove, clear };
}
