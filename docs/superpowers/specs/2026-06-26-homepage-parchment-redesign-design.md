# Phaistos Labs — Homepage Parchment Re-theme (Design Spec)

**Status:** Draft — pending user review
**Date:** 2026-06-26 (revised after pivot)
**Repo / branch:** `~/Developer/phaistos-labs-site` on `redesign/homepage-parchment`
**Design source:** `~/Documents/Claude/Projects/Phaistos Labs/phaistos-labs-style-guide.md`

> **Revision note.** An earlier version of this spec proposed replacing the 3D graph with a paper-airplane flock. The user reversed that: **keep the 3D language graph, re-skinned to the parchment/ink aesthetic.** This document supersedes that approach entirely. No paper airplanes; no `explore/` archive.

## 1. Goal

Re-theme the existing homepage (`index.html`, a single ~3,829-line static file with inline CSS and an inline Three.js graph) from its current **dark sci-fi** look to the **light parchment / naturalist-scholarly** aesthetic of the style guide, while:
1. **Keeping the 3D phylogenetic language graph** as the centerpiece — re-skinned to parchment/ink (light background, muted earthy-ink nodes, faint sepia edges, **no bloom glow**).
2. **Keeping the graph's interactions** (Ctrl+K search, hover tooltips, selection leader-labels, the graph-info modal) — re-themed, not removed.
3. **Restructuring the page** into clearer high-level sections for an AI lab and adding a short **temporary mission statement**.

## 2. Decisions Locked

- Keep the graph; **re-skin it to parchment/ink** (not dark, not the warm-glow palette).
- Theme + restructure + new mission (all three), in-place on `index.html`.
- No paper-airplane flock. No `explore/` preservation (the graph stays where it is).
- Light/parchment only; no dark mode toggle.
- Keep search/tooltip/leader-labels/graph-info, re-themed.

## 3. Design System (from the style guide)

Introduce a `:root` token block (none exists today — colors are hardcoded) and migrate the theme to it.

| Token | Hex | Role |
|-------|-----|------|
| `--paper` | `#E2DDD4` | Primary surface / scene background |
| `--paper-deep` | `#D8D1C4` | Panels, alternate bands |
| `--foxing` | `#C4B8A5` | Borders, texture |
| `--ink` | `#1A1A1A` | Text primary (never `#000`) |
| `--ink-2` | `#5A5A58` | Secondary text |
| `--sage` | `#7A9A7E` | Signature accent |
| `--sage-deep` | `#5C7E60` | Accent depth / link hover |
| `--rose` | `#B0737A` | Links, CTAs, **graph selection/highlight** |
| `--ochre` | `#C4A85C` | Warm accent, sparing |
| `--sepia` | `#7A5C3C` | Graph nodes/edges base, mono label text, hatching |
| `--highlight` | `#F5D76E` | Callout, very sparing |
| `--grid-line` | `#D0CAC0` | Notebook grid |

**Type:** display/headings = `'EB Garamond'` serif; body/UI = `'Inter'`; mono/labels/transliteration = `'IBM Plex Mono'` (replaces the current Courier New stack). Headings line-height ≤1.3; body ≥1.5; uppercase labels letter-spacing ≥0.05em. Never `#000`/`#fff` for text.

**Surfaces:** replace glassmorphism (`rgba(5,5,7,x)` + heavy blur) with near-solid parchment panels (`--paper-deep`) and `--foxing` hairline borders; keep at most a very light blur. No neon, no glow.

## 4. Graph Re-skin (the hard part)

The current pipeline assumes dark + bloom + bright nodes. The re-skin inverts it:

- **Scene background** `#000000` → `--paper` `#E2DDD4` (Three.js `scene.background`).
- **Remove bloom:** delete `UnrealBloomPass` (and any `bloomPass` references in resize); keep `EffectComposer` + `RenderPass` and `composer.render()`.
- **Nodes:** keep family-hue differentiation but force a **muted, dark** tone so nodes read as earthy tinted ink on parchment — set each family color via `setHSL(hue, ~0.30, ~0.40)` (ignore the original high S/L), drop the lerp-toward-cream, and remove the white-ward brightness boost. Per-frame twinkle/pulse overdrive (which relied on bloom to compress) is neutralized — node color stays dark; emphasis comes from opacity/scale, not whitening.
- **Edges:** `AdditiveBlending` → `NormalBlending`; edge base color = faint `--sepia`; bump base alpha for visibility on light bg; recolor the shader's hardcoded near-white pulse colors (`vec3(1.0,0.88,0.75)` etc.) to sepia/ink; the additive bounce-glow term becomes a subtle sepia darkening, not a white add.
- **Selection / search highlight / hover:** use `--rose` (dusty rose) for the emphasized node/edge state, replacing the warm-orange accent.
- **Particles** (if present): ink/sepia instead of reddish.

This is tuning-heavy and **must be verified visually** (run the page, screenshot, iterate) — not by diff alone. Concrete starting values are in the plan; expect 1–2 visual iterations.

## 5. Content Restructure + Mission

Replace the single dense "Our Mission" block with clearer high-level sections (the graph remains the scrolling backdrop / hero):

1. **Hero** — eyebrow `Phaistos Labs`; serif thesis (placeholder) `We teach machines to read what no one living can.`; descriptor `A frontier AI lab working where machine intelligence meets the humanities.`
2. **Mission** (the temporary statement, placeholder): *“Phaistos Labs builds AI that recovers lost human knowledge. We begin with the undeciphered scripts of the ancient world — reconstructing languages from structure alone, without training data — and treat each decipherment as a step toward a general science of humanistic inference. The work is versioned, falsifiable, and open.”*
3. **What we do** — three pillars: **Recover / Generalize / Open**.
4. **Focus: Linear A** — keep the substance of the existing detailed mission text here; status tag `NOT YET DECIPHERED · v0 · OPEN`; CTA `See the instrument — PhaiPhon →`.
5. **Contact** — the three existing mailto links, re-themed.

Headings → EB Garamond; the content overlay gradient (currently fading to `#000`) fades to `--paper`.

## 6. Out of Scope

- PhaiPhon (`phaiphon/`) restyling. Approach page. Dark mode. Changing graph data / physics / layout. New instruments.

## 7. Verification

- Unit tests: none added (this is in-place UI/graph work on an untestable inline file). Verification is **visual in a browser** + targeted greps that the dark values are gone.
- Acceptance: parchment background everywhere; graph legible as muted ink on parchment with no glow; search/tooltip/leader-labels/graph-info all readable in the new theme; new sections + mission present; no `#000`/`#fff`/`rgba(255,255,255,*)`/`rgba(5,5,7,*)`/orange-accent values remain in the themed CSS; no console errors; `prefers-reduced-motion` still respected by existing animations.

## 8. Assumptions

- Family color-coding is **kept but muted** (earthy ink), not dropped to pure monochrome. (Easy to switch to monochrome sepia if preferred after seeing it.)
- Search and other graph interactions are retained (the graph stays interactive).
- Mission/hero copy are placeholders for the user's wording pass.

## 9. Revision 2 — bold iron-gall ink + headingless manifesto (2026-06-26)

User feedback: the muted-ink graph read as "very faded, not striking." Direction shifted to the **Voynich manuscript**. After rendering three live variants (bold mono iron-gall ink; light ink + color nodes; colored-pigment edges), the user chose **bold iron-gall ink**, then asked to push it "a bit bolder."

- **Graph (shipped):** warm vellum scene background `#E7DEC6`; family palette swapped to a `VOYNICH_PIGMENTS` HSL set (nodes carry pigment, revealed on close inspection); **edges are bold iron-gall brown** `setHSL(0.07, 0.40, 0.18)` with `baseAlpha 0.84` — a dark, dense, near-monochrome ink web (the Voynich pen-drawing look). Node sizes back to original.
- **Content (shipped):** **no headings, no pillar grid** — replaced with four flowing manifesto paragraphs (evocative, minimalist) followed by the status tag, PhaiPhon CTA, and contact line.
- Page chrome (parchment `#E2DDD4`, serif/mono type, panels) unchanged.

## 10. Revision 3 — vivid pigment edges + bolder (2026-06-26)

Further graph tuning on two axes the user selected (boldness + color). The bold mono iron-gall web read as too monochrome; user chose **vivid pigments** and **bolder/denser**. Boldness is achieved via opacity/density (not darkening, which would mute color). Shipped: edges colored per family Voynich pigment, saturated — `_tmpEdgeColor.setHSL(fc[0], 0.62, 0.29)` — at `baseAlpha 0.92`. The web reads as a rich, saturated illuminated-manuscript constellation while staying dense and present. Nodes still carry pigment; warm vellum background `#E7DEC6` retained.

## 11. Revision 4 — nodes as ink blots (2026-06-26)

User asked to make the graph "look more like ink, with ink splats" (Voynich-inspired, per the style guide's pen-and-ink mode). Of the options, the chosen direction was **nodes as ink blots** + inkier lines (background spatter explored but not chosen — reverted to subtle). Shipped: graph nodes converted from sphere meshes to **billboarded `THREE.Sprite`s** using a procedural soft ink-blot `CanvasTexture` (solid core, bleeding edge, randomized rotation), tinted with the Voynich pigment, sized ~2× the old dot. Edges gain subtle along-length alpha variation (`alpha *= 0.88 + 0.12·sin(progress·52)`) so lines read as hand-drawn ink rather than uniform digital strokes. Sprites remain raycastable, so hover/tooltips are preserved (not auto-verifiable headlessly — confirm in-browser). Truly soft, variable-width bleeding strokes remain a deferred larger rework of the line system.
