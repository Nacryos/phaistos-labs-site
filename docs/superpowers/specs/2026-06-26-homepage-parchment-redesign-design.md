# Phaistos Labs — Homepage Parchment Redesign (Design Spec)

**Status:** Draft — pending user review
**Date:** 2026-06-26
**Repo:** `~/Developer/phaistos-labs-site` (canonical, GitHub remote `origin` → Nacryos/phaistos-labs-site)
**Design source:** `~/Documents/Claude/Projects/Phaistos Labs/phaistos-labs-style-guide.md`

---

## 1. Context & Goals

The current homepage is a dark, sci-fi single-file site: pure black, white text, warm-orange glow, glassmorphism, Inter font, dominated by a full-screen Three.js phylogenetic language graph (1,926 nodes) with a Ctrl+K search. It is impressive but reads as a tech demo, not a clearly-structured AI lab, and it is the **opposite** of the brand style guide.

This redesign rebuilds the **homepage only** to two goals from the user:

1. **High-level, clear, structured** presentation for an AI lab — minimalist but interesting. Design-motion inspiration: **"flapping airplanes"** (a flock of paper airplanes — boids/emergence, which doubles as a perfect AI metaphor and literal "archival paper").
2. **New aesthetic from the style guide:** light/parchment, naturalist-scholarly, transitional serif + humanist sans, muted botanical accents. Explicitly *anti* dark-mode/neon/glow.

## 2. Decisions Locked (from brainstorming)

- **Full parchment redesign** (style guide is the aesthetic authority).
- **Homepage first.** PhaiPhon and a future Approach page are out of scope this pass.
- Build in the **cloned canonical repo** (`~/Developer/phaistos-labs-site`).
- I **draft a short, high-level mission statement** as a placeholder (the existing dense technical version is replaced on the homepage).
- The dark 3D neural graph is **replaced** by the paper-airplane flock as the ambient backdrop.

## 3. Non-Goals (deferred)

- Restyling PhaiPhon (`phaiphon/`) — untouched this pass.
- Building a live `/explore` page UI/nav — we only *preserve* the old homepage as an unlinked file.
- Restyling/porting the Approach manifesto page (it lives only in the other local copy).
- A dark-mode toggle. The site is light/parchment only; dark is reserved for a future opt-in `/explore`.
- New interactive instruments or changes to `language_data.js` / `phaiphon_data.js`.

## 4. Aesthetic & Design System (mapped from the style guide)

**Mode:** Light / parchment only. Never pure black for text. Muted, desaturated, organic. No bloom, no neon, no sharp digital gradients, no stock imagery, no decorative borders, no "ancient/mystical" clichés.

### Color tokens (CSS custom properties on `:root`)

| Token | Hex | Role |
|-------|-----|------|
| `--paper` | `#E2DDD4` | Primary surface |
| `--paper-deep` | `#D8D1C4` | Aged / alternate band |
| `--foxing` | `#C4B8A5` | Texture spots only (3–5% opacity) |
| `--ink` | `#1A1A1A` | Text primary (never `#000`) |
| `--ink-2` | `#5A5A58` | Text secondary / captions |
| `--sage` | `#7A9A7E` | **Signature accent** |
| `--sage-deep` | `#5C7E60` | Accent depth / hover |
| `--rose` | `#B0737A` | Links & CTAs (interactive) |
| `--ochre` | `#C4A85C` | Warm accent, sparing |
| `--sepia` | `#7A5C3C` | Flock ink, mono transliteration text, hatching |
| `--highlight` | `#F5D76E` | Callout highlight, very sparing |
| `--grid-line` | `#D0CAC0` | Notebook grid lines |

### Typography (Google Fonts)

- **Display / headings:** **EB Garamond** (transitional serif). H1 hero `clamp(2.5rem, 6vw, 4.5rem)`; section H2 `clamp(1.5rem, 3vw, 1.9rem)`. Line-height **1.3**.
- **Body / UI:** **Inter**. 16–18px, line-height **1.5**.
- **Mono / data:** **IBM Plex Mono**. Eyebrows, status tags, sign values, metadata; 13–15px, color `--sepia` or `--ink-2`.
- Uppercase eyebrows/labels: letter-spacing **+0.05em**.

### Texture & layout

- Single large parchment sheet feel: `--paper` base + a subtle grain at **5–10%** opacity (CSS — a tiled-but-low SVG/`feTurbulence` noise data-URI or a single large layer; never an obvious repeat).
- Optional faint foxing spots (`--foxing`, 3–5%) for depth, never over text.
- **Notebook grid** (thin `--grid-line`) reserved for the structured "pillars" band only, as a nod to the lab-notebook motif.
- Composition: center-weighted, generous negative space (≥40% breathing room in hero), content column `max-width: 680–720px`, ≥10% page margins, illustrations/elements never bleed to the edge.

## 5. Information Architecture (sections, in DOM order)

A single scrolling page, ~3 viewports, clearly sectioned.

### 5.1 Backdrop (fixed, behind all content)
The paper-airplane flock canvas (see §6). Sits at the same layer the old graph occupied.

### 5.2 Hero (full viewport)
- **Eyebrow** (mono, uppercase, `--ink-2`): `PHAISTOS LABS`
- **Display thesis** (EB Garamond, large, `--ink`): *“We teach machines to read what no one living can.”* `[PLACEHOLDER — refine]`
- **Descriptor** (Inter, `--ink-2`): “A frontier AI lab working where machine intelligence meets the humanities.”
- **Scroll cue** (mono, `--ink-2`): `↓ the mission`

### 5.3 Mission (the drafted temporary statement)
Clean reading column over a solid/near-solid parchment band (flock dims behind for legibility).
- **H2:** `Mission`
- **Body** `[PLACEHOLDER — refine]`:
  > Phaistos Labs builds AI that recovers lost human knowledge. We begin with the undeciphered scripts of the ancient world — reconstructing languages from structure alone, without training data — and treat each decipherment as a step toward a general science of humanistic inference. The work is versioned, falsifiable, and open.

### 5.4 What we do (three structured pillars)
On a subtle notebook-grid band. Three "specimen + label" cards, generous spacing:
- **Recover** — Reconstruct lost languages and knowledge from structure alone.
- **Generalize** — Turn each decipherment into a general method for humanistic inference.
- **Open** — Versioned, falsifiable, and shared.

### 5.5 Focus: Linear A (flagship project → PhaiPhon)
- **H2:** `Our first frontier — Linear A`
- **Body:** “Minoan Linear A is the last major undeciphered script of the Bronze Age Mediterranean. We are reading it — not by analogy or guesswork, but by inducing its sound values from the structure of the world's languages.”
- **Status tag** (mono, on `--paper-deep` pill): `NOT YET DECIPHERED · v0 · OPEN`
- **CTA** (rose pill link → `phaiphon/index.html`): `See the instrument — PhaiPhon →`

### 5.6 Contact
- Secondary text: “Reach us at alvinxyz@stanford.edu, aaronbao@berkeley.edu, or kyriacos@stanford.edu.” (mailto links in `--rose`).

### 5.7 Footer
- Minimal: mono wordmark `PHAISTOS LABS` + year. No heavy chrome.

### 5.8 Navigation (burger)
- Keep the existing top-right burger pattern, **restyled** to parchment (ink lines on paper, no glassmorphism/blur). Dropdown links: **PhaiPhon** (`phaiphon/index.html`). (Approach is future scope; not linked yet.)
- **No Ctrl+K search** on the homepage (the graph it searched is gone).

## 6. Paper-Airplane Flock Backdrop (behavior spec)

A lightweight **2D `<canvas>`** boids simulation — sepia ink paper airplanes drifting across parchment. Replaces Three.js entirely (no WebGL, no bloom).

- **Agents:** ~60 desktop / ~30 mobile (responsive by viewport width). Classic boids: separation, alignment, cohesion + soft edge-wrapping or gentle turn-at-bounds. **Slow** max speed (elegant, not game-like).
- **Glyph:** a small paper-airplane/dart (~12–18px) drawn as thin `--sepia` ink strokes at low opacity (~0.3–0.5). A few "lead" agents tinted `--sage` (sparingly) for life.
- **Flap ("flapping airplanes"):** each agent's two wing-halves rotate a few degrees on a sine wave, phase-offset per agent and slightly coupled to turn rate (banking → faster flap). This is the detail that reads as *alive*, not rigid.
- **Trail:** a short fading polyline behind each agent in its travel direction — echoes the style guide's "butterflies in flight, motion blur" motif.
- **Non-interactive / ambient.** No pointer steering by default (keeps it contemplative, not a toy).
- **Reduced motion:** under `prefers-reduced-motion: reduce`, render a single **static "entomological scatter"** of airplanes (no animation) — itself a named style-guide composition mode.
- **Performance:** single `requestAnimationFrame` loop; pause when `document.hidden`; cap devicePixelRatio at 2; recompute agent count on resize (debounced).

## 7. Technical Approach

- **Vanilla** HTML5 + CSS + JS. **No** build tooling, frameworks, Three.js, or WebGL (matches the no-dependency spirit of the current site, minus the 3D stack).
- **Focused files** (split from the old single 150KB file for maintainability and testability):
  - `index.html` — semantic markup of the sections in §5.
  - `assets/css/site.css` — design-system tokens + layout.
  - `assets/js/flock.js` — boids module. **Pure simulation functions exported** (e.g. `step(agents, opts)`, `separation/alignment/cohesion`) so the vector math is unit-testable headlessly, plus a `Flock` class that owns the canvas/render/RAF loop.
  - `assets/js/main.js` — page init: instantiate the flock, scroll-reveal `IntersectionObserver` (respecting reduced motion), burger toggle.
- **Fonts:** Google Fonts `<link>` for EB Garamond, Inter, IBM Plex Mono (with system fallbacks).
- **Testing strategy:** the boids vector math in `flock.js` is genuinely unit-testable — tested with Node's built-in `node:test` + `node:assert` (zero new dependencies; assumes Node is available). CSS/layout/visual and the RAF render loop are verified manually in a browser against an explicit checklist (this is design work; red-green TDD applies to the pure logic, not to pixels).

## 8. File Structure (after this work)

```
phaistos-labs-site/
├─ index.html                      # NEW parchment homepage (replaces dark one)
├─ assets/
│  ├─ css/site.css                 # NEW design system + layout
│  └─ js/
│     ├─ flock.js                  # NEW boids module (pure fns + Flock class)
│     └─ main.js                   # NEW page init
├─ explore/
│  └─ index.html                   # PRESERVED old homepage (unlinked, paths fixed)
├─ test/
│  └─ flock.test.mjs               # NEW unit tests for boids math
├─ language_data.js                # untouched (used by explore/)
├─ phaiphon/                       # untouched
└─ docs/superpowers/{specs,plans}/ # this spec + the plan
```

## 9. Accessibility & Performance

- Semantic landmarks (`<header> <main> <section> <footer>`), one `<h1>`, logical heading order.
- Color contrast: `--ink` on `--paper` and `--ink-2` on `--paper` meet WCAG AA for their sizes; links `--rose` have non-color affordance (underline on hover/focus) and visible focus rings.
- `prefers-reduced-motion` disables flock animation and scroll-reveal transitions.
- Backdrop canvas is `aria-hidden`; it carries no information.
- No render-blocking heavy assets; fonts `display=swap`.

## 10. Assumptions & Open Questions

- **Assumption (flagged):** removing the interactive graph + Ctrl+K search from the homepage is acceptable; preserved unlinked at `explore/index.html`. (If you actually want it live + linked now, that's Approach 3 and expands scope.)
- **Mission copy and the hero thesis line are placeholders** I drafted; mark for your wording pass.
- Hero thesis candidates to choose among: (a) “We teach machines to read what no one living can.” (b) “Recovering what history left unread.” (c) “The oldest questions deserve the newest machines.”
- Serif choice EB Garamond (vs. Spectral) is a default; easy to swap one token.
