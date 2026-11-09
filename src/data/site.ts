// Site-wide settings: identity, contact, navigation.
// Change values here and every page (navbar, menu, footer, SEO) follows.

export const site = {
  name: 'INSIGHT',
  fullName: 'INSIGHT Research Club',
  shortDescription: 'ESTIN Research Club',
  tagline: 'Where curiosity meets clarity.',
  quote: 'somewhere, something incredible is waiting to be known',
  description:
    'INSIGHT is the student-led research club of ESTIN, Béjaïa. Read, question and contribute to science.',
  email: 'insight@estin.dz',
  instagram: { handle: '@insight.estin', url: 'https://www.instagram.com/insight.estin/' },
  school: {
    name: 'ESTIN',
    fullName: "École Supérieure en Sciences et Technologies de l'Informatique et du Numérique",
    location: 'Amizour, Béjaïa, Algeria',
    url: 'https://estin.dz/',
  },
  founded: '2026-11-04', // Welcome Day 2026, the official start of the club
  season: '2026/27',
} as const;

/** Membership. Set `open` and `applyUrl` when the board confirms registrations (the Join page follows). */
/**
 * Review mode: set PUBLIC_REVIEW_MODE=true (e.g. on the Vercel project) to share a work-in-progress
 * version with the team. It shows every "[…]" placeholder, adds a small "Review version" badge,
 * and asks search engines not to index the site. Remove the variable for the real launch.
 */
export const reviewMode = import.meta.env.PUBLIC_REVIEW_MODE === 'true';

/**
 * "[…]" placeholders (unfilled researchers, partner lab, FAQ answers, photo labels).
 * Shown in `npm run dev` and in review mode so the layout stays visible while content is collected;
 * hidden in the real build so nothing unfinished goes live. Fill the content, and it appears.
 */
export const showPlaceholders = import.meta.env.DEV || reviewMode;

export const registrations = {
  open: false, // TODO: confirm with HR
  applyUrl: '', // TODO: Google Form link from HR
} as const;

export type NavItem = { href: string; label: string };

/** Main navigation (navbar + mobile menu). */
export const mainNav: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/research', label: 'Research' },
  { href: '/training', label: 'Training' },
  { href: '/network', label: 'Network' },
  { href: '/crew', label: 'Crew' },
  { href: '/events', label: 'Events' },
];

/**
 * Secondary links, for researchers, labs and partners (the "Join the crew" button is the students' door).
 * Navbar: Collaborate is a button beside the Join button from lg screens. Mobile menu: both, under the main list.
 */
export const secondaryNav: NavItem[] = [
  { href: '/collaborate', label: 'Collaborate' },
  { href: '/contact', label: 'Contact' },
];

/** Footer link columns. `soon: true` shows a "Soon" tag instead of a link. */
export const footerNav: { title: string; links: (NavItem & { soon?: boolean })[] }[] = [
  {
    title: 'Club',
    links: [
      { href: '/about', label: 'About' },
      { href: '/crew', label: 'Crew' },
      { href: '/events', label: 'Events' },
    ],
  },
  {
    title: 'Research',
    links: [
      { href: '/research', label: 'Research poles' },
      { href: '/training', label: 'Training' },
      { href: '/network', label: 'Research network' },
      { href: '/publications', label: 'Publications', soon: true },
    ],
  },
  {
    title: 'Get involved',
    links: [
      { href: '/join', label: 'Join the crew' },
      { href: '/collaborate', label: 'Collaborate' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

/** Link to the contact page with the "Who are you?" topic and the subject already filled in. */
export const contactUrl = (topic?: string, subject?: string) => {
  const q = new URLSearchParams();
  if (topic) q.set('topic', topic);
  if (subject) q.set('subject', subject);
  const s = q.toString();
  return `/contact${s ? `?${s}` : ''}`;
};

export const mailto = (subject?: string) =>
  `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
