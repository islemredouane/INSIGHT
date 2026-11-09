# Review — "INSIGHT Research Club — Full Home Experience" (Stitch)

> Reviewed 9 Nov 2026: rendered at 1440 px in a browser, all 14 sections, plus the text and code.
> Also checked: the About page and the style guide in the same Stitch project.

## Verdict

**The design is strong.** The colours, fonts, dark/light rhythm, compass, monospace eyebrows and the
navbar are exactly the direction in the plan. Keep it.

What stops it from feeling "pro" is mostly **the words**, not the look. Stitch invented facts, numbers
and sci-fi decoration text. A visitor who knows the club (or a researcher like Dr. Chen) would spot it
straight away. After that come the brand (the real logo isn't used) and a few layout fixes.

Priority: **1. Honest content → 2. Real brand → 3. Layout → 4. Readability → 5. Missing pieces**

---

## 1. Content: remove invented facts (critical)

These are not true, or not known. They must go before anyone sees the site.

| Where | Invented text | Fix |
|---|---|---|
| Logbook row 1 | "Over 120 ESTIN students joined us in **Amphi C**" | Use the real attendance and room, or drop them |
| Logbook row 2 | "Paper Reading 101: Dissecting arXiv at 2 A.M." · 18 Nov 2026 | Fake event. Replace with a real upcoming session or remove |
| Logbook row 3 | "Algorithmic Robustness in High-Performance Vision Models" · 02 Dec 2026 | Fake project. Remove |
| Poles panel | Leads labelled "Lead / Co-lead / Research Coordinator" | The deck lists all three as **pole leads**. Use "Pole lead" for each |
| Poles panel | "POLE 01 // AUTONOMOUS SYSTEMS & COGNITION", description, topic tags | Ask each pole's leads for their real one-line description and 3 topics |
| FAQ | "…to writing **peer-reviewed papers**" | Overpromise. Say "…from your first paper reading to your first research project." |
| FAQ | "3 to 6 hours per week… weekend paper seminars" | Invented. Ask the board for the real answer |
| FAQ | "CP1, CP2… CS3" | Confirm the year names ESTIN actually uses |
| Vision | "— OBSERVATORY CHARTER // ARTICLE I" | There is no charter. Remove the attribution |
| Final CTA | "Read the Charter →" button | Links to nothing. Change to "Explore our research →" |
| Footer / Collaborate | `ref@insight-estin.dz` | Fake email. Use the club's real email |
| Footer | Instagram links to instagram.com | Link to instagram.com/insight.estin |

**Also invented on the other screens:**
- **About:** "The Spark, Oct 2026, study room 12" · "Amphi C & Lab 04" · "Mission code E-OBS-26" ·
  "Founding manifesto" quote · "IEEE/ACM venues". The keynote with Dr. Chen is dated **Dec 2026**, but
  it happened at Welcome Day, **4 Nov 2026**.
- **Style guide:** "48+ active researchers", "12.4k citations", "99.4% accuracy", "Dr. Amine Mansouri",
  "Quantum Machine Learning seminar". It also attributes the banner quote to Carl Sagan. That
  attribution is disputed, so keep the quote unattributed, as on the banner.

**Rule for every future prompt:** *"Use only facts I give you. If something is unknown, use an obvious
placeholder like [ATTENDEES] instead of inventing it."*

---

## 2. Remove fake "telemetry" decoration

Stitch filled the page with lab-sounding labels that mean nothing. They make it look like a sci-fi
template instead of a real club.

**Delete:**
- Hero: `OBSERVATORY LATITUDE 36.6575° N…`, `CYCLE PROTOCOL ALPHA-COLLIDER // ACTIVE`,
  `SYS_OPTICS: LENS-REFRACTOR`, `SPECTRAL DISPERSION · 420–700nm`
- Card footers: `ZERO HIERARCHY BARRIER`, `EXPLORATION`, `DISCOVERY`, `RIGOR`, `DEPARTURE`, `MANUSCRIPT`…
- `VESSEL 01`, `PEER-VERIFIED`, `ROUTE PROTOCOL // CARTOGRAPHY 2026`, `DESTINATION MARKER // X`,
  `SESSION RECORDED // NOV 2026`, `KEYNOTE ARCHIVE`
- Footer: `OBSERVATORY NODE OPERATIONAL`, `INDEX: V2.4.0`, the coordinates
- Navbar: `// ESTIN LAB`. INSIGHT is a **club**, not a lab; "lab" claims something it isn't. Use
  `ESTIN Research Club`.

**Keep:** the `LOG 0X · SECTION` eyebrows and real metadata (dates, event types, pole numbers).
**Rule:** a monospace label must carry real information.

---

## 3. Brand

| Issue | Fix |
|---|---|
| **The real logo isn't used anywhere.** Navbar, footer and hero all show a generic "eye" icon (a stock icon) | Use the real INSIGHT logo. Export it as **SVG** from the Design dept |
| **The hero visual is boxed** in a small card, like a dashboard widget, with the eye small on the left | Remove the box. Put the real logo large on the right, with the beam bleeding off the right edge of the screen, like the banner |
| The beam has only 180 particles and looks thin | Denser, longer beam that fades into the dark |
| Two serif fonts mixed (Noto Serif for quotes, Lora in the final CTA) | Pick one (Lora, closest to the banner) |
| A green status dot on the guest card (`emerald-400`) | Off-palette. Remove it |
| Hero headline is 60 px | Make it 72–80 px. The hero has room, and it's the first impression |

---

## 4. Layout

1. **Navbar links are section anchors** (About, Research, Voyage, Guests, Logbook, FAQ). The site
   will have pages: **About · Research · Training · Crew · Events** + **Join the crew**.
2. **Three similar sections in a row.** Who we are (I–III), Vision (I–IV) and What we do (01–06) are all
   "numbered items on light background". Merge **Who we are + Vision** into one section: headline,
   big vision quote, the 4 directions. That's one fewer section and a better rhythm.
3. **The voyage is 6 small boxes**, and the dashed route behind them is barely visible. It's the
   signature moment of the page. Make the route the hero of the section: a bold dashed line with
   numbered stops on it, short labels next to each stop, ending on "The One Paper". No cards.
4. **"The One Paper" banner** has a pinkish red tint. Keep red for the ✕ mark only, on a white/navy
   card.
5. **Guest section:** an empty person icon instead of a photo. Use a real photo (with Dr. Chen's
   permission). Also change the title "Distinguished Researchers in Our Orbit" to "Our guests" or
   "Guest talks".
6. **Logbook thumbnails** are grey boxes with icons. Use real event photos. Until there are posts,
   replace the section with **"Next on the map"**: the next real event + the Welcome Day recap.
7. **Compass:** good. The four tabs and the needle should actually switch the panel. That will be done
   in the build; Stitch only shows one state.
8. **Missing trust signals:** no faces of the crew, no ESTIN logo. Add a small **"Meet the crew"**
   strip (5 Helm photos + link) before the FAQ, and an ESTIN mark in the footer.

---

## 5. Readability & accessibility

- **Too much tiny text.** Many labels are 9–11 px monospace, some at 60–80% opacity
  (`text-[10px] text-text-body-light/60`). They're hard to read and fail contrast rules. Minimum:
  12 px for labels, full-opacity muted colour.
- **Nav links and all buttons are 12 px uppercase monospace.** Fine for eyebrows, tiring for actions.
  Use **Inter 14–15 px, medium weight** for nav links and button text. Keep mono for labels only.
- **Small body text in the voyage cards** (`text-xs`, 12 px). Body text should be ≥ 15 px.
- Icons are a web font (Material Symbols). If the font fails to load, words like "biotech" and
  "menu_book" appear on the page. The build will use SVG icons instead.

---

## 6. Consistency across the project

- There are **7 versions** of the home and About pages in the project (Home, Home Extended, Full Home
  ×2, About ×2…). Stitch mixes them when you edit. **Keep one per page, delete the rest** (Full Home
  Experience + About Synchronized).
- The About page uses shadows instead of hairline borders, and a different nav style for the active
  link. Align it with the home page.
- The style guide's logo image is broken (it shows the filename `INSIGHT_Logo_Dark.jpg`).

---

## 7. Still to design

Research · Training · Crew · Events (+ event detail) · Join (open + closed) · Collaborate · 404 ·
and **phone versions** (none exist yet). Prompts are ready in [STITCH_PROMPTS.md](STITCH_PROMPTS.md).

---

## Fix prompts for Stitch (one at a time, on the Full Home Experience)

**Fix 1 — facts and decoration**
```text
Remove all invented facts and decorative telemetry text. Delete: the coordinates, "CYCLE PROTOCOL",
"SYS_OPTICS", "SPECTRAL DISPERSION", "VESSEL 01", "PEER-VERIFIED", "ROUTE PROTOCOL", "DESTINATION
MARKER", "KEYNOTE ARCHIVE", "SESSION RECORDED", "OBSERVATORY NODE OPERATIONAL", "INDEX: V2.4.0",
"OBSERVATORY CHARTER // ARTICLE I", and the small uppercase tags at the bottom of every card. Replace
"// ESTIN LAB" with "ESTIN Research Club". Keep the "LOG 0X ·" eyebrows. Use only facts I give you;
if something is unknown, write a placeholder in brackets like [ATTENDEES] instead of inventing it.
```

**Fix 2 — logbook**
```text
In "From the logbook", keep only one row: "Welcome Day 2026: INSIGHT sets sail", EVENT · 4 NOV 2026,
text: "The official start of INSIGHT, with our four research poles and a live talk by Dr. Pin-Yu Chen
from IBM Research." Rename the section "Next on the map" and add one card for the next event with
placeholders [EVENT TITLE], [DATE], [ROOM]. Use photo placeholders, not icons.
```

**Fix 3 — hero and logo**
```text
Use the attached INSIGHT logo instead of the generic eye icon in the navbar, the hero and the footer.
In the hero, remove the boxed canvas card: place the logo large on the right half, with a dense beam
of silver particles streaming out of it and bleeding off the right edge of the screen, fading into the
dark, like the attached banner. Make the headline 76px.
```
*(attach `logo.png` and `banner.png`)*

**Fix 4 — navigation and buttons**
```text
Change the navbar links to pages: About, Research, Training, Crew, Events, plus the "Join the crew"
button. Use Inter 15px medium for nav links and all button labels (sentence case, not uppercase
monospace). Keep monospace only for small labels and eyebrows. No text smaller than 12px anywhere,
and no label below full opacity.
```

**Fix 5 — merge sections**
```text
Merge "Who we are" and "Our vision" into one section on paper background: eyebrow "LOG 01 · WHO WE
ARE", headline "A student-led research community at ESTIN.", a short line "Run by students, free and
open to everyone. No experience required, only curiosity.", then the large serif italic vision quote,
then the four directions in one row. Renumber the following sections' LOG labels.
```

**Fix 6 — the voyage**
```text
Redesign "Every research project is a voyage": remove the six cards. Draw one bold dashed navy route
curving across the section with six numbered circular stops on it; next to each stop, the step name
in Space Grotesk and one short line in Inter 15px. The route ends on a large ✕ marker labelled
"The One Paper — Your first research publication. It's real, and it's waiting for you." Use red only
for the ✕, no pink background.
```
*(attach `../design/references/deck-page-05-voyage-ahead.png`)*

**Fix 7 — guest, trust, footer**
```text
Rename "Distinguished Researchers in Our Orbit" to "Guest talks". Replace the person icon with a
portrait photo placeholder and remove the green dot. Before the FAQ add a "Meet the crew" strip: six
round photo placeholders with names and roles (Faci Souhaib Abdelouakil — President, Madaoui Sara —
Vice-president, Redouane Mohamed Islem — Vice-president, Feltane Anayis — Secretary general, Madoui Roufaida — Secretary general, Ghasmoune
Mohammed — Treasurer) and a link "Meet the full crew →". In the footer add an ESTIN logo placeholder,
use [CLUB EMAIL] for the email, and link Instagram to instagram.com/insight.estin.
```

**Fix 8 — FAQ answers**
```text
Replace the FAQ answers with: "Do I need research experience?" → "No. We start from paper reading and
guide you step by step to your first research project." · "Is membership free?" → "Yes, free and open
to all ESTIN students." · "Which year can join?" → "[ANSWER FROM THE BOARD]" · "How do I pick a
research pole?" → "Explore the four poles during your first weeks, then join the one that excites you
most." · "How much time does it take?" → "[ANSWER FROM THE BOARD]". Change the final CTA's second
button to "Explore our research →". Use Lora for every serif italic text.
```

---

## What we need from the club to finish the content

1. Real Welcome Day numbers (attendees, room) and photos
2. Dr. Chen's permission + an official photo
3. Each pole's one-line description and 3 topics (from its leads)
4. Answers: which years can join, expected time per week
5. Club email, the logo as SVG, Helm photos
6. The next real event (title, date, room)
