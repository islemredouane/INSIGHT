// Formatting helpers shared by pages and components.

/** "4 NOV 2026" style date used in the mono labels. */
export const shortDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();

/** "4 November 2026" style date for body text. */
export const longDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const eventTypeLabel: Record<string, string> = {
  event: 'Event',
  talk: 'Talk',
  workshop: 'Workshop',
  'paper-reading': 'Paper reading',
  training: 'Training',
  social: 'Social',
};

/** Two-letter initials from a full name ("Faci Souhaib Abdelouakil" → "FS"). */
export const initials = (name: string) =>
  name.replace(/^Dr\.?\s+/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('');

/** Today at 00:00 UTC, so an event stays "upcoming" for the whole day it happens. */
export const todayUTC = () => {
  const n = new Date();
  return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()));
};
