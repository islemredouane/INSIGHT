# INSIGHT Research Club — Website Plan

> Draft, 9 November 2026. Based on the logo files, the banner, the Welcome Day 2026 deck (Canva),
> the Rasa website, and three reference sites (AiQC, L'Empreinte, Tawjihi).

---

## 1. What INSIGHT is (and what the site must say)

**INSIGHT is the student-led research club of ESTIN (Béjaïa).** Free, open to every student.
Founded with Welcome Day on **4 November 2026**.

- **Vision:** "A crew of ESTIN students who read, question and contribute to science."
- **Four directions:** spark curiosity · open the door to research · sharpen the mind · build bridges
  with researchers, labs and the scientific community.
- **Six activities:** research projects · paper reading · workshops & training · writing & publishing ·
  events & collaborations · guest talks.
- **The heart:** Research Programs (4 poles: AI & Data Science, Cybersecurity, Software & Systems,
  Networks & IoT) + Training (Rookie → Navigator → Scholar → Captain).
- **The goal:** "The One Paper" — every member's first research publication.
- **Proof of seriousness:** Dr. Pin-Yu Chen (IBM Research, IEEE Fellow) joined Welcome Day live and is a
  collaborator of the club.
- **Numbers (honest):** 28 crew members (the deck's 27 plus Redouane Mohamed Islem, VP) · 7 departments · 4 research poles.

### Who the site is for, and what each one needs

| Visitor | What they want | Where they go |
|---|---|---|
| ESTIN student (main audience) | "Can I join with zero experience? What will I learn?" | Home → Training path → Join |
| Member | Workshop schedule, reading list, project calls | Events, Training, Logbook |
| Researcher / lab / guest speaker | "Is this club serious? How do we work with them?" | Research, Collaborate |
| Partner / sponsor / administration | Who runs it, what it has done | About, Crew, Events |

**Rasa sells an atmosphere. INSIGHT has to show credibility.** So: less decoration, more structure,
real names, real dates, real outputs.

---

## 2. Visual direction — "The Observatory"

### What the references have in common
All three use the same language, and it fits a research club:

| Pattern | AiQC | L'Empreinte | Tawjihi |
|---|---|---|---|
| Big, tight sans-serif headlines | Inter | Neue Haas / Inter Tight | Plus Jakarta |
| Small **monospace** labels (`01 · STEP`, `ACHIEVEMENT · JUNE 2026`) | IBM Plex Mono | — | JetBrains Mono |
| **Italic serif** subtitles | — | — | Cormorant Garamond |
| Lots of white space, calm, editorial | ✓ | ✓ | ✓ |
| One signature interactive visual in the hero | particle sphere | illustration | animated compass |
| Light pages broken by deep-navy blocks | — | ✓ | ✓ |
| News as an editorial list (photo + tag + date + title) | ✓ | ✓ | — |

### Two identities to reconcile
- **The logo & banner:** deep navy night, blue→silver gradient, a beam of light leaving the eye, dot grid.
- **The Welcome Day deck:** parchment, ink, red wax seal, compass, map, "Log 01" labels (One Piece theme).

**Decision:** the website is built on the **logo/banner identity** (it's the permanent brand), and
borrows the deck's **structure and voice** — "Log" labels, the voyage map, the compass — redrawn in
the navy/silver style. The parchment look stays for event material (it suits a themed event, not a
lab's front door).

### Concept
**The eye is a lens. The beam is a question going out into the dark.**
Dark navy sections feel like an observatory at night (hero, research, the guest). Light "paper" sections
are where things get read (logbook, training, about). The beam of light from the logo is the one motif
repeated everywhere: hero animation, section dividers, hover glow, the cursor on the voyage map.

### Colour tokens (approximate, sampled by eye from the logo — ask the Design dept for exact values)

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0B1120` | Dark section background (logo background) |
| `ink-2` | `#121A2E` | Cards on dark |
| `navy` | `#1B2A55` | Deep shade of the logo, headings on light |
| `blue` | `#3F66B0` | Primary accent: buttons, links, active states |
| `periwinkle` | `#7F97C7` | Secondary accent, gradients |
| `silver` | `#DDE3EC` | The beam: highlights, glow, gradient end |
| `paper` | `#F5F6F8` | Light section background (cool, not cream) |
| `text-muted` | `#8A94A8` | Body text on dark |
| `signal` | `#C2463A` | Rare: the deck's wax-seal red, used only for "live / new / deadline" |

Signature gradient: `navy → blue → periwinkle → silver` (left to right, like the logo).

### Typography

| Role | Font | Why |
|---|---|---|
| Display / headings | **Space Grotesk** | Already used on the banner ("Where curiosity meets clarity") |
| Body | **Inter** | Clean, readable, used by AiQC |
| Labels, numbers, metadata | **JetBrains Mono** | The "lab notebook" voice: `LOG 03 · RESEARCH`, dates, stats |
| Quotes & subtitles | **Lora Italic** | Matches the banner's italic quote |

### Shape & motion
- Full-width navbar (like AiQC / L'Empreinte): transparent over the hero, solid ink + hairline after scrolling.
- Corners: **"sharp controls, soft containers."** **0** for bars, bands, buttons, tabs, tags, inputs ·
  **16 px** for cards, panels, image frames · **circle** only for avatars, map stops and status dots.
- Buttons (all square, Inter 15 px medium, no glow):
  **Primary** solid blue `#3F66B0` + white text, only for the main action ("Join the crew") ·
  **Secondary** outline, periwinkle `#7F97C7` border + text on dark (blue on light), fills blue on hover;
  used for the navbar's Join, "Explore our research", "Collaborate" · **Text link** blue text + arrow.
  Sizes: 44 px (navbar), 48 px (default), 56 px (big final call to action).
- Scrollbar (like AiQC): 2 px, no track, periwinkle thumb that turns blue on hover; Firefox uses its thin bar.
- Hairline borders (`1px` silver at 10% on dark, navy at 8% on light), no heavy shadows.
- Faint dot-grid background on dark sections (from the banner).
- Motion (built in `design/prototypes/home-v3.html`, no library): hero words rise in on load, then the logo and beam;
  section titles and grids fade up once on scroll (70 ms cascade); stats count up; the voyage route
  draws itself and the ✕ lands last; compass panel cross-fades; FAQ opens/closes smoothly (Rasa's method).
  Only opacity/transform, each plays once, all off with `prefers-reduced-motion`, nothing hidden without JS.
  No parallax, no scroll-jacking, footer stays still.

### Voice
Clear, confident, a little playful. The voyage language stays as **micro-copy only**:
section eyebrows (`LOG 01 · WHO WE ARE`), "The One Paper", "Join the crew", the 404 page
("This island isn't on the map"). No anime references in headlines — a lab director should read the
home page and take it seriously; a student should smile at the details.

---

## 3. Signature moments (what makes it feel pro, not template)

1. **Hero — "The Lens."** The logo eye, large, with an animated beam of particles leaving it
   (canvas, like AiQC's sphere but shaped like our beam). Headline *"Where curiosity meets clarity."*,
   italic line *"somewhere, something incredible is waiting to be known"*, two buttons:
   **Join the crew** · **Explore our research**.
2. **The Log Pose — four poles on a compass.** A compass dial (Tawjihi-style) with the 4 poles on it;
   hovering or tapping a pole turns the needle and shows its leads and topics.
3. **The Voyage — how a research project works.** The 6 steps (question → read → method → explore →
   write → publish) as a dashed route that draws itself while you scroll, ending at **The One Paper**.
4. **From Rookie to Captain.** The 4 training levels as a vertical ladder with what you learn at each.
5. **Crew masthead.** Like a journal's editorial team: one hairline grid, each cell a 4:5 portrait +
   role (mono) + name + one-line duty; on hover a small square `WANTED` stamp appears, the one visible
   nod to the deck.
6. **Numbers band.** `27 crew · 7 departments · 4 poles · 1 guest from IBM Research` counting up.
   Only real numbers, updated as they grow.

---

## 4. Site architecture

Same proven skeleton as Rasa (home, events, board, departments, join, contact, FAQ, PWA, SEO), but
organised around **research** instead of departments.

```
/                     Home
/about                Story, vision, the 4 directions, how the ship is organised
/research             Research Programs, the Voyage, the 4 poles, projects
  /research/ai        AI & Data Science pole          ┐
  /research/security  Cybersecurity pole              │ phase 2 (one template,
  /research/software  Software & Systems pole         │ filled from data)
  /research/networks  Networks & IoT pole             ┘
/training             Rookie → Captain path, workshops, paper-reading sessions, resources
/crew                 The Helm, the 7 departments, pole leads (past crews later)
/events               Upcoming + past events (Welcome Day 2026 with Dr. Pin-Yu Chen first)
/logbook              News, paper summaries, workshop recaps        (phase 2)
/publications         "The One Paper" — members' papers & preprints (phase 3, when one exists)
/collaborate          For researchers, labs, speakers, sponsors, other clubs
/join                 Membership: how it works, pick a pole, Google Form  (+ closed state)
/contact              Form → club inbox (serverless function, like Rasa)
404                   "This island isn't on the map"
```

### Home page, section by section

| # | Section | Content (from the deck) | Reference |
|---|---|---|---|
| 1 | Hero — The Lens | Logo beam animation, tagline, 2 CTAs | AiQC hero |
| 2 | What is INSIGHT | 3 short pillars: student-led · why we exist · free & open | Tawjihi cards |
| 3 | Numbers band | 27 · 7 · 4 · IBM guest | AiQC stats |
| 4 | Vision — the 4 directions | Quote + 4 items | deck slide 3 |
| 5 | What we do | 6 activities as a numbered grid `01–06` | Tawjihi tools |
| 6 | The Log Pose | Interactive compass with the 4 poles | Tawjihi compass |
| 7 | The Voyage | 6-step research route → The One Paper | deck slide 16 |
| 8 | Research network | Partner lab (featured band) + grid of the 7 researchers (Dr. Pin-Yu Chen + 6) + "Are you a researcher?" cell | Empreinte dark block |
| 9 | Latest from the Logbook / next event | Editorial list: photo · tag · date · title | AiQC news |
| 10 | Collaborate strip | "Are you a researcher or a lab? Let's work together." | AiQC footer CTA |
| 11 | FAQ | "Do I need experience?" "Is it free?" "Which year can join?" … | Rasa FAQ |
| 12 | Join CTA + footer | Instagram @insight.estin, email, ESTIN link | — |

### Navigation
- Desktop: floating pill navbar — **About · Research · Training · Crew · Events** + a **Join** button.
- Phone: Rasa's bottom tab bar (Home · Research · Events · Crew · Join) — it already works well.

---

## 5. Technical approach

### Recommended: Astro + Tailwind, deployed on Vercel
Rasa proves the static approach works (fast, free hosting, great SEO). For INSIGHT I'd keep that idea
but use **Astro** instead of hand-written HTML, because this site is content-heavy and will grow:

- **Components:** the navbar, footer and crew card are written once (Rasa copies them across 13 pages).
- **Content as files:** events, crew, poles, logbook posts and publications live in simple
  Markdown/JSON files. Adding a workshop recap = adding one `.md` file. No build-script markers to
  break.
- **Still static HTML out:** same speed and SEO as Rasa, zero JavaScript by default; JS only for the
  hero beam, compass and voyage map.
- Same Vercel deploy, same `/api/contact` function, same PWA, `sitemap.xml`, `robots.txt`, `llms.txt`,
  JSON-LD (`Organization`, `Event`, `Person`, `ScholarlyArticle` for publications).

*Alternative:* copy Rasa's exact stack (static HTML + Tailwind + `build.mjs`). Faster to start since the
team knows it, but harder to maintain once the logbook and publications grow.

### Project structure (Astro)
```
src/
  pages/            index, about, research/, training, crew, events, logbook/, join, collaborate, contact, 404
  components/       Nav, Footer, Hero, Compass, Voyage, CrewCard, EventCard, Stat, FAQ …
  content/
    events/         one .md per event
    logbook/        one .md per post
    publications/   one .md per paper
  data/             crew.json, poles.json, departments.json, faq.json
  styles/           tokens.css (colours, fonts)
public/             logo.svg, icons, images (WebP), og images
api/contact.js      contact form → email
```

### Languages
English first (the deck and the research world are in English). French can be added later with
Astro's i18n routing if the club wants it.

---

## 6. Build phases

| Phase | Scope |
|---|---|
| **1 — Launch** | Design tokens, Nav/Footer, Home (all 12 sections), About, Research (with 4 poles on one page), Training, Crew, Events (Welcome Day), Join, Contact, 404, SEO basics, mobile |
| **2 — Grow** | Individual pole pages, Logbook, Collaborate page, PWA, OG images, `llms.txt`, past events gallery |
| **3 — Prove** | Publications ("The One Paper"), project pages, past crews, French version |

---

## 7. What we need from the club before building

1. **Logo as SVG** (only PNG/JPG now) — needed for a sharp hero and the beam animation.
2. **Exact brand colours and fonts** from the Design department (to confirm the table above).
3. **Crew photos** — the deck uses initials; real photos make the Crew page credible.
4. ~~Contact details~~ Confirmed: email **insight@estin.dz**, Instagram
   **https://www.instagram.com/insight.estin/**. Still open: LinkedIn, if the club makes one.
5. **Domain:** e.g. `insight.estin.dz` (like `empreinte.estin.dz`) or a Vercel subdomain to start.
6. **Welcome Day photos** + a recap paragraph, and permission to feature Dr. Pin-Yu Chen on the site.
6b. **Research network:** for each of the 7 researchers: name, title, institution, country, 2 fields,
   profile link (Google Scholar / lab page), official photo, and **their OK to be listed**. For the partner
   lab: name, institution, country, logo, website, one line on the collaboration, and its OK.
7. **Join form link** (Google Form) and whether registrations are open now.
8. **Upcoming events / workshops** for the next months.
9. ~~Confirm the vice-president(s)~~ Confirmed: two vice-presidents, **Madaoui Sara** and
   **Redouane Mohamed Islem** (the Helm has 6 people). Still to check: the spelling "Madoui Roufaida" vs
   "Madaoui", and whether the "27 crew members" count includes everyone.
