import type { Subscriber } from './types';

export const SUBSCRIBERS_STORAGE_KEY = 'cadastra-subscribers:v1';

function isValidSubscriber(value: unknown): value is Subscriber {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.email === 'string' &&
    typeof item.createdAt === 'string' &&
    item.email.length > 0
  );
}

export function loadSubscribers(): Subscriber[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SUBSCRIBERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidSubscriber);
  } catch {
    return [];
  }
}

export function saveSubscribers(subscribers: Subscriber[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      SUBSCRIBERS_STORAGE_KEY,
      JSON.stringify(subscribers),
    );
  } catch {
    // ignore quota or serialization errors
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+$/;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value);
}
