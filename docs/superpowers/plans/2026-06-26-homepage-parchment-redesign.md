# Homepage Parchment Re-theme — Implementation Plan

> Executes the spec `2026-06-26-homepage-parchment-redesign-design.md`. This is in-place surgery on `index.html` (single ~3,829-line static file, inline CSS + inline Three.js). Verification is **visual in a browser** plus greps; there are no unit tests (the inline file is not unit-testable). Each numbered area below ends in a commit.

**Goal:** Re-theme the existing homepage from dark sci-fi to light parchment/ink, keeping the 3D language graph (re-skinned, no glow), keeping its interactions, restructuring the content, and adding a temporary mission statement.

## Global Constraints

- Work in `~/Developer/phaistos-labs-site` on `redesign/homepage-parchment`.
- Tokens (exact hex): `--paper:#E2DDD4 --paper-deep:#D8D1C4 --foxing:#C4B8A5 --ink:#1A1A1A --ink-2:#5A5A58 --sage:#7A9A7E --sage-deep:#5C7E60 --rose:#B0737A --ochre:#C4A85C --sepia:#7A5C3C --highlight:#F5D76E --grid-line:#D0CAC0 --cyan:#4A7A9A`.
- Fonts: EB Garamond (headings), Inter (body), IBM Plex Mono (labels/mono). Never `#000`/`#fff` for text.
- Keep the graph interactive (search, tooltip, leader-labels, graph-info). No paper airplanes. No `explore/`.
- Verify visually after each area; final grep must show no `#000`/`#fff`/`rgba(255,255,255,*)`/`rgba(5,5,7,*)`/`rgba(255,180,120,*)` remain in CSS, and `#000000`/bloom gone from the graph JS.

---

### Task 1: Theme foundation — fonts, `:root` tokens, base

- [ ] **Add fonts.** Replace the Google Fonts `<link>` (currently `family=Inter:wght@300;400;500;600;700`, ~L10) with one that also loads EB Garamond + IBM Plex Mono:
  `https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500;600;700&display=swap`
- [ ] **Insert a `:root` token block** as the first rule inside `<style>` with all tokens above, plus `--serif:'EB Garamond',Georgia,serif; --sans:'Inter',-apple-system,sans-serif; --mono:'IBM Plex Mono','SF Mono',Menlo,monospace;`.
- [ ] **Base:** body `background:#000`→`var(--paper)`, `color:#fff`→`var(--ink)` (L19-20). Add a heading rule so `h1,h2` use `var(--serif)`.
- [ ] **Commit:** `style(theme): parchment :root tokens, serif+mono fonts, parchment base`.
- [ ] **Verify (visual):** page background is parchment, body text dark; graph still loads (will look wrong until Task 2).

### Task 2: Graph re-skin (Three.js → parchment/ink, no glow)

- [ ] **Scene background** (L~2235): `new THREE.Color('#000000')` → `new THREE.Color('#E2DDD4')`.
- [ ] **Remove bloom** (L~2247-2253): delete the `bloomPass` construction and `composer.addPass(bloomPass)`; keep `EffectComposer` + `RenderPass` + `composer.render()` (L~3809). Grep for `bloomPass` and remove any remaining references (e.g. in the resize handler) to avoid ReferenceError.
- [ ] **Node color** (L~2264-2272): force muted ink — replace `new THREE.Color().setHSL(famColor[0], famColor[1], famColor[2])` with `setHSL(famColor[0], 0.30, 0.40)`; remove the `baseColor.lerp(COLOR_CREAM, ...)` line and the `multiplyScalar(brightness)` line (or set `brightness` to a constant ~1.0). Nodes must read as dark earthy ink on parchment.
- [ ] **Per-frame node overdrive** (L~3740): the `multiplyScalar(1 + twinkle*2.5*...)` whitens nodes (invisible on parchment). Reduce the boost factor drastically (e.g. `1 + twinkle*0.15*...`) and drop the `bangBright`/`collapseGlowVal` white-add terms (or scale them ~0). Emphasis comes from opacity/scale, not whitening.
- [ ] **Edges:** `blending: THREE.AdditiveBlending` (L~2539, and any particle line ~2573) → `THREE.NormalBlending`. Edge base color (`setHSL(fc...).multiplyScalar(0.55)`, L~2512) → muted sepia `setHSL(fc[0],0.25,0.42).multiplyScalar(0.9)`. In the edge fragment shader bump `baseAlpha` from `0.24` to ~`0.5` for light-bg visibility.
- [ ] **Edge shader hardcoded colors** (L~2461,2463,2469,2486): replace near-white `vec3(1.0,0.88,0.75)` / `vec3(0.95,0.88,0.8)` / `vec3(1.0,0.98,0.92)` with sepia ink `vec3(0.48,0.36,0.24)`; change the additive bounce term `color += vec3(...)*vBounceGlow` to a subtle darken `color = mix(color, vec3(0.30,0.22,0.14), vBounceGlow)`.
- [ ] **Particles** (L~2566) if reddish: → neutral sepia.
- [ ] **Selection/highlight:** where selected/hovered emphasis is applied, tint toward dusty rose `--rose (#B0737A)` instead of warm orange.
- [ ] **Commit:** `feat(graph): re-skin to parchment/ink — light bg, no bloom, muted nodes, normal-blend sepia edges`.
- [ ] **Verify (visual, iterate):** run the page; nodes legible as muted ink on parchment, edges faint sepia, NO glow/washout, search highlight reads as rose. Tune values across 1-2 iterations until it reads cleanly.

### Task 3: UI chrome re-theme

Convert all dark/white/orange CSS to the parchment palette. Mapping (apply across hero, content gradient, burger menu + dropdown, search toggle/panel/inputs/presets/tags, tooltip, graph-info modal, graph-label shimmer, leader-labels):

- [ ] `#fff`/`#ffffff`/`#eee` text → `var(--ink)`; `#ccc` → `var(--ink-2)`.
- [ ] `rgba(255,255,255,0.55..0.9)` (primary text) → `var(--ink)`; `rgba(255,255,255,0.3..0.5)` (secondary) → `var(--ink-2)`; `rgba(255,255,255,0.04..0.2)` (borders/fills) → `var(--foxing)` or `rgba(122,92,60,0.18)`.
- [ ] Panels `rgba(5,5,7,0.25..0.4)` → `rgba(216,209,196,0.92)` (`--paper-deep`-ish); reduce `backdrop-filter` blur to ≤8px or drop it; borders → `var(--foxing)`.
- [ ] Orange accent `rgba(255,180,120,x)` (L602-604,683-684) → `var(--rose)` (with matching alpha for fills/borders).
- [ ] Tag colors: branch `rgba(120,180,255,x)` → `var(--cyan)`; language `rgba(180,255,160,x)` → `var(--sage)`.
- [ ] Status: `#5c5` (alive) → `var(--sage-deep)`; `#e55` (extinct) → `#9E5A4E` (muted brick).
- [ ] Content overlay gradient endpoints `rgba(0,0,0,*)`/`#000` (L~198-200,235) → parchment (`rgba(226,221,212,*)`/`var(--paper)`).
- [ ] Shadows `rgba(0,0,0,0.5..0.8)` → soften to `rgba(60,40,20,0.12)`.
- [ ] Monospace UI font (`'Courier New','Consolas'`) → `var(--mono)`; leader-text `'SF Mono'...` → `var(--mono)`; leader-text dark text-shadow → light `rgba(226,221,212,0.8)`.
- [ ] **Commit:** `style(chrome): re-theme hero, panels, search, tooltip, labels to parchment`.
- [ ] **Verify (visual + grep):** `grep -nE '#fff|#000|rgba\(255, ?255, ?255|rgba\(5, ?5, ?7|rgba\(255, ?180, ?120' index.html` returns only acceptable cases (ideally none in CSS). All panels/text legible on parchment.

### Task 4: Content restructure + temporary mission

- [ ] **Replace the mission block** (L~850-853: `<h2>Our Mission</h2>` + two `<p>` + `.contact`) with the new structure (placeholder copy):
  - Hero already exists above (`#hero-title`, `#hero-subtitle`) — update subtitle/title copy if desired to the eyebrow + thesis + descriptor (optional this task).
  - `<h2>Mission</h2>` + the temporary statement paragraph.
  - `<h2>What we do</h2>` + three pillars (Recover / Generalize / Open).
  - `<h2>Our first frontier — Linear A</h2>` + (reuse the existing detailed Linear A text) + status tag `NOT YET DECIPHERED · v0 · OPEN` + CTA link `See the instrument — PhaiPhon →` (→ `phaiphon/index.html`).
  - Keep the contact line (three mailto links).
- [ ] Ensure new headings use `var(--serif)` and sections inherit the fade-in animation already on `#content-inner h2/p`.
- [ ] **Commit:** `feat(home): restructure content into mission, pillars, focus, contact`.
- [ ] **Verify (visual):** sections render in order with correct copy, serif headings, readable over the graph backdrop; CTA + mailto links work.

### Final

- [ ] Full visual pass (desktop + mobile width + reduced-motion). Confirm no console errors, graph interactions (search Ctrl+K, hover, select) work in the new theme.
- [ ] Final commit / summary.
