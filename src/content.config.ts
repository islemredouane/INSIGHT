// Content collections: everything that grows or changes over time.
// Each collection is a simple YAML/Markdown file in src/content/, validated by the schemas below,
// so a missing field or a wrong date fails the build instead of breaking a page.
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** People of the club (Helm, department heads, pole leads, members). */
const crew = defineCollection({
  loader: file('src/content/crew.yaml'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    group: z.enum(['helm', 'department', 'pole', 'member']),
    department: z.string().optional(), // department id
    pole: z.string().optional(), // pole id
    duty: z.string().optional(), // one line, shown on cards
    photo: z.string().optional(), // path under /public, e.g. /crew/faci.jpg
    photoPosition: z.string().optional(), // CSS object-position, e.g. "top" or "center 20%"
    order: z.number().default(100),
    season: z.string().default('2026/27'),
  }),
});

/** The 7 departments. */
const departments = defineCollection({
  loader: file('src/content/departments.yaml'),
  schema: z.object({
    number: z.number(),
    name: z.string(),
    onBoardAs: z.string(), // "The lookouts and messengers…"
    handles: z.array(z.string()), // what the crew handles
    closing: z.string(), // one-line summary
    heart: z.boolean().default(false), // Research Programs + Training = "the heart"
  }),
});

/** The 4 research poles. */
const poles = defineCollection({
  loader: file('src/content/poles.yaml'),
  schema: z.object({
    number: z.number(),
    name: z.string(),
    short: z.string(),
    description: z.string(),
    topics: z.array(z.object({ title: z.string(), text: z.string() })),
    draft: z.boolean().default(false), // true = text still to validate with the pole leads
    readingList: z.array(z.object({ title: z.string(), authors: z.string(), year: z.number(), url: z.string().url() })).default([]),
  }),
});

/** Researchers in the INSIGHT network. */
const researchers = defineCollection({
  loader: file('src/content/researchers.yaml'),
  schema: z.object({
    name: z.string(),
    initials: z.string(),
    title: z.string(),
    institution: z.string(),
    country: z.string(),
    fields: z.array(z.string()).max(3),
    bio: z.string().optional(),
    highlights: z.array(z.string()).default([]),
    badge: z.string().optional(), // e.g. "Welcome Day guest"
    links: z.object({ profile: z.string().optional(), scholar: z.string().optional(), site: z.string().optional() }).default({}),
    photo: z.string().optional(),
    placeholder: z.boolean().default(false), // true until the real, approved details arrive
    order: z.number().default(100),
    research: z.array(z.object({ title: z.string(), works: z.array(z.string()) })).default([]),
    relevance: z.array(z.string()).default([]),
  }),
});

/** Partner laboratories. */
const partners = defineCollection({
  loader: file('src/content/partners.yaml'),
  schema: z.object({
    name: z.string(),
    institution: z.string(),
    country: z.string(),
    summary: z.string(),
    url: z.string().optional(),
    logo: z.string().optional(),
    placeholder: z.boolean().default(false),
  }),
});

/** Events: one Markdown file each (the body is the recap). */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    type: z.enum(['event', 'talk', 'workshop', 'paper-reading', 'training', 'social']),
    location: z.string(),
    summary: z.string(),
    poles: z.array(z.string()).default([]),
    speakers: z.array(z.string()).default([]), // researcher ids
    programme: z.array(z.object({ time: z.string().optional(), title: z.string(), text: z.string().optional() })).default([]),
    attendance: z.number().optional(),
    cover: z.string().optional(),
    coverFit: z.enum(['cover', 'contain']).default('cover'), // contain = show a portrait poster whole, on a blurred copy of itself
    gallery: z.array(z.string()).default([]),
    registrationUrl: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

/** Frequently asked questions; `pages` says where each one appears. */
const faq = defineCollection({
  loader: file('src/content/faq.yaml'),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    pages: z.array(z.enum(['home', 'join'])).default(['home', 'join']),
    order: z.number().default(100),
  }),
});

export const collections = { crew, departments, poles, researchers, partners, events, faq };
