# INSIGHT Website — Full Site Plan

> 9 November 2026. The landing page (`design/prototypes/home-v3.html`) sets the design system: colours, fonts,
> square controls / soft containers, hairline grids, monospace "LOG" eyebrows, motion. This plan covers
> **everything else**: the pages, the content each one needs, the data behind it, what to collect from
> the club, and the build steps in Astro + Tailwind.

---

## 1. Where we are

| | Status |
|---|---|
| Design system | ✅ Done (in v3): tokens, buttons, tags, grids, cards, navbar, mobile menu, footer, motion |
| Home page | ✅ Designed and working as a static essay |
| Real pages | ❌ None. Navbar and footer links are anchors on the home page |
| Dead links | **14** `href="#"` (event details, profiles, "Visit the lab", "Meet the full crew"…) |
| Placeholders | **~40** `[brackets]` (6 researchers, the lab, pole descriptions, next event, photos, 2 FAQ answers) |
| Photos | 1 of 6 Helm photos (temporary preview), 0 event photos, 0 researcher photos except names |
| Code base | Not started (Astro project, components, content files, deploy) |

**Goal of the site:** prove that INSIGHT is a serious research club, and turn visitors into
(1) members, (2) collaborators (researchers, labs, partners), (3) followers.

---

## 2. Sitemap

```
/                         Home                                ← done (port to Astro)
/about                    About the club
/research                 Research programs (overview)
/research/ai              AI & Data Science pole
/research/security        Cybersecurity pole
/research/software        Software & Systems pole
/research/networks        Networks & IoT pole
/training                 Training: Rookie → Captain
/network                  Research network: partner lab + 7 researchers
/crew                     The crew: helm, departments, pole leads
/events                   Events: upcoming + past
/events/[slug]            One event (Welcome Day 2026 first)
/join                     Join the crew (open / closed states)
/collaborate              For researchers, labs, sponsors, clubs
/logbook                  News, recaps, paper notes            (phase 2)
/logbook/[slug]           One post                             (phase 2)
/projects/[slug]          One research project                 (phase 2, when projects start)
/publications             "The One Paper": members' papers     (phase 3, when the first exists)
/crew/2026-27             Archive of each year's crew          (phase 3, from the 2nd year)
/privacy                  Short privacy note (forms, analytics)
/404                      "This island isn't on the map."
```

**Navbar (desktop):** About · Research · Training · Network · Crew · Events + **Join the crew**
*(add "Network" between Training and Crew: it's the club's strongest credibility asset)*
**Footer:** Club (About, Crew, Events) · Research (Poles, Training, Network, Publications *soon*) ·
Get involved (Join, Collaborate, Contact) · A club of ESTIN.

---

## 3. Page by page

Each page reuses the home components. "LOG" numbers restart per page.

### 3.1 `/about` — About the club
**Goal:** who we are, why we exist, how we're organised. Read by students, ESTIN staff, partners.

| Section | Content | Component |
|---|---|---|
| Page header (dark) | "We read, question and contribute to science." + one-line intro | PageHeader |
| Our story | When/why the club started; Welcome Day 4 Nov 2026 as the founding moment; short timeline (only real dates) | Story + Timeline |
| Vision & 4 directions | Same as home, bigger | Directions grid |
| How the ship is organised | Org chart: Helm → 7 departments → 4 poles (Research Programs + Training marked "The heart") | OrgChart |
| Our values / how we work | 3–4 principles (open to all, honest science, learn by doing, credit everyone) | Hairline grid |
| Numbers | 27 · 7 · 4 · 7 researchers | StatBand |
| CTA | Meet the crew → / Join → | CTA band |

**Content needed:** founding story (5–8 lines, from the Helm), values (validate), real dates only.

### 3.2 `/research` — Research programs
**Goal:** show that real research happens and how a student takes part.

| Section | Content |
|---|---|
| Header | "Where questions become discoveries." · Head of Research: Allaoua Ait Abdelghani |
| The mission | 4 items from the deck (projects in 4 poles, form teams, question → paper, connect with researchers) |
| The 4 poles | 4 large cards → each links to its pole page |
| The voyage | 6-step route (reuse the animated route) → The One Paper |
| How you take part | Join the crew → join a project team → contribute |
| Current projects | Project cards, or an honest empty state: "Our first projects are being formed." |
| Network teaser | 3 researcher cards + partner lab → `/network` |

### 3.3 `/research/[pole]` × 4 — One template, 4 pages
| Section | Content |
|---|---|
| Header | Pole number + name, one-line description |
| What we explore | 3–6 topics with one sentence each |
| Pole leads | Lead cards (photo, name, year/speciality) |
| Projects | Projects in this pole (or empty state) |
| Reading list | 5–10 starter papers (title, authors, year, link) |
| Upcoming sessions | Events filtered by pole |
| CTA | "Join this pole" → `/join?pole=ai` |

**Content needed per pole (from its leads):** description, topics, reading list, projects.

### 3.4 `/training` — Rookie → Captain
| Section | Content |
|---|---|
| Header | "Every captain started as a rookie." · Head of Training: Sakhri Mohammed Firas |
| The path | 4 levels (Rookie: paper reading · Navigator: methodology · Scholar: academic writing · Captain: workshops), vertical ladder |
| The shipyard & the voyage | Training ↔ Research diagram ("Learn by doing. Do by learning.") |
| Session formats | Paper reading circle, workshop, methodology talk, writing clinic (duration, frequency) |
| Upcoming sessions | From the events data, type = training |
| Resources | Reading list, guides (how to read a paper, LaTeX/Overleaf, Zotero, arXiv), slides of past workshops |

**Content needed:** the semester's training calendar, session formats, resource links.

### 3.5 `/network` — Research network
| Section | Content |
|---|---|
| Header | "A network of researchers." |
| Partner lab | Full block: logo, name, institution, country, what we do together, contact person, link |
| Researchers | 7 full profiles: photo, name, title, institution, country, fields, short bio (2–3 lines), how they work with INSIGHT (mentor / talk / co-supervision), links (Scholar, lab page) |
| Talks archive | Past guest talks (Dr. Pin-Yu Chen at Welcome Day…) |
| Become a collaborator | → `/collaborate` |

**Content needed:** each researcher's details + **written OK to be listed**; same for the lab.

### 3.6 `/crew` — The crew
| Section | Content |
|---|---|
| Header + filter | All · Helm · Departments · Research poles |
| The Helm | 6 masthead cards (done on home) |
| 7 departments | Each: name, one-line role ("the lookouts and messengers"…), what they handle (4 items from the deck), heads |
| Pole leads | 4 columns, 1–3 leads each |
| Full crew (27) | Compact list of all members by department |
| Join CTA | "Want to be on this page next year?" |

**Content needed:** full list of the 27 (name, role, department), photos, consent.

### 3.7 `/events` and `/events/[slug]`
**List page:** Upcoming (featured next event) · Past (cards by date) · filter by type (talk, workshop,
paper reading, social).
**Detail page:** cover photo · date, place, attendance · story (Markdown) · programme timeline ·
speakers (link to `/network`) · gallery with lightbox · "Add to calendar" (.ics) for upcoming events.

**First entry:** Welcome Day 2026 (4 Nov): recap text, programme, Dr. Pin-Yu Chen's talk, photos,
real attendance.

### 3.8 `/join` — Join the crew
| State | Content |
|---|---|
| **Open** | "Registrations open · 2026/27" · how it works (apply → welcome session → pick a pole and start at Rookie) · pick your pole (4 cards + support departments) · what you get · FAQ · **Apply** (Google Form) |
| **Closed** | "The next crew sets sail soon." · follow on Instagram · email to be notified |

One setting switches the state site-wide (button labels too), like Rasa's `/registrations` ↔
`/noregistrations`. Short link: `/apply` → `/join`.

### 3.9 `/collaborate`
For researchers, labs, companies, other clubs: give a talk · mentor a team · co-supervise a project ·
partner or sponsor · co-organise an event. Contact: email (insight@estin.dz) + optional form.

### 3.10 Phase 2–3 pages
- **`/logbook`**: event recaps, paper-reading notes, member interviews, announcements (Markdown posts).
- **`/projects/[slug]`**: question, pole, team, supervisor, status (exploring / experimenting / writing /
  published), progress log, outputs.
- **`/publications`**: "The One Paper": title, authors (members in bold), venue, year, PDF/DOI.
- **`/crew/[year]`**: each year's crew archived when the board changes.

### 3.11 Small but required
- **404** "This island isn't on the map." · **`/privacy`** (what forms collect, analytics if any).
- **OG share images** per page (branded 1200×630, like Rasa's).
- **favicon set** + `manifest.webmanifest` (installable, like Rasa).

---

## 4. Data model (Astro content collections)

All content lives in simple files, so any member can update the site without touching code.

| Collection | Fields | Used on |
|---|---|---|
| `crew` | name, role, department, pole?, photo, order, year, links | Home, Crew, Pole pages |
| `departments` | slug, name, tagline, duties[], heads[] | About, Crew |
| `poles` | slug, number, name, description, topics[{title, text}], leads[], readingList[] | Home compass, Research, Pole pages |
| `researchers` | name, title, institution, country, fields[], bio, role (mentor/talk/co-supervision), photo, links{scholar, lab}, consent (date) | Home, Network, Events |
| `partners` | name, institution, country, logo, url, summary, contact | Home, Network |
| `events` (Markdown) | title, slug, date, endDate, type, location, poles[], speakers[], cover, summary, attendance, gallery[], registrationUrl, body | Home, Events, Training, Pole pages |
| `posts` (Markdown, phase 2) | title, date, author, tags, cover, summary, body | Logbook, Home |
| `projects` (phase 2) | title, pole, status, team[], supervisors[], summary, outputs[] | Research, Pole pages |
| `publications` (phase 3) | title, authors[], venue, year, url, doi, pole, project | Publications |
| `faq` | question, answer, pages[] | Home, Join |
| `settings` | registrationsOpen, applyUrl, email, instagram, stats{crew, departments, poles, researchers, countries} | Everywhere |

Schemas are validated (zod), so a missing field or a typo in a date fails the build instead of
breaking the page.

---

## 5. Content to collect (by department)

| Owner | What | Needed for |
|---|---|---|
| **Design** | Logo as **SVG** (light + dark versions), the dark-background logo as transparent PNG, OG image template | Everything |
| **Helm** | Founding story (5–8 lines), values, confirm the 2 FAQ answers (which years can join, time per week) | About, FAQ |
| **Helm + ESTIN** | Domain (ask for **insight.estin.dz**, like empreinte.estin.dz) | Launch |
| **HR** | Full list of the 27 (name, role, department) + photos + consent; join form link; registrations open or closed | Crew, Join |
| **Research Programs + pole leads** | Each pole: description, 3–6 topics, reading list (5–10 papers); projects when they start | Home, Research, Pole pages |
| **Training** | Training calendar for the semester, session formats, resource links | Training, Events |
| **External Relations** | 7 researchers (name, title, institution, country, fields, bio, links, photo, **consent**) + partner lab (name, logo, url, summary, **consent**) | Home, Network |
| **Communication & Media** | Welcome Day photos + recap + real attendance; event photos from now on; Instagram posts to link | Events, Home |
| **Events & Logistics** | Calendar of upcoming events (title, date, room, type) | Home, Events |

**Rule:** nothing goes live with a `[placeholder]` or an invented fact. A section with no content yet
shows an honest empty state ("Our first projects are being formed.") or stays hidden.

---

## 6. Technical architecture

```
insight-website/
├── src/
│   ├── components/
│   │   ├── layout/      Navbar · MobileMenu · Footer · PageHeader · Section · SectionHeader
│   │   ├── ui/          Button · Tag · HairlineGrid · Card · Portrait · StatBand · FAQ · EmptyState
│   │   ├── home/        Hero (+ beam canvas) · Compass · VoyageRoute · SixWays · Masthead
│   │   └── content/     MemberCard · ResearcherCard · PartnerBand · EventRow · EventCard · PostCard
│   ├── content/         crew/ departments/ poles/ researchers/ partners/ events/ posts/ faq/ (+ config.ts schemas)
│   ├── data/            settings.json
│   ├── layouts/         Base.astro (SEO, fonts, motion script) · Page.astro · Post.astro
│   ├── pages/           index · about · research/[pole] · training · network · crew · events/[slug] · join · collaborate · 404
│   ├── scripts/         motion.ts · menu.ts · compass.ts · beam.ts · faq.ts
│   └── styles/          tokens.css (colours, fonts, radius scale, buttons)
├── public/              favicons, manifest, og/, robots.txt, llms.txt
└── astro.config.mjs     sitemap, Tailwind, image service
```

**Key choices**
- **Astro + Tailwind** (compiled, not the CDN): static HTML, zero JavaScript by default. Only the
  menu, compass, beam, FAQ and motion scripts ship JS (~10 KB total).
- **Fonts self-hosted** (`@fontsource`) instead of Google Fonts: faster, no third-party request.
- **Images** through `astro:assets`: automatic WebP/AVIF, sizes per device, lazy loading.
- **Hosting:** Vercel (free), GitHub repo, a preview link for every change, so the board can review
  before it goes live.
- **Forms:** join = Google Form (like Rasa). Contact = email first; a Vercel form function later if needed.
- **SEO:** per-page title/description/OG image, JSON-LD (`Organization`, `Event`, `Person`,
  `CollegeOrUniversity` for ESTIN), `sitemap.xml`, `robots.txt`, `llms.txt` (like Rasa).
- **Accessibility:** WCAG AA contrast, keyboard navigation (done for the menu), reduced motion
  (done), alt text on every photo.
- **Editing:** content files in the repo (Markdown/JSON). Phase 2 option: a visual editor
  (**Keystatic** or **Decap CMS**) so Communication & HR can update events and crew without code.
- **Quality bar before launch:** Lighthouse ≥ 95 on all four scores, no console errors, tested on a
  real Android phone and iPhone, no horizontal scroll at 360 px.

---

## 7. Build phases

### Phase 0 — Set up (½ week)
1. GitHub repo + Astro + Tailwind + Vercel preview.
2. Port the design tokens from v3 (colours, fonts, radius scale, button classes, motion CSS).
3. Port shared components: Navbar, MobileMenu, Footer, Button, Tag, HairlineGrid, SectionHeader, Reveal.
4. Content schemas + seed files with the data we already have (Helm, poles + leads, departments,
  Dr. Chen, Welcome Day).

### Phase 1 — Launch (≈ 2 weeks)
5. **Home** (port v3 into components, fed by content files).
6. **About**, **Crew**, **Research** + **4 pole pages**, **Training**, **Network**.
7. **Events** list + **Welcome Day 2026** detail page.
8. **Join** (open/closed) + **Collaborate**.
9. 404, privacy, OG images, favicons, sitemap, JSON-LD, llms.txt.
10. QA: Lighthouse, accessibility, phones, content review by the Helm → **launch on insight.estin.dz**.

### Phase 2 — Grow (after launch)
11. Logbook + first posts (Welcome Day recap, first paper-reading notes).
12. Project pages, as soon as the first teams form.
13. Visual editor (Keystatic/Decap) + a short "how to update the site" guide for each department.
14. Optional: contact form function, privacy-friendly analytics.

### Phase 3 — Prove
15. Publications ("The One Paper").
16. Crew archives per year.
17. French version (Astro i18n) if the club wants it.

**Critical path:** Phase 1 can be *built* with placeholders, but it can only *launch* when these
arrive: logo SVG, the 28 crew list + consent, researchers + lab details + consent, pole descriptions,
Welcome Day photos, domain.

---

## 8. Small fixes to carry into the build
- Numbers band: "1 guest from IBM Research" → **"7 researchers in our network"** once the count is confirmed.
- Navbar: add **Network**.
- Researchers: confirm the count (7) and fill **[N] countries**.
- Replace the temporary preview photo link for Redouane with a project asset once approved.
- Confirm spelling "Madoui Roufaida" vs "Madaoui".
