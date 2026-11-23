# Phases 3–9 Report: Premium Refinement

Date: 2026-11-23 · Base commit `dd0733b` · Owner approved all phases with the recommended picks (D1 own case-study styles, D2 calmer radius, D3 "J" monogram, D4 Experience wording, D5 optional items except 4.7). Nothing committed.

## Summary

The site keeps its monochrome identity, routes, and content. It now:
- loads in the right theme with no colour flash;
- takes every colour from theme tokens;
- passes text contrast (AA) in both themes;
- has a real type scale and readable, formatted case studies;
- has valid link structure and one `h1` per page;
- has keyboard-friendly menus and dialogs;
- respects reduced motion;
- has a chat bot that answers the right topic.

## Changes by phase

| Phase | Plan items | What changed |
|---|---|---|
| 3 Foundation | 3.1–3.8 | Pre-paint theme script and `suppressHydrationWarning`. `dark:` variant tied to `data-theme`. New tokens (`--theme-fill`, `--theme-nav-glass`, `--theme-menu-bg`, `--theme-overlay`, `--badge-radius`). Contrast-tuned grays. Type-scale utilities (`text-display`, `text-page-title`, `text-section`, `text-subsection`, `text-lead`, `text-label`). `SectionTitle` with `as="h1"`. `MotionConfig reducedMotion="user"`. Neutral `Badge`/`AnimatedPill` and new `ProjectStatus` (shape cue, no colour). Calmer radii. `Button` renders Next `Link` for internal paths. Dead code removed: blue hover value, `theme-transitioning`, unused `isDark`, `toggleTheme` helper. Canonical Tailwind v4 class syntax in every touched file. |
| 4 Homepage | 4.1–4.6 | Hero shows only existing photos (carousel turns itself on when more are added), real-link CTA, stats as a `<dl>`. Project grid no longer double-padded. About list has no orphan "·" lines. Section ids for nav tracking. Contact links from `site` constants. Tighter `section-padding-sm` for About, Experience, and Education; divider before the contact CTA. |
| 5 Projects | 5.1–5.4 | `.case-study` styles for headings, lists, code, tables, quotes, images (68ch measure). Case-study header with Year / Status / Role `<dl>` and neutral tech pills. GitHub/Demo as buttons. Prev / All / Next as a labelled `<nav>` that stays aligned when one side is missing. Project card: one main link (image + title), actions always visible and outside it, decorative image `alt=""`. |
| 6 Supporting pages | 6.1–6.6 | Timeline: one left line, dots centred on it, content beside it at all widths. Skills chips are non-interactive; one "View all skills" button. Approved Experience empty state on home, `/experience`, and `/resume`. Education page shows awards and coursework from existing data. Contact cards restyled; email moved out of the button label (overflowed on phones). Resume and 404 use the shared `Button`. 404 has a single `<main>`. `app/icon.svg` + `app/apple-icon.tsx` monogram. |
| 7 Interaction | 7.1–7.6 | Nav: IntersectionObserver section tracking (nothing active above the first section), distinct active colour, `aria-current`. Mobile menu is a dialog: Escape, focus moved in and restored, Tab trapped, scroll locked, current page marked. Skills modal: close button, Escape, dialog semantics, focus trap, scroll lock. Shared `lib/use-dialog.ts`. Chat: whole-word ordered rules; labelled input in a `<form>`; `role="log"` live region; `aria-expanded`; Escape; fits 320px screens; tokens only (fixed the `#171111` typo). Calmer motion: per-item animations removed from skills and footer; section rule no longer animates. |
| 8 QA | — | Served-HTML and CSS checks below. Rendered visual QA not possible (no browser tool). |
| 9 Validation | — | Results below. |

**One deviation from "keep Experience as is":** the home page's "View Full Experience" button is hidden *while the list is empty*, because it led to a second empty page. It reappears automatically when an entry is added. Section, nav link, and `/experience` page are unchanged in presence.

## Files changed

- **Modified (30):**
  - `app/`: `layout`, `globals.css`, `page`, `about`, `contact`, `education`, `experience`, `not-found`, `projects`, `projects/[slug]`, `resume`, `skills`.
  - `components/`: `chat-button`, `footer`, `nav`, `project-card`, `project-grid`, `about`, `hero`, `skills`, `theme-provider`, `animated-pill`, `badge`, `button`, `section-title`, `theme-toggle`, `timeline`.
  - `lib/`: `chat`, `constants`, `theme`.
- **Added (5):** `app/icon.svg`, `app/apple-icon.tsx`, `components/ui/experience-empty.tsx`, `components/ui/project-status.tsx`, `lib/use-dialog.ts`.
- **Docs:** progress record, Phase 1 audit, Phase 2 plan, this report.

## Validation

| Check | Result |
|---|---|
| `npx tsc --noEmit` | **Passed** |
| `npm run lint` | **Passed** (note: ESLint barely covers `.tsx`; see remaining issues) |
| `npm run build` | **Passed**, 16 routes (adds `/icon.svg`, `/apple-icon`) |
| Automated tests | **Not available** (project has none) |
| Browser console errors | **Not run** (no browser tool) |
| All routes respond | **Passed**: 10 routes 200, unknown route 404 |
| One `h1` and one `<main>` per route | **Passed** (was: 8 routes without `h1`, 404 with 2 `<main>`) |
| No nested links / buttons in links | **Passed**: max `<a>` depth 1, 0 `<a><button>` (was 2 and 4) |
| Assets | **Passed**: profile photo, `/icon.svg`, `/apple-icon`, `/og` all 200; no requests for missing photos |
| Theme script in `<head>`; no inline hex colours in served HTML | **Passed** |
| New CSS compiled (`.case-study`, type scale, `dark:` variant, token classes) | **Passed** |
| No off-palette colours or hard-coded theme hex in components | **Passed** (`grep`) |
| Text contrast, all text tokens on bg/surface/elevated/fill | **Passed**, minimum 4.51:1 (dark muted on chat bubble) |
| Chat routing, 13 sample questions | **Passed** (frameworks→skills, school→education, AI Engineering Kit→projects, unknown→fallback) |
| Diff review | **Passed**: only intended files; no secrets, env files, or build artefacts |

## Visual verification

**Not performed.** No browser or screenshot tool was available (the owner removed the Chrome extension). Every visual statement here comes from code and served HTML/CSS. Please check at http://localhost:3000:

1. Light and dark themes: toggle, reload, no flash.
2. Phone width (~375px): nav menu, hero stats, project cards, chat panel.
3. A case study: heading sizes, lists, code block, table.
4. Skills "View all skills" popup: Escape and close button.
5. Nav underline while scrolling the home page.

## Remaining issues and recommendations

- **Visual QA still open** (see list above).
- **Not done (deferred, D5):** 4.7, converting the home page to a server component (performance only).
- **Unused component:** `components/sections/skills-marquee.tsx` still has old hard-coded colours. Delete it or restyle it if it is ever used.
- **Lint coverage:** ESLint has no TypeScript parser, so `.ts/.tsx` rules are minimal (already in `docs/technical-debt.md`).
- **Content for the owner:**
  - Case studies have one image between them. Real screenshots would strengthen them.
  - The About subtitle and paragraph repeat the hero tagline.
  - The home Education subtitle mentions coursework, which only the Education and Resume pages show.
- **Duplicate skills:** PostgreSQL and MySQL are listed under both Backend and Database. The hero counts them once (28); the "All skills" popup shows both entries.

## Git status

Branch `main`, uncommitted changes as listed above. Nothing committed, pushed, or deployed.
