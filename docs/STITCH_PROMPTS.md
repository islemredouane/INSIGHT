# INSIGHT × Google Stitch — Design System & MVP Prompts

Use this file with [Google Stitch](https://stitch.withgoogle.com) to design the INSIGHT website before
building it in Astro + Tailwind. Every prompt is ready to copy and paste. Full background is in
[PLAN.md](PLAN.md).

---

## How to use it

1. **New project → choose "Web"** (desktop first). Do the phone versions at the end (Prompt 12).
2. **Attach the images listed in "What to attach" below** with each prompt.
3. **Paste Prompt 0 first.** It sets the design system. Check the result against the checklist under it
   before going on.
4. **Then one screen per prompt** (Prompts 1–11). Long pages are split into parts because Stitch
   squeezes long pages. Generate each part, then ask Stitch to join them if you want one full frame.
5. **Fix one thing at a time.** Small edit prompts work much better than rewriting the whole screen
   (see "Refinement prompts" at the end).
6. **Theme panel:** if Stitch shows theme controls, set them by hand too: primary `#3F66B0`,
   font Space Grotesk / Inter, roundness medium (12–16 px), dark mode on.
7. **Export** to Figma or as HTML/Tailwind when the screens are approved. That export is the starting
   point for the Astro build.

---

## What to attach

Stitch reads images better than words. Attach the right images **with the prompt they belong to**, and
add one line of text saying what each image is for. Otherwise Stitch may copy the wrong thing (for
example, the parchment look from the slides).

### Screenshots to take first
Take these yourself (Windows: `Win + Shift + S`), at full browser width:

| # | Screenshot | Where |
|---|---|---|
| A | Hero with the particle sphere | aiqcommunity.org, top of page |
| B | Stats block (4 / 20+ / 5 / 10 / 7) | aiqcommunity.org, scroll once |
| C | News list (photo + tag + date + title) | aiqcommunity.org, further down |
| D | Dark "Latest issue" block | empreinte.estin.dz, scroll down |
| E | Compass hero | tawjihi-bacstory.vercel.app/tawjihi, top |
| F | Three tool cards | tawjihi, scroll once |

### With Prompt 0 (design system): 5 images

| Attach | Add this line to the prompt |
|---|---|
| `INSIGHT_Logo_Dark.jpg` (this folder) | "Image 1 is our official logo on its dark background." |
| `banner.png` (this folder) | "Image 2 is our banner: copy its mood, colours, dot grid, light beam and fonts." |
| Screenshot A | "Image 3: reference for calm, spacious, scientific layout." |
| Screenshot D | "Image 4: reference for dark sections: big white headline, clean buttons." |
| Screenshot F | "Image 5: reference for cards: white, thin border, mono labels." |

End Prompt 0 with:
`Use the references for layout, spacing and typography only. Use our colours from the banner, not
their colours.`

### With the screen prompts

| Prompt | Attach | Add this line |
|---|---|---|
| 1 (hero, numbers) | `logo.png` + screenshots A and B | "Image 1 is the logo symbol: use it in the navbar and as the eye in the hero. Image 2 is a reference for the hero visual, image 3 for the numbers band." |
| 3 (logbook list) | Screenshot C | "Reference for the logbook list layout." |
| 2 (compass / poles) | Screenshot E + deck page 36 "Four ships, one fleet" (the 4 poles as ships) | "Use the compass idea from image 1 and the content of image 2. Ignore the parchment style." |
| 3 (voyage) | Deck page 5 "The voyage ahead" (the island map) | "Redraw this route in our navy/silver style. Ignore the parchment style." |
| 4 (About, org chart) | Deck page 8 "How our ship is organized" (the org chart) | "Same structure, our design system. Ignore the parchment style." |
| 6 (Training ladder) | Deck page 31 "From rookie to captain" (all 4 levels) | "Same content, our design system." |
| 7 (Crew) | Deck page 13 "The Helm" (all 5 WANTED cards) | "Only the WANTED stamp idea, as a small hover detail." |
| 8 (Events) | Welcome Day photos, when you have them | "Use these as the event photos." |
| 7 (Crew), later | Real crew photos, when you have them | "Replace the initials placeholders with these photos." |

To get slide images: in Canva open the deck → **Share → Download → PNG → select pages** 5, 8, 13, 31, 36. These are Canva's page numbers, not the
small number printed on each slide (the deck repeats slides for its animations, so the two differ).

### Don't attach
- **The full Canva deck or many parchment slides at once**: Stitch will copy the old-paper look.
- **Rasa screenshots**: orange/black would pull the design away from INSIGHT's navy.
- **More than ~5 images per prompt**: results get mixed up. Split across prompts instead.

---

> Stitch may not have Lora or JetBrains Mono. If they're missing, use the closest serif italic
> (e.g. Newsreader, EB Garamond) and the closest mono (e.g. IBM Plex Mono, Space Mono). Note what you
> picked so the build uses the same fonts.

---

## Prompt 0 — Design system

```text
Create a design system / style guide page for "INSIGHT Research Club", the student-led research club of
ESTIN (a computer-science engineering school in Béjaïa, Algeria). The attached logo is an eye whose iris
is a "Q"/magnifier, with a beam of light rays leaving it. Tagline: "Where curiosity meets clarity."

Concept: "The Observatory". The eye is a lens; the beam is a question going out into the dark.
Dark navy sections feel like an observatory at night. Light "paper" sections are for reading.
Mood: credible, calm, precise, editorial, modern research lab — not a gaming or crypto look, no neon,
no purple gradients, no glassmorphism overload, no stock 3D blobs.

Colours:
- ink #0B1120 (dark background), ink-2 #121A2E (cards on dark)
- navy #1B2A55 (headings on light), blue #3F66B0 (primary: buttons, links, active)
- periwinkle #7F97C7 (secondary), silver #DDE3EC (beam highlights, glow)
- paper #F5F6F8 (light background), white #FFFFFF (cards on light)
- muted text on dark #8A94A8, body text on light #3A4458
- signal red #C2463A used very rarely, only for "Live", "New" or "Deadline" badges
- Signature gradient left to right: navy → blue → periwinkle → silver (same as the logo)

Typography:
- Display / headings: Space Grotesk, bold, tight letter-spacing (-2%), large sizes (hero 72–88px)
- Body: Inter 16–18px, line height 1.6
- Labels and metadata: monospace (JetBrains Mono), 12px, uppercase, wide tracking,
  written like a lab log: "LOG 01 · WHO WE ARE", "WORKSHOP · 12 NOV 2026", "01 · SET SAIL"
- Quotes and subtitles: serif italic (Lora Italic)

Shapes and details:
- Corners: sharp controls, soft containers. 0 radius for bars, buttons, tabs, tags and inputs; 16px for cards;
  circles only for avatars and status dots. Buttons: primary = solid blue #3F66B0, square; secondary =
  square outline in periwinkle #7F97C7 (blue on light backgrounds) that fills blue on hover. No glow, no pills.
- Hairline borders: 1px silver at 10% opacity on dark, navy at 8% on light; almost no shadows
- Faint dot-grid pattern on dark sections; a soft silver light-beam glow as the recurring motif
- Generous white space, 12-column grid, max content width 1200px

Show on the page: the colour swatches with names and hex codes, the type scale (H1–H4, body, label,
quote), buttons (primary solid blue button, secondary periwinkle outline button, square corners, text link with arrow, on light and on dark),
a mono eyebrow label above a heading, a stat block (big number + mono label), a numbered feature card
("01 · Research projects"), an event card (image, mono tag + date, title), a person card (square photo,
name, role in mono), a tag/badge set (pole names: AI & Data Science, Cybersecurity, Software & Systems,
Networks & IoT), form inputs, and the full-width navbar.
```

**Check before moving on:** navy + silver look (not purple/neon) · mono labels visible · serif italic
quote visible · square buttons · hairline borders · both a dark and a light surface shown.
If something's wrong, fix it now with a small edit prompt. Every later screen copies this page.

---

## Prompt 1 — Home, part 1 (hero → numbers)

```text
Using the INSIGHT design system above, design the top of the desktop home page.

1. Full-width navbar: transparent over the hero, solid ink with a hairline bottom border after scrolling, content aligned to the page grid:
   logo on the left (eye icon + "INSIGHT"), links "About, Research, Training, Crew, Events",
   and a blue button "Join the crew" on the right.

2. Hero, full viewport height, dark ink background with a faint dot grid. On the right half, a large
   version of the logo's eye with a beam of thousands of small silver particles streaming out of it to
   the right, fading into the dark (like a scientific particle visualisation). On the left:
   - mono eyebrow "ESTIN RESEARCH CLUB · EST. 2026"
   - headline in Space Grotesk "Where curiosity meets clarity."
   - serif italic line "somewhere, something incredible is waiting to be known"
   - two buttons: blue button "Join the crew", outline button "Explore our research →"
   - at the bottom, a small mono "SCROLL TO EXPLORE" with a thin line

3. "What is INSIGHT?" section on the light paper background. Mono eyebrow "LOG 01 · WHO WE ARE".
   Headline "A student-led research community at ESTIN." Three columns separated by hairlines, each
   with a Roman numeral in mono:
   I Student-led: run by students, free and open to everyone.
   II Why we exist: to give students a place to discover research together.
   III Curiosity first: no experience required, only curiosity.

4. Numbers band, white background, large Space Grotesk numbers with mono labels, divided by hairlines:
   "27 CREW MEMBERS", "7 DEPARTMENTS", "4 RESEARCH POLES", "1 GUEST FROM IBM RESEARCH".
   On the right of the numbers, a short statement: "27 students. 4 research poles. One question at a time."
```

## Prompt 2 — Home, part 2 (vision → poles)

```text
Continue the INSIGHT home page with the same design system.

5. Vision section, light paper background. Eyebrow "LOG 02 · OUR VISION". A large serif italic quote
   centred: "A crew of ESTIN students who read, question and contribute to science."
   Below, four items in a 4-column row, each with a mono numeral and a hairline on top:
   I Spark curiosity — make asking questions a habit.
   II Open the door to research — introduce students to academic research.
   III Sharpen the mind — develop research and critical-thinking skills.
   IV Build bridges — connect students with researchers, labs and the scientific community.

6. "What we do" section, white background. Eyebrow "LOG 03 · WHAT WE DO", headline "Six ways in."
   A 3×2 grid of clean cards with a mono number, a thin line icon, title and one line:
   01 Research projects — teams explore real research questions.
   02 Paper reading — we read scientific papers, the records of discovery.
   03 Workshops & training — hands-on technical sessions.
   04 Writing & publishing — academic writing, from first draft to paper.
   05 Events & collaborations — research events with other clubs and labs.
   06 Guest talks — meet researchers and ask them anything.
   Small serif italic note under the grid: "Side effects may include reading papers at 2 a.m."

7. "The Log Pose" section, dark ink background with dot grid. Eyebrow "LOG 04 · RESEARCH POLES",
   headline "Four poles. One fleet." On the left, a large, elegant navigational compass drawn in thin
   silver lines, with the four poles placed around the dial and the needle pointing at "AI & Data
   Science" (highlighted in blue). On the right, a detail panel for the selected pole: pole name, a
   short description, three topic tags (e.g. Machine learning, Trustworthy AI, Data analysis), and
   "POLE LEADS" in mono with three names: Ouattara Majide Rafiou, Ghedjati Maroua, Kaouche Malek.
   Below the compass, four small tabs to switch pole: AI & Data Science, Cybersecurity,
   Software & Systems, Networks & IoT.
```

## Prompt 3 — Home, part 3 (voyage → footer)

```text
Continue the INSIGHT home page with the same design system.

8. "The Voyage" section, light paper background. Eyebrow "LOG 05 · HOW RESEARCH WORKS", headline
   "Every research project is a voyage." A horizontal route drawn as a dashed navy line that curves
   gently across the page, with six numbered stops (small circles with mono numbers):
   01 Set sail — start with a question
   02 Read the records — study what is known
   03 Plot the course — choose a method
   04 Explore — run the experiments
   05 Write the log — write the paper
   06 Bring the treasure — share and publish
   The route ends on a highlighted marker labelled "The One Paper" with the line
   "Your first research publication. It's real, and it's waiting for you."

9. Featured guest, dark ink section. Eyebrow "LOG 06 · OUR GUESTS". Left: a portrait placeholder of
   Dr. Pin-Yu Chen with a silver glow edge. Right: name in Space Grotesk, mono role
   "PRINCIPAL RESEARCH SCIENTIST · IBM RESEARCH", three credential tags (IEEE Fellow,
   IJCAI Computers & Thought Award 2023, IBM Master Inventor), a short paragraph: "Joined our Welcome Day
   live from New York to share his research on trustworthy AI, adversarial robustness and LLM safety.",
   and a link "Read the Welcome Day recap →".

10. "From the logbook" section, white background, editorial list like a journal: three rows, each with a
    landscape photo on the left, a mono tag + date ("EVENT · 4 NOV 2026"), a headline, a two-line
    excerpt and "Read more →". First row: "Welcome Day 2026: INSIGHT sets sail".

11. Collaborate strip on navy: "Are you a researcher, a lab or a club? Let's work together." with an
    outline button "Collaborate with us →".

12. FAQ on paper background, accordion with hairline separators: "Do I need research experience?",
    "Is membership free?", "Which year can join?", "How do I pick a research pole?",
    "How much time does it take?".

13. Final call to action, dark section with the light-beam glow: headline "Every great discovery begins
    with a question.", serif italic "Set sail. Explore the unknown.", blue button "Join the crew".

14. Footer on ink: logo, one-line description, columns (Club: About, Crew, Events · Research: Poles,
    Training, Publications · Connect: Instagram @insight.estin, Email, ESTIN website), and a bottom line
    "© 2026 INSIGHT Research Club · ESTIN, Béjaïa".
```

---

## Prompt 4 — About

```text
Design the INSIGHT "About" page (desktop) with the same design system, navbar and footer.

- Page header on dark ink with dot grid: eyebrow "ABOUT", headline "We read, question and contribute
  to science.", serif italic subtitle "Founded at ESTIN in 2026 by students who wanted a place to
  discover research together."
- "Our story" on paper: two columns, a short story paragraph on the left and a timeline on the right
  with mono dates (e.g. "4 NOV 2026 · Welcome Day: the club sets sail").
- "Our four directions": the same four vision items as on the home page, as larger cards.
- "How the ship is organised": a clean organisation chart in hairline boxes. Top box "The Helm"
  (President · Vice-president · Secretaries general · Treasurer). Below it seven department boxes:
  Communication & Media, Design, Events & Logistics, External Relations, Human Resources,
  Research Programs, Training. Research Programs and Training are highlighted in blue with a mono label
  "THE HEART". Under Research Programs, four dashed boxes: AI & Data Science, Cybersecurity,
  Software & Systems, Networks & IoT.
- Numbers band (27 · 7 · 4) and a "Meet the crew →" link.
```

## Prompt 5 — Research

```text
Design the INSIGHT "Research" page (desktop) with the same design system, navbar and footer.

- Dark header: eyebrow "RESEARCH PROGRAMS", headline "Where questions become discoveries.",
  a small person chip "Led by Allaoua Ait Abdelghani · Head of Research".
- "The mission" on paper: four numbered items — develop research projects in the four poles; form and
  guide project teams; take projects from a question to a paper; connect members with researchers.
- The four poles as four large cards in a 2×2 grid, each with a mono number, pole name, description,
  topic tags, and "POLE LEADS" with names:
  01 AI & Data Science — Ouattara Majide Rafiou, Ghedjati Maroua, Kaouche Malek
  02 Cybersecurity — Belaloui Taha Abderrahmane, Laghrour Mohamed Dhia Eddine
  03 Software & Systems — Koua Mohamed Anis
  04 Networks & IoT — Merzougui Abdellah El Ghazali, Nacef Abdelmouheimene
- "The Voyage": the same six-step route as on the home page, ending at "The One Paper".
- "How you take part": three steps in a row — Join the crew (become a member and pick a pole), Join a
  project team (work with your pole and its leads), Contribute (read, experiment, write, present).
- "Current projects": an empty-state card in a dashed border: "Our first projects are being formed.
  Join a pole to be part of them." with a button "Join the crew". (Real projects are added later.)
```

## Prompt 6 — Training

```text
Design the INSIGHT "Training" page (desktop) with the same design system, navbar and footer.

- Dark header: eyebrow "TRAINING", headline "Every captain started as a rookie.", chip
  "Led by Sakhri Mohammed Firas · Head of Training".
- "From Rookie to Captain": a vertical ladder of four levels, connected by a thin line, each level a
  card with a mono level label, title, description and example topics:
  I · ROOKIE — Paper reading: read and discuss scientific papers.
  II · NAVIGATOR — Research methodology: how research is designed and done.
  III · SCHOLAR — Academic writing: write and publish your work.
  IV · CAPTAIN — Technical workshops: hands-on skills for your pole.
- "The shipyard and the voyage": a two-sided diagram — Training (the shipyard, builds the skills) and
  Research (the voyage, puts them to work) — with arrows both ways: "Skills feed projects" and
  "Projects show what to learn next". Serif italic line: "Learn by doing. Do by learning."
- "Upcoming sessions": a list of session rows (mono date, type tag like PAPER READING or WORKSHOP,
  title, room, "Add to calendar").
- "Reading list": a grid of paper cards (title, authors, year, pole tag, "Read paper ↗").
```

## Prompt 7 — Crew

```text
Design the INSIGHT "Crew" page (desktop) with the same design system, navbar and footer.

- Header on paper: eyebrow "THE CREW · 2026/27", headline "Every great voyage needs more than a
  captain.", and a row of filter tabs: All, The Helm, Departments, Research poles.
- "The Helm": six person cards in a row. Each card: square photo (use a placeholder with initials in
  Space Grotesk on a navy-to-silver gradient), name, role in mono, one line. On hover show a small
  rotated stamp "WANTED · for excessive curiosity" in the corner.
  Faci Souhaib Abdelouakil — PRESIDENT — Leads the club and represents it.
  Madaoui Sara — VICE-PRESIDENT — Runs meetings and strategy.
  Redouane Mohamed Islem — VICE-PRESIDENT — Runs meetings and strategy.
  Feltane Anayis — SECRETARY GENERAL — Records and documents.
  Madoui Roufaida — SECRETARY GENERAL — Records and documents.
  Ghasmoune Mohammed — TREASURER — Budget and funding.
- "Departments": one block per department with its name, a one-line role, and its heads as smaller
  person cards:
  Communication & Media — Manadi Tasnime, Bouras Firas, Rachedi Aya Meriem
  Design — Boursasa Lotfi Abdelmoumene, Boubrioua Riham
  Events & Logistics — Richi Roufaida, Belkaioua Nouha, Diabi Lyna
  External Relations — Bey Ahmed Khernache Mounir, Abadelia Mohammed Abdelghani
  Human Resources — Belkerrouche Asma, Hachemi Zakaria
  Research Programs — Allaoua Ait Abdelghani · Training — Sakhri Mohammed Firas
- "Research pole leads": four columns, one per pole, with their leads.
```

## Prompt 8 — Events + event detail

```text
Design the INSIGHT "Events" page (desktop) with the same design system, navbar and footer.

- Dark header: eyebrow "EVENTS", headline "Islands on the map.", and tabs "Upcoming" / "Past".
- "Next event" featured card: large image, red "UPCOMING" badge, mono date and place, title,
  short description, "Add to calendar" and "Details →" buttons.
- Past events as a grid of event cards (image, mono tag + date, title, one line, small stat like
  "~200 attendees"). First card: "Welcome Day 2026" — 4 Nov 2026 — "The club sets sail, with a live talk
  by Dr. Pin-Yu Chen from IBM Research."

Then design a second screen: the event detail page for "Welcome Day 2026". Wide hero photo, mono
metadata row (date, place, attendees), the story in an editorial reading column, a "Programme" timeline,
a "Guest" card for Dr. Pin-Yu Chen, and a photo gallery grid.
```

## Prompt 9 — Join

```text
Design the INSIGHT "Join" page (desktop) with the same design system, navbar and footer.

- Dark hero with the beam glow: eyebrow "REGISTRATIONS OPEN · 2026/27" with a small red live dot,
  headline "Join the crew.", serif italic "No experience required. Only curiosity.", blue button
  "Apply now" and a mono note "Free · open to all ESTIN students · takes 3 minutes".
- "How it works": three steps — Apply (fill the form), Meet us (short welcome session), Pick a pole and
  start (join a project team and the Rookie training level).
- "Pick your pole": four selectable cards for the four poles, plus a fifth card "Support departments"
  (Communication, Design, Events, External Relations, HR).
- "What you get": a list with check icons — paper-reading sessions, workshops, a project team, mentoring
  from researchers, a path to your first publication.
- FAQ accordion and a final "Apply now" button.

Also design the "closed" state of the same page: grey badge "REGISTRATIONS CLOSED", headline "The next
crew sets sail soon.", an email field "Notify me when registrations open" and a link to Instagram.
```

## Prompt 10 — Collaborate + Contact

```text
Design the INSIGHT "Collaborate" page (desktop) with the same design system, navbar and footer.
Audience: researchers, labs, guest speakers, sponsors and other clubs.

- Header on navy: eyebrow "COLLABORATE", headline "Build bridges with the next generation of
  researchers."
- Four cards: Give a talk (online or on campus), Mentor a project team, Partner or sponsor,
  Co-organise an event with another club.
- A highlight quote card about Dr. Pin-Yu Chen as a collaborator of the club.
- A contact form on the right of a two-column layout: name, email, organisation, "I am a…" select
  (Researcher, Lab, Company, Club, Student, Other), message, blue button "Send". Left column: club email,
  Instagram @insight.estin, location "ESTIN, Amizour, Béjaïa, Algeria".
```

## Prompt 11 — 404

```text
Design the INSIGHT 404 page with the same design system. Dark ink background with dot grid, the logo's
light beam pointing at an empty spot. Mono label "ERROR 404", headline "This island isn't on the map.",
serif italic "Even the best navigators get lost sometimes.", buttons "Back to home" and "See events".
```

## Prompt 12 — Phone versions

```text
Create mobile versions (390px wide) of the INSIGHT Home page, keeping the same design system.
Replace the top navbar with a compact top bar (logo + "Join" button + menu icon) and a floating bottom tab bar
with 16px corners and five tabs: Home, Research, Events, Crew, Join, with a sliding highlight on
the active tab. Stack all grids into one column, keep the hero headline at least 44px, turn the compass
into a swipeable row of pole cards, and turn the voyage route into a vertical dashed line.
```

Then repeat for the other pages with: `Create the mobile version (390px) of the [page name] page.`

---

## Refinement prompts (copy, change the bracket, paste)

| Problem | Prompt |
|---|---|
| Looks generic / template | `Make this feel more like a research journal: more white space, larger headline, mono labels for metadata, remove decorative icons.` |
| Colours drifted (purple, neon) | `Use only the INSIGHT palette: ink #0B1120, navy #1B2A55, blue #3F66B0, periwinkle #7F97C7, silver #DDE3EC, paper #F5F6F8. Remove any purple or neon.` |
| Too many shadows / glass | `Replace shadows with 1px hairline borders and remove the glass blur effects.` |
| Hero beam is weak | `Make the particle beam leaving the eye more visible and longer, fading from silver to transparent toward the right edge.` |
| Fonts wrong | `Headings in Space Grotesk bold, body in Inter, labels in uppercase monospace, quotes in serif italic.` |
| Section too crowded | `Simplify the [section name] section: keep only the headline, one line of text and the [cards/list].` |
| Inconsistent across screens | `Match the navbar, footer, buttons and card style exactly to the Home page.` |

---

## Final check before exporting

- [ ] Every screen uses the same navbar, footer, buttons and cards
- [ ] Only palette colours, signal red only for Live/New/Deadline
- [ ] Mono "LOG 0X · …" eyebrows on every section
- [ ] Real names and numbers only (27 · 7 · 4); no invented stats or testimonials
- [ ] Person photos are clear placeholders, ready to swap for real photos
- [ ] Readable contrast on dark sections (muted text not too faint)
- [ ] Phone versions done for Home, Research, Crew, Events, Join
