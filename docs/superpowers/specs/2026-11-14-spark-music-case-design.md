# SPARK 2026 · The Music Case: design and architecture

Status: draft for approval · 14 November 2026 · target: Session 1 on Sunday 15 November 2026.
Sources: `spark-2026/planning/SPARK Website Brief - Session 1.pdf` (the spec) and
`spark-2026/session-1-music-case/SPARK Session 1 - Paper Cards (print).pdf` (final card texts).

## 1. Intent

SPARK's exercise hour is a guided, no-score detective game. Teams of 4 investigate one question across
all 5 sessions: *does listening to music while studying help or hurt?* Session 1 ("Find the papers")
teaches turning a topic into a question, building a search, judging papers by relevance, and following
citations. Everything a team does lands in its case file, which carries over to Sessions 2 to 5.

Success tomorrow means: about 12 teams play on phones on ESTIN Wi-Fi, mentors control the pace from one
screen, nobody loses work, and nobody can find the answers in the page code.

## 2. Goals, non-goals, anti-goals

**Goals (Session 1, must work tomorrow)**
- Team creation with a 6-character code, and sign-in with that code from any device.
- The 6 steps (0 to 5) exactly as in the brief, with its texts and the 8 cards in the order C5, C1, C8, C3, C7, C2, C4, C6.
- Mentor panel behind a password: unlock steps, reveal the mission question, see each team's progress, open any case file, read mentor notes, export CSV.
- Live updates: unlocks reach every phone within about 5 seconds, without a refresh.
- Autosave of every field, with a "Saved" indicator.
- A structure that Sessions 2 to 5 can extend (same team, same case file).

**Non-goals for tomorrow** (nice to have in the brief, deferred)
- Download the case file as PDF (a printable page is enough).
- Offline queue beyond keeping unsaved text in the page.
- One account per mentor, an admin content editor, French and Arabic.

**Anti-goals** (a failure even if it works)
- Any score, timer, ranking, leaderboard, or green/red colour on choices.
- The mentor notes, the Step 4 clue, the hints or the key paper visible in page code before they are unlocked.
- Hosting any paper PDF, or collecting anything beyond team names and first names.

## 3. Architecture

**The website stays static; Supabase is the server.** The game pages are ordinary Astro pages with a
client-side TypeScript app. They talk directly to Supabase (Postgres) using the public `anon` key.

```
 Phone / laptop (static page on Vercel)          Supabase
 ┌──────────────────────────────┐   RPC calls    ┌──────────────────────────────┐
 │ /spark/... pages              │ ─────────────▶ │ Postgres functions (the API) │
 │ TypeScript game app           │                │  checks team code / mentor   │
 │ supabase-js (anon key)        │ ◀───────────── │  token, applies the rules    │
 │                               │   Realtime     │ Tables: locked (no direct    │
 │                               │ ◀───────────── │  access, RLS deny-all)       │
 └──────────────────────────────┘ session_state  └──────────────────────────────┘
```

Why this shape:
- **No server code to deploy.** The site keeps its current Vercel setup (no adapter, no environment variables), so there is less to break tonight.
- **Secrets enforced by the database, not the browser.** Every table has Row Level Security on with no policies, so the `anon` key cannot read or write tables directly. All access goes through `SECURITY DEFINER` Postgres functions that check the team code or mentor token and apply the brief's rules (for example, the clue is returned only when Step 4 is unlocked).
- **The anon key is public by design**, so it can live in the repo (`src/data/spark.ts`). The `service_role` key is never used in the site.
- **Live updates via Supabase Realtime** on one small public table (`session_state`: unlocked step and whether the mission question is revealed, nothing secret), with polling every 5 s as a fallback if the WebSocket is blocked.

## 4. Data model (Postgres, schema `spark`)

| Table | Fields | Notes |
|---|---|---|
| `teams` | id (uuid), session_group (int), code (text, unique), name, members (text[]), created_at, last_activity | code: 6 chars from an unambiguous alphabet (no 0/O/1/I) |
| `session_state` | session_number (int pk), unlocked_step (0 to 5), mission_revealed (bool), updated_at | public read + Realtime; written only by mentor functions |
| `step1_answers` | team_id, question_text (≤300), checklist (bool[4]), updated_at | |
| `step2_answers` | team_id, words_music, words_studying, words_silence, words_remembering, search_line (≤200), useful_title (≤300), updated_at | |
| `card_choices` | team_id, card_id (C1 to C8), choice (keep / maybe / not_for_us), reason (≤200), updated_at | pk (team_id, card_id) |
| `step4_answers` | team_id, attempts (jsonb: title + time), hints_opened (0 to 4), found (bool), found_at | |
| `step5_answers` | team_id, surprised_text (≤500), updated_at | |
| `secret_content` | key (text pk), value (jsonb) | mission question, clue, 4 hints, key card, mentor notes |
| `mentor_sessions` | token (uuid), role (mentor / admin), expires_at | issued at login, 12 h |
| `settings` | mentor_password_hash, admin_password_hash, max_teams | bcrypt via pgcrypto |

Public card content (titles, authors, summaries, links) is not secret, so it lives in the site
(`src/data/spark/session1.ts`), copied word for word from the Paper Cards PDF. Fixing a typo is a push
that redeploys in about a minute (a small deviation from the brief, which asks for an editable store).

## 5. API (Postgres functions called with `supabase.rpc`)

Team functions take the team `code` as their credential:
- `create_team(name, members[])` → code. Rules: name unique and ≤30 chars, at least 2 first names, team cap (default 30).
- `get_team(code)` → team, current state and the whole case file (used on sign-in and on refresh).
- `save_step1(code, question, checklist)`, `save_step2(code, …)`, `save_step5(code, text)`: upsert, return updated_at.
- `choose_card(code, card_id, choice, reason)`: requires a reason.
- `get_mission(code)` → the mission question only if revealed.
- `get_trail(code)` → the clue only if unlocked_step ≥ 4.
- `open_hint(code)` → the next hint (records hints_opened), only if unlocked_step ≥ 4.
- `check_trail(code, title)` → records the attempt; if the normalised text contains both "preferred music" and "reading comprehension", or both "perham" and "currie", sets found and returns the key card.

Mentor functions take a `token` from `mentor_login(password)`:
- `mentor_overview(token)` → state + per team: step reached, cards sorted, key paper found, hints opened, last activity.
- `mentor_set_step(token, step)`, `mentor_reveal_mission(token, revealed)`.
- `mentor_case_file(token, team_id)`, `mentor_notes(token)`, `mentor_export(token)` (rows for CSV).
- `admin_reset(token)` (admin role only): deletes team data and sets the state back to step 0.

## 6. Pages

| URL | Page | Access |
|---|---|---|
| `/spark` | SPARK home: what it is, programme, link to the game | public |
| `/spark/join` | New team / I have a team code | public |
| `/spark/case` | The game: progress bar (Story → Question → Keywords → Cards → Trail → Case file), one screen per step | team (code in this browser) |
| `/spark/case-file` | Read-only case file, printable | team |
| `/spark/mentor` | Login, then the panel | mentor password |

The team code is kept in `localStorage` after joining, so a refresh keeps the team signed in.
Card IDs are internal and never shown to students.

## 7. Behaviour

- **Unlocking:** teams can open any step ≤ unlocked_step; higher steps show a lock. Step 0 is always open.
- **Autosave:** text fields save 1 s after typing stops and on blur; the indicator shows Saving… / Saved / "Not saved, retrying". Unsaved text stays in the page and is mirrored in `localStorage` until saved.
- **Several devices per team:** last save wins; the case file reloads when the page regains focus.
- **External links** (Google Scholar, DOI, free copy) always open in a new tab.
- **Step 4 success:** a short, gentle animation, skipped with reduced motion.
- **No feedback** on Steps 1 to 3 choices, ever.

## 8. Design

The INSIGHT site's design system (navy, fonts, components), with the brief's amber `#F5A524` as the SPARK
accent for buttons and highlights. Phone first, tested at 360 px. Keep / Maybe / Not for us share one
neutral button style. Body text at least 16 px.

## 9. Security and privacy

- RLS on every table with no policies; only the functions can touch data. Functions validate input lengths.
- Secrets live only in `secret_content` and are returned only by the gated functions.
- Mentor and admin passwords are stored as bcrypt hashes; tokens expire after 12 h.
- Spam protection: team cap, name uniqueness, length limits.
- Data collected: team names and first names only. Admin reset deletes everything after the programme.

## 10. Setup steps

1. You sign in to Supabase in Chrome (I don't enter passwords).
2. I create the project `insight-spark` in the EU (Frankfurt), using Supabase's own "generate password" button for the database password.
3. I run the migration (tables, RLS, functions, seed content) in the SQL editor, and turn on Realtime for `session_state`.
4. I set the mentor and admin passwords, and give them to you in a git-ignored file.
5. I add the project URL and anon key to the site, build the pages, and test locally with several browser windows as different teams plus a mentor.
6. I push; Vercel deploys. You and a few friends test with real phones tonight.

## 11. Acceptance checklist (from the brief)

- A new team gets a 6-character code; the code works from another device and finds the saved work.
- Steps stay locked until the mentor unlocks them; phones update within about 5 s.
- The mission question appears only after "Reveal mission question".
- Steps 1 and 2 autosave and show "Saved"; "Test on Google Scholar" opens a new tab with the search line.
- All 8 cards open with the right summary and link, in the order C5, C1, C8, C3, C7, C2, C4, C6.
- Keep / Maybe / Not for us requires a reason and updates the case board.
- No scores, rankings or right/wrong colours anywhere.
- Step 4 accepts the title or the author names, politely rejects others, and adds the key paper.
- The clue, hints, key paper and mentor notes are absent from the page code until unlocked.
- The mentor panel shows step, cards sorted, key paper found and hints for each team; CSV export works.

## 12. Risks and fallbacks

- **Untested on ESTIN Wi-Fi:** test with phones tonight; the printed Paper Cards stay ready as Plan B.
- **Realtime blocked by the network:** polling every 5 s takes over automatically.
- **Supabase free projects pause after a week without use:** fine across a 3-week programme with sessions every few days; worth checking before each session.

## 13. Calls I made (please check)

- Static site + Supabase functions instead of server routes on Vercel.
- Card texts from the Paper Cards PDF (newer, "checked against the papers"), not the brief's versions.
- Card content in the repo rather than an admin editor.
- Site design with an amber SPARK accent, rather than the brief's separate navy/amber theme and Rubik font.
- Deferred: PDF download, per-mentor accounts, content editor, other languages.
