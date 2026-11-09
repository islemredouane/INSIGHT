# Content to add — by team

Everything the site still needs before launch, who owns it, and the exact file to edit.
On the review version (`PUBLIC_REVIEW_MODE=true`), every missing item shows as **[text in brackets]**.
In the real build, unfinished items are hidden automatically, so nothing fake goes live.

> Rule for people: only publish a name, photo or bio after the person agrees.

---

## Helm (board)

| What | Where | Notes |
|---|---|---|
| Answer "Which year can join?" | `src/content/faq.yaml` | Replace `[Answer from the board]`. |
| Answer "How much time does it take?" | `src/content/faq.yaml` | Same. One or two honest sentences. |
| Confirm the reply time we promise | `src/data/contact.ts` → `replyTime` | Currently "3 working days", shown on the Contact page. |
| Contact form key (Web3Forms) | `src/data/contact.ts` → `web3formsKey` | Create it free at web3forms.com with insight@estin.dz. Until then the form opens the visitor's email app. |
| Domain `insight.estin.dz` | ESTIN IT + Vercel | Ask ESTIN IT for a CNAME to Vercel. The site's URL is set in `astro.config.mjs` → `site`. |

## Human Resources

| What | Where | Notes |
|---|---|---|
| Registrations: open or not, and the form link | `src/data/site.ts` → `registrations` | Set `open: true` and `applyUrl` (Google Form). The Join page and buttons switch automatically. |
| Crew photos (28 people) | `public/crew/` + `photo:` in `src/content/crew.yaml` | Square-ish portraits, at least 600 px wide. Example: file `public/crew/faci.jpg` → `photo: /crew/faci.jpg`. |
| Check every name spelling | `src/content/crew.yaml` | e.g. "Madoui" vs "Madaoui". |
| Crew count | `src/data/club.ts` → `stats` | Now 28. Update when members join. |

## External Relations & Partnerships

| What | Where | Notes |
|---|---|---|
| The 6 other researchers | `src/content/researchers.yaml` | For each: name, initials, title, institution, country, up to 3 fields, short bio, profile link, photo. Remove `placeholder: true` when done. |
| The partner laboratory | `src/content/partners.yaml` | Name, institution, country, one-line summary of what we do together, website, logo (`public/partners/`). Remove `placeholder: true`. |
| Dr. Pin-Yu Chen's official photo | `photo:` in `src/content/researchers.yaml` | Only with his permission. Without it, his initials card stays. |

## Research Programs (Head of Research + pole leads)

| What | Where | Notes |
|---|---|---|
| Validate each pole's description and 3 topics | `src/content/poles.yaml` | Written as a first draft. Rewrite freely, then set `draft: false`. |
| Reading list per pole (5–10 papers) | `src/content/poles.yaml` → `readingList` | Each paper: `title`, `authors`, `year`, `url`. Appears on the pole page. |
| Current projects | (later) | The Research page says "Our first projects are being formed" until teams exist. Tell the dev team when the first projects are ready. |

## Training

| What | Where | Notes |
|---|---|---|
| Training calendar | `src/content/events/` | Each session is one event file (see "Add an event" below) with `type: workshop`, `paper-reading` or `training`. They appear on Training, Events and the pole pages. |

## Events & Logistics

| What | Where | Notes |
|---|---|---|
| Welcome Day room | `src/content/events/welcome-day-2026.md` → `location` | e.g. "Amphitheatre A, ESTIN, Amizour". |
| Welcome Day attendance (real number) | same file → `attendance` | Only a real count. |
| Next events | `src/content/events/` | One file per event. The home page shows the next one automatically. |

## Communication & Media

| What | Where | Notes |
|---|---|---|
| Welcome Day photos | `public/events/welcome-day-2026/` + `cover:` and `gallery:` in the event file | Landscape, at least 1600 px wide for the cover. |
| Welcome Day recap text | body of `src/content/events/welcome-day-2026.md` | A few paragraphs: what happened, highlights. |
| Link-preview image (1200 × 630) | `public/og.png` | What WhatsApp/LinkedIn show when the site is shared. Tell the dev team when it exists (one line in `BaseLayout.astro`). |

## Design (optional)

| What | Where | Notes |
|---|---|---|
| Logo as SVG | `public/brand/` | Sharper than the PNG on big screens. |

---

## Add an event

Create `src/content/events/<short-name>.md`:

```md
---
title: "Paper reading #1: Attention Is All You Need"
date: 2026-11-20
type: paper-reading        # event | talk | workshop | paper-reading | training | social
location: Room 12, ESTIN, Amizour
summary: One sentence that says what it is and who it's for.
poles: [ai]                # optional: ai | security | software | networks
speakers: []               # optional: researcher ids from researchers.yaml
registrationUrl: ""        # optional
---

Optional longer text (shown on the event page; after the event, write the recap here).
```

If a required field is missing or a date is wrong, the build fails with a clear message, so a broken page never goes live.
