# INSIGHT — ESTIN Research Club website

*Where curiosity meets clarity.*

The website of **INSIGHT**, the student-led research club of ESTIN (Amizour, Béjaïa, Algeria).
Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). Static site: no database, no server.

**What's still missing, by team:** [`docs/CONTENT_TODO.md`](docs/CONTENT_TODO.md)

---

## Run it locally

Requires **Node.js 22.12 or newer**.

```bash
npm install
npm run dev        # http://localhost:4321 (shows the "[…]" placeholders)
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
```

## Deploy on Vercel

1. On vercel.com: **Add New → Project → Import** this GitHub repository.
2. Vercel detects Astro automatically. Keep the defaults (build `npm run build`, output `dist`).
3. **Review version for the team:** in *Settings → Environment Variables*, add `PUBLIC_REVIEW_MODE` = `true`, then redeploy.
   It shows every missing item as `[text in brackets]` and asks search engines not to index the site.
4. **Real launch:** remove `PUBLIC_REVIEW_MODE`, redeploy, and connect the domain `insight.estin.dz` (*Settings → Domains*).

Every push to `main` redeploys automatically.

## Where things live

```
src/
  content/        ← most edits happen here (YAML + Markdown, checked at build time)
    crew.yaml          the crew (Helm, department heads, pole leads)
    departments.yaml   the 7 departments
    poles.yaml         the 4 research poles, topics, reading lists
    researchers.yaml   the research network
    partners.yaml      partner laboratories
    events/*.md        one file per event (body = description / recap)
    faq.yaml           questions & answers
  data/
    site.ts       name, tagline, email, Instagram, navigation, registrations, review mode
    club.ts       vision, activities, voyage, training levels, stats
    contact.ts    contact form key, reply time, "Who are you?" topics
  pages/          one file per page (/, /about, /research, /contact, …)
  components/     sections, cards, layout (navbar, menu, footer)
  styles/         design system (colours in global.css, components, motion)
public/           images served as-is (brand/, crew/, events/, partners/)
design/           the approved home prototype (home-v3) the site is built from
docs/             plans, design notes, content checklist
```

## Content rules

- Only publish a person's name, photo or bio **after they agree**.
- Numbers must be real (crew count, attendance).
- Anything written as `[…]` or marked `placeholder: true` is hidden in the real build and shown in dev / review mode.
- A wrong date or missing field fails the build with a clear message, so a broken page never goes live.

## Design system

Colours, fonts and components come from the approved prototype `design/prototypes/home-v3.html`:
ink/navy/blue/periwinkle palette, Space Grotesk + Inter + JetBrains Mono + Lora italic,
**sharp controls** (buttons, tabs, inputs: square corners) and **soft containers** (cards: 16 px radius),
hairline grids, "LOG 0X ·" mono eyebrows. Reuse the existing classes in `src/styles/` instead of new styles.
