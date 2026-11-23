# Phase 1 Audit: Jayfolio Premium Refinement

Date: 2026-11-23 · Commit audited: `dd0733b` · Read-only; no website files changed.

## How this was checked

- **Code:** every route in `app/` and every component in `components/` was read.
- **Served output:** HTML and CSS from the local production server (`npm run build` + `npm run start`), using `curl`: heading counts, link nesting, asset status codes, compiled CSS.
- **Contrast:** WCAG ratios computed from the theme tokens in `app/globals.css`.
- **Chat bot:** the keyword table in `lib/chat.ts` was replayed against sample questions.
- **One screenshot:** dark theme, home, desktop width (taken earlier with a browser extension that has since been removed).
- **Not done:** no browser was available for light theme, mobile/tablet widths, hover states, or animation feel. Items marked **Inferred** come from reading code and need a visual check.

Evidence labels: **Verified (HTML/CSS)**, **Verified (code)**, **Verified (screenshot)**, **Inferred** (visual effect predicted from code).

Baseline checks on `dd0733b`: `tsc --noEmit` pass · `npm run lint` pass · `npm run build` pass (14 routes).

---

## Findings

### High priority

| # | Area | Problem | Why it matters | Recommended change | Files | Type | Risk | Evidence |
|---|---|---|---|---|---|---|---|---|
| H1 | Theme (all pages) | The server renders with `data-theme="dark"` but components pick colours from `resolvedTheme`, which starts as `light`. First paint has light-theme hex colours on the dark background (nav name is `#1a1a1a` on `#0d0f12`) until React hydrates. Visitors who prefer light see a dark page, then a switch. | Visible flash and wrong colours on every load; feels unpolished. | Move colours into CSS tokens so they follow `data-theme` with no JS. Set the theme before paint with a small inline script. | `app/layout.tsx`, `components/theme-provider.tsx`, `nav.tsx`, `chat-button.tsx`, `section-title.tsx`, `timeline.tsx`, `project-card.tsx` | Visual / technical | Medium | Verified (HTML) |
| H2 | Case studies | Body uses `prose prose-gray`, but no typography plugin is installed. The compiled CSS has **0** `.prose` rules, so MDX headings, lists, tables, and code get only Tailwind's reset: no heading sizes, no bullets. | Case studies are the main proof of skill, and they read as one undifferentiated block. | Add scoped case-study styles in `globals.css` using existing tokens (no new dependency), or add `@tailwindcss/typography` (new dependency, needs approval). | `app/projects/[slug]/page.tsx`, `app/globals.css` | Visual / content | Low | Verified (CSS); look Inferred |
| H3 | Hero | The profile carousel cycles 3 images; `profile-2.jpg` and `profile-3.jpg` return 404. | A broken image shows two-thirds of the time, in the most visible spot. | Cycle only images that exist (or the owner supplies more). | `components/sections/hero.tsx` | Visual | Low | Verified (HTML) |
| H4 | Project cards, CTAs | Links nested inside links: the card is one `<Link>` that also contains "Case Study", "GitHub", and "Live Demo" links (nesting depth 2 on `/projects`). Buttons sit inside links: 4 `<a><button>` on `/` ("View Projects", "View All Projects", "View Full Experience", "Get in Touch"). | Invalid HTML; screen readers and keyboard users get duplicate or confusing targets; browsers can split the markup. | Make the card's title the main link, with secondary links outside it. Render CTAs with `Button href` (already supported) instead of `Link > button`. | `project-card.tsx`, `hero.tsx`, `app/page.tsx` | Accessibility / technical | Low | Verified (HTML) |
| H5 | Identity | Colour outside the monochrome palette: blue tech pills on case studies (`AnimatedPill color="blue"`), green/amber status text on cards and case studies, and an unused blue hover value in `project-card.tsx`. | Breaks the black/white/gray identity the brief requires. Light amber is also only 3.19:1. | Neutral pills; show status with text plus a neutral marker; delete the blue leftovers. | `animated-pill.tsx`, `project-card.tsx`, `app/projects/[slug]/page.tsx` | Visual | Low | Verified (code) |
| H6 | Headings | 8 routes have **no `<h1>`** (`/about`, `/projects`, `/experience`, `/skills`, `/education`, `/resume`, `/contact`): `SectionTitle` always renders `<h2>`. `/skills` also uses `<h2>` for both the page title and its categories. | Screen-reader navigation and SEO rely on one clear top heading per page. | Let `SectionTitle` render `h1` when it's the page title; demote nested levels. | `components/ui/section-title.tsx`, page files | Accessibility / SEO | Low | Verified (HTML) |
| H7 | Contrast | `--theme-text-muted` fails WCAG AA for normal text: **2.35:1** in light, **3.97:1** in dark (**3.69:1** on dark cards). Light `--theme-text-secondary` is **4.47:1**, just under 4.5. Muted is used for dates, stat labels, metadata, and the footer copyright. | Small grey text is hard to read for many visitors. | Darken or lighten the two tokens within the gray scale to at least 4.5:1. | `app/globals.css` | Accessibility | Low | Verified (computed) |
| H8 | Motion | Reduced motion is handled only in CSS. Framer Motion runs in JavaScript and ignores it; there's no `MotionConfig` or `useReducedMotion`. Nearly every element animates. | Users who ask their OS for less motion still get slides, scales, and drawing lines. | Wrap the app in `<MotionConfig reducedMotion="user">`. | `components/theme-provider.tsx` or `app/layout.tsx` | Accessibility | Low | Verified (code) |
| H9 | Skills modal | "All Skills" has no close button, no Escape key, no `role="dialog"`/`aria-modal`, no focus move or trap, and no scroll lock. It closes only by clicking the backdrop. | Keyboard users can't close it; screen readers don't announce it. | Close button, Escape, dialog semantics, focus handling, scroll lock. | `components/sections/skills.tsx` | Accessibility / usability | Low | Verified (code) |

### Medium priority

| # | Area | Problem | Recommended change | Files | Type | Risk | Evidence |
|---|---|---|---|---|---|---|---|
| M1 | Nav active state | At the top of the home page, "Experience" is underlined. The Projects section has no `id`, and the code defaults to the first section it finds. Section positions are measured once and go stale after animations or resizing. In light theme, active and inactive links are the same colour (`#6b7280`); only the underline differs. No `aria-current`. | Add the missing `id`, default to none above the first section, use IntersectionObserver, distinct active colour, `aria-current="page"`. | `components/layout/nav.tsx`, `app/page.tsx` | Usability | Low | Verified (screenshot + code) |
| M2 | Mobile menu | No Escape, no `aria-expanded`/`aria-controls`, focus isn't moved or trapped, page scrolls behind it, no active-page marker. | Standard dialog behaviour. | `nav.tsx` | Accessibility | Low | Verified (code) |
| M3 | Chat bot matching | Substring matching misroutes questions: "frameworks"/"networking" contain "work" → "I don't have work experience"; "Which school…" and "something" contain "hi" → the greeting; "AI Engineering Kit" hits "about" first → the About answer. | Match whole words and order specific keywords first. Stays a predefined-answer bot. | `lib/chat.ts` | Content / functional | Low | Verified (replayed) |
| M4 | Chat bot UI | The topic list still offers Experience and Resume, which now lead to "nothing yet" answers. Input has only a placeholder, no label. Replies aren't announced (`aria-live`). Toggle lacks `aria-expanded`. No Escape. The panel is 320px wide at `right-6`, so it overflows screens narrower than ~344px. Dark input background `#171111` is a red-tinted typo. Chat button can cover bottom-right content on phones. | Fix semantics, sizing, and stale topics; use tokens. | `components/chat/chat-button.tsx`, `lib/chat.ts` | Accessibility / visual | Low | Verified (code); overflow Inferred |
| M5 | Content integrity (owner decision) | **Resolved 2026-11-23.** Correction: the hero already read "PROJECTS 02" (commit `4ca4b6f`); the original note quoted an older read. "TECH 18+" understated the 28 unique listed skills (30 entries; PostgreSQL and MySQL appear in two categories); both stats now count from `lib/data.ts`. Subtitles corrected (see progress record). Originally: "Selected Work" subtitle says "ranging from full-stack web applications to console-based systems", which no longer matches. Skills subtitle claims "work with daily". The tagline appears three times: hero, About subtitle, About paragraph. | Owner confirms or supplies real wording; nothing invented. | `hero.tsx`, `app/page.tsx`, `app/projects/page.tsx`, `skills.tsx`, `about.tsx` | Content | Low | Verified (code) |
| M6 | Empty Experience (owner decision) | Experience is still in the nav, on home (with a "View Full Experience" button leading to another empty page), and on the resume page as a heading over an empty message. | Hide the section and links while empty, or keep one honest line. Owner's choice. | `lib/constants.ts`, `app/page.tsx`, `app/resume/page.tsx` | Content / UX | Low | Verified (code) |
| M7 | Timeline | On desktop the line moves to the centre (`md:left-1/2`), but the dot stays at the far left (`left: -5px`). Content sits in the right half, right-aligned, away from the line. | Align the dot to the line; left-align content next to it. | `components/ui/timeline.tsx` | Visual | Low | Verified (code); look Inferred |
| M8 | Project card actions | "Case Study / GitHub / Live Demo" are `opacity-0` until hover. Invisible on touch screens; keyboard users can tab to invisible links. | Always visible, or folded into the card's main link. | `project-card.tsx` | Usability / accessibility | Low | Verified (code) |
| M9 | Favicon | `/favicon.ico` and `/apple-touch-icon.png` return 404, though metadata points to them. | Add icons; the owner may want to supply artwork. | `public/`, `app/layout.tsx` | Visual / SEO | Low | Verified (HTML) |

### Low priority

| # | Area | Problem | Recommended change | Evidence |
|---|---|---|---|---|
| L1 | Layout | Double horizontal padding around the project grid: both the section and `ProjectGrid` add container width and padding, making the grid narrower than other sections (most noticeable on mobile). | Remove the inner container. | Verified (code) |
| L2 | About | On mobile the focus list is `flex-col`, so each "·" separator sits on its own line. | Hide separators when stacked, or keep a single wrapped line. | Verified (code); look Inferred |
| L3 | 404 page | Renders a second `<main>` inside the layout's `<main>` (2 `main` elements). | Use a `div`/`section`. | Verified (HTML) |
| L4 | Theme toggle | "System" can't be chosen again after the first click (cycles light ↔ dark). | Optional three-state control, or leave as is. | Verified (code) |
| L5 | Tokens | ~50 hard-coded colours across 8 files duplicate the theme tokens. `--section-padding-y/x` tokens exist but the utilities use other values. The provider adds a `theme-transitioning` class that no CSS uses. Several unused `isDark` variables. | Phase 3 foundation cleanup. | Verified (code) |
| L6 | Performance | The whole home page is a client component (`"use client"`), so all of it ships as JavaScript. | Only if Phase 3/4 touches it. | Verified (code) |
| L7 | Tooling | ESLint barely checks `.ts/.tsx`. Already in `docs/technical-debt.md`. | Out of scope unless approved. | Verified (config) |

### Subjective design opportunities (not defects)

- **Pill-heavy UI:** badges, tech pills, chat chips, the theme toggle, and footer icons are all fully rounded. The brief asks to avoid excessive pills. A smaller radius would fit the editorial direction.
- **Repetitive entrance motion:** almost every element fades or slides in on scroll with a similar timing. Fewer, more deliberate reveals (section titles and key content only) would read as more premium.
- **Type hierarchy:** section titles are semibold, but the contact CTA heading is bold; subtitles are large (`text-lg/xl`) and close in weight to headings. A defined type scale (display / section / body / label) would sharpen hierarchy.
- **Section rhythm:** every section uses the same 6–8rem padding plus a footer top margin. The page reads as stacked equal blocks; varying density by content would help.
- **Hero:** strong name hierarchy. The player-stats idea is distinctive and worth keeping, but needs truthful values (M5) and a clearer label/value contrast (H7).

---

## Design system inventory (current state)

**Colour tokens** (`app/globals.css`, switched by `[data-theme]`):

| Token | Light | Dark |
|---|---|---|
| `--theme-bg` | `#f6f6f4` | `#0d0f12` |
| `--theme-surface` | `#ffffff` | `#111418` |
| `--theme-surface-elevated` | `#fafafa` | `#14181d` |
| `--theme-text` | `#1a1a1a` | `#f0f0f0` |
| `--theme-text-secondary` | `#6b7280` (4.47:1) | `#8b93a7` (6.24:1) |
| `--theme-text-muted` | `#9ca3af` (2.35:1) | `#6b7280` (3.97:1) |
| `--theme-border` | `#e0e0dc` | `#2a2f36` |
| `--theme-accent` | `#1a1a1a` | `#d1d5db` |

**Theme behaviour:** light / dark / system, saved in `localStorage`. Server HTML is fixed to dark (H1).

**Typography:**
- Fonts: Inter via `next/font` (`--font-sans`); system monospace for labels, dates, and stats.
- Scale in use:
  - Hero `h1`: 4xl → 6xl bold.
  - Section `h2`: 3xl → 4xl semibold.
  - Subtitles: lg → xl.
  - Body: base/sm.
  - Labels: xs mono uppercase.
- No named type scale.

**Spacing and layout:**
- Container: 1200px (`max-width-content`).
- Side padding: 1.5rem → 2rem at `md`.
- Section padding: 6rem → 8rem at `md`.
- Footer adds 6–8rem top margin.
- Prose width token (768px) unused.

**Breakpoints:** Tailwind defaults. Nav collapses below `md`; hero becomes two columns at `lg`; grids use `sm/md`.

**Radius and surfaces:**
- Cards 1rem, buttons 0.75rem, badges/pills/chips fully rounded.
- Thin borders, very light shadows.
- Glass blur on the scrolled nav and mobile menu.

**Shared components:**
- `Button`: primary / secondary / ghost, with `href` support.
- `Badge`, `AnimatedPill`.
- `SectionTitle`: always `h2`, with an animated rule.
- `Timeline`.
- `ProjectCard` / `ProjectGrid`.
- `ThemeToggle`, `Nav`, `Footer`, `ChatButton`.
- `TechIcon` set.
- `skills-marquee.tsx` (unused).

**Motion:**
- Presets in `lib/animations.ts`: fade-up, stagger.
- Many components use their own inline timings: 0.3–1.0s, ease-out, `whileInView` once.
- Hover lifts of 2–4px; button scale 1.02 / 0.98.
- CSS-only reduced-motion rule (H8).

---

## Not yet verified (needs eyes on the rendered site)

Light theme overall · mobile (≤390px) and tablet layouts · chat panel on small screens · hover and focus appearance · animation feel · case-study page appearance after H2. The owner can check these at http://localhost:3000, or send screenshots.

## Approval gate

No files were changed. Next is Phase 2: an art-direction and implementation roadmap built from these findings. It needs the owner's approval, plus decisions on M5 (content) and M6 (empty Experience).
