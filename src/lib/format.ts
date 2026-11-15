// Formatting helpers shared by pages and components.

/** "4 NOV 2026" style date used in the mono labels. */
export const shortDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();

/** "4 November 2026" style date for body text. */
export const longDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Formats a single date or date range concisely: "15 NOV 2026", "15 – 22 NOV 2026", or "15 NOV – 1 DEC 2026". */
export const dateRangeShort = (start: Date, end?: Date) => {
  if (!end || start.getTime() === end.getTime()) return shortDate(start);
  const startDay = start.getUTCDate();
  const endDay = end.getUTCDate();
  const startMonth = start.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' }).toUpperCase();
  const endMonth = end.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' }).toUpperCase();
  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startDay} – ${endDay} ${startMonth} ${startYear}`;
    }
    return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`;
  }
  return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`;
};

/** Formats a date range in full English: "15 November – 1 December 2026". */
export const dateRangeLong = (start: Date, end?: Date) => {
  if (!end || start.getTime() === end.getTime()) return longDate(start);
  const startDay = start.getUTCDate();
  const endDay = end.getUTCDate();
  const startMonth = start.toLocaleDateString('en-GB', { month: 'long', timeZone: 'UTC' });
  const endMonth = end.toLocaleDateString('en-GB', { month: 'long', timeZone: 'UTC' });
  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startDay} – ${endDay} ${startMonth} ${startYear}`;
    }
    return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`;
  }
  return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`;
};

/** Returns the effective end date of an event (endDate or date). */
export const eventEnd = (e: { date: Date; endDate?: Date } | { data: { date: Date; endDate?: Date } }) => {
  const data = 'data' in e ? e.data : e;
  return data.endDate ?? data.date;
};

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
