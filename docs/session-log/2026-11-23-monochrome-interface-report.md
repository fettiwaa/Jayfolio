# Monochrome Technical Interface: Report

Date: 2026-11-23 · Brief: "Jayfolio – Premium Monochrome Tech Interface Evolution" (pasted in chat) · Base commit `64bce89` · Owner approved all six decisions with the recommended picks. Uncommitted.

## Decisions (approved)

1. Home page reorganised into a 12-column panel grid.
2. JetBrains Mono for labels, dates, stats and panel headers, via `next/font` (downloaded at build time; no npm package).
3. All technology logos from Simple Icons v16.37.0 (CC0). 26 SVGs downloaded with owner approval from `cdn.jsdelivr.net/npm/simple-icons@16.37.0/icons/`, each checked as a plain single-path SVG, then copied to `public/icons/tech/`. `sql.svg` and `vscode.svg` are hand-drawn generic stand-ins (neither brand is in Simple Icons).
4. Case-study `##` sections render as separate panels, via an in-repo rehype plugin (`lib/rehype-sections.ts`).
5. PostgreSQL and MySQL removed from Backend; Database owns them (28 unique tiles).
6. Unused `skills-marquee.tsx` deleted.

## What changed

**Design system** (`app/globals.css`)
- Neutral zinc palette from the brief.
  - Muted text is `#8A8A93` instead of `#71717A`, which failed contrast on the panels (3.48–4.02:1).
  - Light theme equivalent added.
  - New tokens: `--theme-border-strong`, `--theme-panel-highlight`, `--theme-panel-shadow(-hover)`.
- Panel system in `@layer components`, so utilities can override it: `.panel`, `.panel-interactive`, `.panel-header`, `.panel-body`, `.panel-inset`.
- Container width 1120px. Radii 8 / 6 / 4px. Tighter page rhythm. Type scale tuned for compact panels.
- `.tech-icon`: SVG logos used as CSS masks. They take the text colour (theme-aware) and add no JavaScript; the Composer logo alone is 39 KB of path data.
- Case-study panels with mono "~/ section" headers, a terminal-style code/diagram block, and mono table headers.

**Components**
- **New:**
  - `Panel` / `PanelGrid` (page-load staggered reveal).
  - `PageHeader` (breadcrumb + `h1`).
  - `TechLogo` / `TechTile` ("Used in …" tooltip from project data only).
  - `lib/tech.ts` (icon map, project usage).
  - `lib/rehype-sections.ts`.
- **Rewritten:**
  - Hero: intro panel, portrait panel, core-stack strip. Stats in a hairline grid. CTAs "View Projects" + "Email me".
  - About panel: bio, focus areas, facts grid from existing data.
  - Tech stack panel: 4 categories of tiles, container-query columns.
  - Timeline: compact; date on the right; the line draws once; first entry filled.
  - Experience empty state: dashed inset with a decorative terminal line. Approved wording kept.
  - Project card: numbered panel with status, framed thumbnail, stack chips with logos, actions.
  - Footer: status bar.
  - Nav: J monogram and mono links.
  - Chat panel: panel styling, mono header.
- **Removed:** `section-title.tsx`, `animated-pill.tsx`, `skills-marquee.tsx`, the old placeholder `TechIcon` set.

**Pages**
- **Home:** server component (less JS: 160 → 154 kB first load). Grid:
  - hero (8) + portrait (4) + stack strip (12);
  - Experience/Education (5) | About/Tech Stack (7);
  - Selected Work (12);
  - Contact (12).
- **Inner pages:** About, Projects, Skills, Experience, Education, Resume and Contact each have `PageHeader` + content panels. Several became server components.
- **Case study:** header panel; MDX sections as panels; sticky side column with Project facts, Stack and Contents (desktop). Facts come first on phones.
- **404:** terminal-style panel.

**Motion** (`lib/animations.ts`): one easing curve, durations 150 / 250 / 400 ms.
- Page-load panel stagger (60 ms) replaces repeated scroll fade-ins.
- Hover lift: 2px on panels, 2px + icon ×1.1 on tiles.
- Timeline line draws once; nav underline springs between links; chat panel scales from its corner.
- Reduce-motion respected (existing `MotionConfig`).

## Validation

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Passed |
| `npm run lint` | Passed (ESLint coverage of `.tsx` is minimal; known) |
| `npm run build` | Passed, 16 routes |
| Tests | Not available (none in project) |
| All routes respond | Passed: 10 × 200, unknown route 404 |
| One `h1`, one `<main>`, no nested links / buttons in links | Passed on every route |
| Heading levels | Passed (project titles are `h2` on `/projects`, `h3` under home "Selected Work") |
| Tech icons | Passed: 28/28 icon files return 200; `/skills` renders 28 tiles |
| Case-study panels | Passed: 12 (JayFolio V3) and 7 (AI Engineering Kit) sections with ids |
| Compiled CSS | Passed: components layer, mask icons, container queries, important/opacity utilities, JetBrains Mono applied on `<html>` |
| Text contrast, both themes, all surfaces | Passed, lowest 4.63:1 (dark muted on fill); primary buttons 15.3 / 16.1:1 |
| Off-palette / hard-coded colours in components | None |
| Browser console, rendered visual QA | **Not run**: no browser tool in this environment |

## Needs the owner's eyes (http://localhost:3000)

1. Home at desktop width: panel balance, the left column (Experience + Education) height vs the right column (About + Tech Stack).
2. Phone width: panel stacking, hero stats grid, chat panel.
3. Tech tiles: logos crisp in both themes; tooltip on hover.
4. A case study: section panels, sticky side column, terminal code block.
5. Light theme overall.

## Remaining issues

- No font preload link is emitted for JetBrains Mono (`font-display: swap`; text shows in the fallback font for a moment on first load).
- Tooltips are hover-only (the same text is available to screen readers); touch users don't see "Used in".
- Content gaps for the owner: case studies have one image between them; real screenshots would strengthen the panels.
