# Catalyst OS — Investor Demo

A clickable prototype of **Catalyst OS**, the operating system for continuous experiential
workforce development. Schools run recurring, real-world challenges; students join, build,
submit, get judged, earn recognition, and walk away with a stronger portfolio. Schools see
participation and outcomes in one dashboard.

This is a demo built to show investors the **core loop**, not a production system:

> Challenge Created → Students Join → Build → Submit → Judged → Recognition → Portfolio
> Updated → School Outcomes Updated → Next Challenge Opens

## Running it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables, database, or
account setup required — everything is seeded.

## How it's built

- **Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + Framer Motion + Recharts**
- All data lives in `lib/mock-data/*.ts` — one school (Bridgeview Innovation Academy), 9
  students, 6 challenges, teams, submissions, and judged results with real rubric feedback.
- Session-only "live" actions — joining a team, submitting a project, creating a challenge as
  an admin — are handled by `lib/demo-state.tsx` (React Context + `localStorage`), layered on
  top of the seed data. Nothing calls a server, so nothing can fail on stage from a flaky
  network request. Refreshing the page keeps your session state; clearing site data resets
  the demo back to the seed.
- Every derived number (portfolio entries, school stats, participant counts) is computed from
  the same live team/challenge/submission arrays in `lib/selectors.ts` — the student view and
  the admin view can never drift out of sync with each other.
- Challenges with a `sponsor` get an **Industry Dashboard** (`/sponsor/[id]`) — a corporate
  view onto that one challenge's stats, skills, ranked talent, and judged submissions, linked
  from the challenge card, the challenge page, and the admin challenges table.

## Suggested demo script (~8–10 minutes)

1. **Landing page** — set the scene: one loop, done well, not the whole platform vision.
2. **Student dashboard** (`View as a Student`, signed in as Zoe) — XP, badges, a completed
   challenge already sitting in her portfolio.
3. **Challenge marketplace** — filter by skill/status to show there's real breadth of content,
   not one demo challenge.
4. **Cybersecurity CTF → Join Challenge** — join an open team live. Point out the participant
   count ticking up.
5. **Submit a project** — fill in the form, submit, show the confirmation state.
6. **Jump to the AI & Automation Sprint results page** (already judged) — this is the payoff
   moment: XP counting up, badges unlocking, rubric scores with real judge feedback.
7. **Portfolio page** — the completed challenge is already there, auto-generated.
8. **Open the Robotics Expo's Industry Dashboard** (via the "Industry Dashboard" link on its
   marketplace card or challenge page) — the sponsor-facing payoff: participant/skill stats,
   a ranked talent list, and the judged submission with real feedback, all for the sponsor
   (ELS-Tec Group) rather than the school.
9. **Switch to Admin view** — the dashboard reflects the same activity you just generated:
   active student count, participation chart, skills distribution.
10. **Create a challenge** as the admin — publish it, then switch back to the student view and
    show it live in the marketplace.

## Not in this build

This demo is intentionally scoped to the core loop. Everything below is real product surface
area described in the original feature list, deliberately left for a later phase — not
missing by oversight:

- Real authentication, accounts, or SSO (the landing page's role picker stands in for login)
- A real multi-tenant organization hierarchy (one hardcoded school is enough to tell the story)
- A real database or server-side persistence (seed data + `localStorage` only)
- Real file/media upload and storage (submission links are plain URL fields)
- A live judge-scoring workflow, reviewer assignment, or calibration (results are pre-seeded)
- Curriculum/standards alignment mapping
- A full sponsor/employer portal — applicant messaging, talent discovery search, funded
  rewards (a lightweight per-challenge **Industry Dashboard** is included: see a sponsored
  challenge's stats, skills, ranked talent, and judged submissions — the Cybersecurity CTF
  sponsored by Aegis Cyber Range and the Robotics Expo sponsored by ELS-Tec Group both have
  one; there's no admin UI yet to add a sponsor to a *new* challenge)
- Multi-school competition, leagues, and seasons
- AI-assisted features (feedback summaries, skill extraction, recommendations)
- Notifications, audit logs, data export/reporting pipelines
- A real configurable XP/rewards rules engine

## Deploying

Push this repository to GitHub and import it on [Vercel](https://vercel.com/new) — no
configuration needed, it's a standard Next.js app. `npm run build` is verified clean.
