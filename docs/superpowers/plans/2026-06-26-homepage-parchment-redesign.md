# Homepage Parchment Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Phaistos Labs homepage on the parchment/naturalist style guide, with a 2D-canvas paper-airplane flock backdrop replacing the dark Three.js neural graph.

**Architecture:** A static, dependency-free homepage: semantic `index.html`, a design-system stylesheet `assets/css/site.css`, and two ES modules — `assets/js/flock.js` (pure boids simulation + a `Flock` canvas renderer) and `assets/js/main.js` (page wiring). The current dark homepage is preserved unlinked at `explore/index.html`. Pure simulation math is unit-tested with Node's built-in test runner; layout/render is verified in a browser.

**Tech Stack:** Vanilla HTML5, CSS (custom properties), ES modules. No frameworks, no build step, no Three.js/WebGL. Node `node:test` for unit tests. Google Fonts (EB Garamond, Inter, IBM Plex Mono).

## Global Constraints

*Every task's requirements implicitly include this section. Exact values are binding.*

- **Repo / branch:** Work in `/Users/aaronbao/Developer/phaistos-labs-site` on branch `redesign/homepage-parchment` (already created, off `master`).
- **No new runtime dependencies.** No frameworks, bundlers, or CDNs except Google Fonts. No Three.js/WebGL on the homepage. Only dev tool is Node's built-in test runner.
- **Root `package.json` must contain** `"type": "module"` so `assets/js/flock.js` (a `.js` file using ES `export`) imports correctly under Node. Scripts: `"test": "node --test"`.
- **Color tokens (exact hex), defined once on `:root`:** `--paper:#E2DDD4` `--paper-deep:#D8D1C4` `--foxing:#C4B8A5` `--ink:#1A1A1A` `--ink-2:#5A5A58` `--sage:#7A9A7E` `--sage-deep:#5C7E60` `--rose:#B0737A` `--ochre:#C4A85C` `--sepia:#7A5C3C` `--highlight:#F5D76E` `--grid-line:#D0CAC0`.
- **Never use `#000` or `#fff` for text/background.** Text primary `--ink`; surfaces `--paper`/`--paper-deep`.
- **Fonts:** display/headings = `'EB Garamond'` serif; body/UI = `'Inter'`; mono/labels = `'IBM Plex Mono'`. Loaded via Google Fonts with `display=swap`. System fallbacks in the font stack.
- **Type rules:** body line-height 1.5–1.6; heading line-height ≤1.3; uppercase eyebrows/labels letter-spacing ≥0.05em.
- **Accessibility:** exactly one `<h1>`; semantic landmarks (`<header> <main> <section> <footer>`); the flock `<canvas>` is `aria-hidden="true"`; visible `:focus-visible` outlines; links keep a non-color affordance.
- **Reduced motion (`prefers-reduced-motion: reduce`):** the flock renders a single static scatter (no animation loop); `[data-reveal]` elements are visible immediately (no transition).
- **Performance:** cap `devicePixelRatio` usage at 2; pause the flock loop on `document.hidden`; debounce `resize`.
- **Links:** burger menu links to `phaiphon/index.html`. No Ctrl+K search on the homepage.
- **Verbatim copy (use exactly; these are approved placeholders):**
  - Eyebrow: `Phaistos Labs`
  - Hero `<h1>`: `We teach machines to read what no one living can.`
  - Hero descriptor: `A frontier AI lab working where machine intelligence meets the humanities.`
  - Scroll cue: `↓ the mission`
  - Mission heading: `Mission`
  - Mission body: `Phaistos Labs builds AI that recovers lost human knowledge. We begin with the undeciphered scripts of the ancient world — reconstructing languages from structure alone, without training data — and treat each decipherment as a step toward a general science of humanistic inference. The work is versioned, falsifiable, and open.`
  - Pillars heading: `What we do`; pillars: `Recover` / `Reconstruct lost languages and knowledge from structure alone.` · `Generalize` / `Turn each decipherment into a general method for humanistic inference.` · `Open` / `Versioned, falsifiable, and shared.`
  - Focus heading: `Our first frontier — Linear A`
  - Focus body: `Minoan Linear A is the last major undeciphered script of the Bronze Age Mediterranean. We are reading it — not by analogy or guesswork, but by inducing its sound values from the structure of the world's languages.`
  - Status tag: `NOT YET DECIPHERED · v0 · OPEN`
  - CTA: `See the instrument — PhaiPhon →` (links to `phaiphon/index.html`)
  - Contact: `Reach us at alvinxyz@stanford.edu, aaronbao@berkeley.edu, or kyriacos@stanford.edu.` (each email a `mailto:` link)
  - Footer: `Phaistos Labs · 2026`

## File Structure (after this work)

```
phaistos-labs-site/
├─ package.json                    # NEW {"type":"module","scripts":{"test":"node --test"}}
├─ index.html                      # REPLACED: parchment homepage
├─ assets/css/site.css             # NEW design system + layout
├─ assets/js/flock.js              # NEW boids: pure fns + Flock renderer
├─ assets/js/main.js               # NEW page init/wiring
├─ explore/index.html              # NEW preserved old homepage (unlinked, paths fixed)
├─ test/flock.test.mjs             # NEW unit + smoke tests
├─ language_data.js                # untouched (used by explore/)
└─ phaiphon/                       # untouched
```

**Interface contract across tasks (selectors & exports):**
- `flock.js` exports pure fns `length, normalize, limit, separation, alignment, cohesion, neighbors, step, computeAgentCount, createAgents` and class `Flock` (`new Flock(canvas, { reducedMotion })`, methods `start() stop() resize() render() renderStatic()`).
- `index.html` provides DOM ids: `#flock-canvas`, `#nav-toggle`, `#nav-menu`, and `[data-reveal]` elements; CSS classes from `site.css`.
- `main.js` imports `Flock` from `./flock.js` and queries the ids above.

---

### Task 1: Preserve current homepage as `explore/index.html`

**Files:**
- Create: `explore/index.html` (copy of current `index.html`, two paths rewritten)

**Interfaces:**
- Consumes: nothing.
- Produces: a working unlinked archive of the dark homepage. Nothing later depends on it.

- [ ] **Step 1: Copy the current homepage into `explore/`**

```bash
cd /Users/aaronbao/Developer/phaistos-labs-site
mkdir -p explore
cp index.html explore/index.html
```

- [ ] **Step 2: Rewrite the two sibling-relative references for the new depth**

In `explore/index.html` make exactly these two replacements (the file now lives one directory deeper):
- `src="language_data.js"` → `src="../language_data.js"`
- `href="phaiphon/index.html"` → `href="../phaiphon/index.html"`

Leave the three `mailto:` links and all `https://` CDN URLs unchanged.

- [ ] **Step 3: Verify no stale sibling-relative refs remain and targets resolve**

Run:
```bash
cd /Users/aaronbao/Developer/phaistos-labs-site
# Should print the two rewritten refs, each with ../
grep -noE '(src|href)="(\.\./)?(language_data\.js|phaiphon/index\.html)"' explore/index.html
# Should find NO bare (non-../) sibling refs:
grep -nE '(src="language_data\.js"|href="phaiphon/index\.html")' explore/index.html && echo "FAIL: bare ref remains" || echo "OK: no bare sibling refs"
# Targets exist relative to explore/ :
test -f explore/../language_data.js && echo "OK language_data.js" || echo "FAIL language_data.js"
test -f explore/../phaiphon/index.html && echo "OK phaiphon" || echo "FAIL phaiphon"
```
Expected: the first grep prints both `../`-prefixed refs; the second prints `OK: no bare sibling refs`; both `test` lines print `OK`.

- [ ] **Step 4: Manual browser check (note in report)**

Open `explore/index.html` in a browser (`open explore/index.html`); confirm the 3D language graph renders and the page's PhaiPhon menu link points at `../phaiphon/index.html`. Record the result in the report. (This is preservation only — do not restyle it.)

- [ ] **Step 5: Commit**

```bash
cd /Users/aaronbao/Developer/phaistos-labs-site
git add explore/index.html
git commit -m "chore(explore): preserve dark homepage as unlinked /explore archive"
```

---

### Task 2: Boids simulation core + unit tests

**Files:**
- Create: `package.json`
- Create: `assets/js/flock.js` (pure functions only in this task)
- Test: `test/flock.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces (exact signatures later tasks rely on):
  - `length({x,y}) -> number`, `normalize({x,y}) -> {x,y}`, `limit({x,y}, max) -> {x,y}`
  - `separation(agent, neighbors, {separationRadius, maxForce}) -> {x,y}`
  - `alignment(agent, neighbors, {maxForce}) -> {x,y}`
  - `cohesion(agent, neighbors, {maxForce}) -> {x,y}`
  - `neighbors(agent, agents, perceptionRadius) -> agent[]`
  - `step(agents, opts) -> agents` (mutates in place; `opts`: `{width,height,perceptionRadius,separationRadius,maxForce,maxSpeed,flapSpeed,weights:{separation,alignment,cohesion}}`)
  - `computeAgentCount(width) -> number`
  - `createAgents(count, width, height, rng=Math.random) -> agent[]` where agent = `{x,y,vx,vy,heading,flap,lead,trail:[]}`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "phaistos-labs-site",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
```

- [ ] **Step 2: Write the failing tests**

Create `test/flock.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  length, normalize, limit, separation, alignment, cohesion,
  neighbors, step, computeAgentCount, createAgents,
} from '../assets/js/flock.js';

test('length computes euclidean magnitude', () => {
  assert.equal(length({ x: 3, y: 4 }), 5);
});

test('normalize returns unit vector; zero stays zero', () => {
  assert.deepEqual(normalize({ x: 0, y: 5 }), { x: 0, y: 1 });
  assert.deepEqual(normalize({ x: 0, y: 0 }), { x: 0, y: 0 });
});

test('limit caps magnitude, leaves shorter vectors unchanged', () => {
  assert.ok(Math.abs(length(limit({ x: 3, y: 4 }, 2.5)) - 2.5) < 1e-9);
  assert.deepEqual(limit({ x: 1, y: 0 }, 5), { x: 1, y: 0 });
});

test('separation steers away from a close neighbor', () => {
  const a = { x: 10, y: 10, vx: 0, vy: 0 };
  const f = separation(a, [{ x: 12, y: 10, vx: 0, vy: 0 }], { separationRadius: 5, maxForce: 1 });
  assert.ok(f.x < 0, 'pushes left, away from neighbor on the right');
});

test('alignment steers toward average neighbor velocity', () => {
  const f = alignment({ x: 0, y: 0, vx: 0, vy: 0 }, [{ vx: 1, vy: 0 }, { vx: 1, vy: 0 }], { maxForce: 1 });
  assert.ok(f.x > 0);
});

test('cohesion steers toward neighbor centroid', () => {
  const f = cohesion({ x: 0, y: 0, vx: 0, vy: 0 }, [{ x: 10, y: 0 }, { x: 10, y: 0 }], { maxForce: 1 });
  assert.ok(f.x > 0);
});

test('empty neighbor lists yield zero force', () => {
  const a = { x: 0, y: 0, vx: 1, vy: 1 };
  assert.deepEqual(alignment(a, [], { maxForce: 1 }), { x: 0, y: 0 });
  assert.deepEqual(cohesion(a, [], { maxForce: 1 }), { x: 0, y: 0 });
  assert.deepEqual(separation(a, [], { separationRadius: 5, maxForce: 1 }), { x: 0, y: 0 });
});

test('neighbors excludes self and far agents', () => {
  const a = { x: 0, y: 0 };
  assert.equal(neighbors(a, [a, { x: 1, y: 0 }, { x: 100, y: 0 }], 10).length, 1);
});

test('step keeps agents in bounds via toroidal wrap', () => {
  const opts = baseOpts(50, 50);
  const agents = createAgents(8, 50, 50, mulberry32(1));
  for (let i = 0; i < 300; i++) step(agents, opts);
  for (const a of agents) {
    assert.ok(a.x >= 0 && a.x < 50, `x in bounds: ${a.x}`);
    assert.ok(a.y >= 0 && a.y < 50, `y in bounds: ${a.y}`);
  }
});

test('step never exceeds maxSpeed', () => {
  const opts = baseOpts(200, 200);
  const agents = createAgents(20, 200, 200, mulberry32(2));
  for (let i = 0; i < 100; i++) step(agents, opts);
  for (const a of agents) assert.ok(length({ x: a.vx, y: a.vy }) <= opts.maxSpeed + 1e-9);
});

test('computeAgentCount scales with viewport width', () => {
  assert.equal(computeAgentCount(375), 24);
  assert.equal(computeAgentCount(800), 40);
  assert.equal(computeAgentCount(1440), 60);
});

test('createAgents is deterministic given a seeded rng', () => {
  const a = createAgents(5, 100, 100, mulberry32(42));
  const b = createAgents(5, 100, 100, mulberry32(42));
  assert.deepEqual(a.map((p) => [p.x, p.y]), b.map((p) => [p.x, p.y]));
});

function baseOpts(width, height) {
  return {
    width, height, perceptionRadius: 30, separationRadius: 14,
    maxForce: 0.05, maxSpeed: 1.2, flapSpeed: 0.2,
    weights: { separation: 1.5, alignment: 1.0, cohesion: 0.9 },
  };
}
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `cd /Users/aaronbao/Developer/phaistos-labs-site && node --test test/flock.test.mjs`
Expected: FAIL — cannot import from `../assets/js/flock.js` (module not found / exports undefined).

- [ ] **Step 4: Implement the pure simulation module**

Create `assets/js/flock.js`:

```js
// 2D boids flock of paper airplanes.
// Pure simulation functions (exported, unit-tested). The Flock renderer
// class is added in Task 3 and owns the canvas + animation loop.

export function length(v) {
  return Math.hypot(v.x, v.y);
}

export function normalize(v) {
  const len = length(v);
  if (len === 0) return { x: 0, y: 0 };
  return { x: v.x / len, y: v.y / len };
}

export function limit(v, max) {
  const len = length(v);
  if (len > max && len > 0) {
    const s = max / len;
    return { x: v.x * s, y: v.y * s };
  }
  return { x: v.x, y: v.y };
}

export function separation(agent, neighborList, { separationRadius, maxForce }) {
  let sx = 0, sy = 0, count = 0;
  for (const o of neighborList) {
    const dx = agent.x - o.x;
    const dy = agent.y - o.y;
    const d = Math.hypot(dx, dy);
    if (d > 0 && d < separationRadius) {
      sx += dx / (d * d); // weight by inverse distance
      sy += dy / (d * d);
      count++;
    }
  }
  if (count === 0) return { x: 0, y: 0 };
  return limit({ x: sx, y: sy }, maxForce);
}

export function alignment(agent, neighborList, { maxForce }) {
  if (neighborList.length === 0) return { x: 0, y: 0 };
  let vx = 0, vy = 0;
  for (const o of neighborList) { vx += o.vx; vy += o.vy; }
  vx /= neighborList.length;
  vy /= neighborList.length;
  return limit({ x: vx - agent.vx, y: vy - agent.vy }, maxForce);
}

export function cohesion(agent, neighborList, { maxForce }) {
  if (neighborList.length === 0) return { x: 0, y: 0 };
  let cx = 0, cy = 0;
  for (const o of neighborList) { cx += o.x; cy += o.y; }
  cx /= neighborList.length;
  cy /= neighborList.length;
  return limit({ x: cx - agent.x, y: cy - agent.y }, maxForce);
}

export function neighbors(agent, agents, perceptionRadius) {
  const out = [];
  for (const o of agents) {
    if (o === agent) continue;
    if (Math.hypot(agent.x - o.x, agent.y - o.y) < perceptionRadius) out.push(o);
  }
  return out;
}

export function step(agents, opts) {
  const { width, height, perceptionRadius, separationRadius, maxForce, maxSpeed, flapSpeed, weights } = opts;
  // Snapshot forces first so iteration order does not bias the result.
  const forces = agents.map((a) => {
    const nb = neighbors(a, agents, perceptionRadius);
    const sep = separation(a, nb, { separationRadius, maxForce });
    const ali = alignment(a, nb, { maxForce });
    const coh = cohesion(a, nb, { maxForce });
    return {
      x: sep.x * weights.separation + ali.x * weights.alignment + coh.x * weights.cohesion,
      y: sep.y * weights.separation + ali.y * weights.alignment + coh.y * weights.cohesion,
    };
  });
  for (let i = 0; i < agents.length; i++) {
    const a = agents[i];
    a.vx += forces[i].x;
    a.vy += forces[i].y;
    const v = limit({ x: a.vx, y: a.vy }, maxSpeed);
    a.vx = v.x;
    a.vy = v.y;
    a.x += a.vx;
    a.y += a.vy;
    if (a.x < 0) a.x += width; else if (a.x >= width) a.x -= width;
    if (a.y < 0) a.y += height; else if (a.y >= height) a.y -= height;
    a.heading = Math.atan2(a.vy, a.vx);
    a.flap = (a.flap ?? 0) + flapSpeed * (1 + length(forces[i]) * 4);
  }
  return agents;
}

export function computeAgentCount(width) {
  if (width < 600) return 24;
  if (width < 1000) return 40;
  return 60;
}

export function createAgents(count, width, height, rng = Math.random) {
  const agents = [];
  for (let i = 0; i < count; i++) {
    const angle = rng() * Math.PI * 2;
    const speed = 0.4 + rng() * 0.4;
    agents.push({
      x: rng() * width,
      y: rng() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      heading: angle,
      flap: rng() * Math.PI * 2,
      lead: i % 12 === 0, // ~1 in 12 is a sage-tinted "lead" agent
      trail: [],
    });
  }
  return agents;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd /Users/aaronbao/Developer/phaistos-labs-site && node --test test/flock.test.mjs`
Expected: PASS — all 12 tests pass, output pristine.

- [ ] **Step 6: Commit**

```bash
cd /Users/aaronbao/Developer/phaistos-labs-site
git add package.json assets/js/flock.js test/flock.test.mjs
git commit -m "feat(flock): boids simulation core with unit tests"
```

---

### Task 3: Flock canvas renderer

**Files:**
- Modify: `assets/js/flock.js` (append `Flock` class + private draw helpers)
- Test: `test/flock.test.mjs` (append a smoke test block)

**Interfaces:**
- Consumes: `step`, `computeAgentCount`, `createAgents`, `length` from Task 2.
- Produces: `class Flock` — `new Flock(canvas, { reducedMotion? })`; methods `start()`, `stop()`, `resize()`, `render()`, `renderStatic()`. Used by `main.js` (Task 6).

- [ ] **Step 1: Write the failing smoke tests (append to `test/flock.test.mjs`)**

Append this block to the end of `test/flock.test.mjs`:

```js
// --- Flock renderer smoke tests (headless, stubbed browser globals) ---
globalThis.window = { devicePixelRatio: 1, innerWidth: 1200, innerHeight: 800 };
globalThis.matchMedia = () => ({ matches: false });
globalThis.requestAnimationFrame = () => 1;
globalThis.cancelAnimationFrame = () => {};

const { Flock } = await import('../assets/js/flock.js');

function fakeCanvas() {
  const calls = { clearRect: 0, beginPath: 0, stroke: 0, moveTo: 0, lineTo: 0, save: 0, restore: 0 };
  const ctx = new Proxy({}, {
    get(_t, prop) {
      if (prop in calls) return () => { calls[prop]++; };
      return () => {};
    },
  });
  return { clientWidth: 1200, clientHeight: 800, width: 0, height: 0, getContext: () => ctx, _calls: calls, _ctx: ctx };
}

test('Flock sizes the canvas backing store by dpr (capped at 2)', () => {
  globalThis.window.devicePixelRatio = 3;
  const c = fakeCanvas();
  const f = new Flock(c);
  assert.equal(c.width, 1200 * 2, 'dpr capped at 2');
  assert.equal(c.height, 800 * 2);
  globalThis.window.devicePixelRatio = 1;
  f.stop();
});

test('Flock populates agents from viewport width', () => {
  const f = new Flock(fakeCanvas());
  assert.equal(f.agents.length, computeAgentCount(1200));
  f.stop();
});

test('renderStatic draws every agent exactly once and clears first', () => {
  const c = fakeCanvas();
  const f = new Flock(c);
  c._calls.clearRect = 0; c._calls.save = 0;
  f.renderStatic();
  assert.equal(c._calls.clearRect, 1, 'clears once');
  assert.equal(c._calls.save, f.agents.length, 'one save() per glyph, no trails');
});

test('reduced motion: start() does not run a loop', () => {
  const c = fakeCanvas();
  const f = new Flock(c, { reducedMotion: true });
  f.start();
  assert.equal(f.running, false, 'no animation loop under reduced motion');
  assert.ok(c._calls.clearRect >= 1, 'still painted a static frame');
  f.stop();
});
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `cd /Users/aaronbao/Developer/phaistos-labs-site && node --test test/flock.test.mjs`
Expected: the four new tests FAIL (`Flock` is not exported yet); the 12 Task-2 tests still pass.

- [ ] **Step 3: Append the `Flock` renderer to `assets/js/flock.js`**

Append to `assets/js/flock.js`:

```js
const DEFAULT_OPTS = {
  perceptionRadius: 64,
  separationRadius: 26,
  maxForce: 0.04,
  maxSpeed: 1.1,
  flapSpeed: 0.18,
  weights: { separation: 1.6, alignment: 1.0, cohesion: 0.9 },
  size: 11,                                 // glyph half-length (px)
  trailLength: 8,
  inkColor: 'rgba(122, 92, 60, 0.42)',      // --sepia, low opacity
  leadColor: 'rgba(122, 154, 126, 0.55)',   // --sage
};

export class Flock {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.opts = { ...DEFAULT_OPTS, ...options };
    this.agents = [];
    this.running = false;
    this.rafId = null;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.reducedMotion = options.reducedMotion
      ?? (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
    this.resize();
  }

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.width = w;
    this.height = h;
    this.canvas.width = Math.floor(w * this.dpr);
    this.canvas.height = Math.floor(h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.agents = createAgents(computeAgentCount(w), w, h);
  }

  start() {
    if (this.reducedMotion) { this.renderStatic(); return; }
    if (this.running) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      step(this.agents, { ...this.opts, width: this.width, height: this.height });
      this.render();
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const a of this.agents) {
      this._updateTrail(a);
      this._drawTrail(a);
      this._drawGlyph(a);
    }
  }

  renderStatic() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const a of this.agents) this._drawGlyph(a); // scatter: glyphs only, no trails
  }

  _updateTrail(a) {
    a.trail.push({ x: a.x, y: a.y });
    if (a.trail.length > this.opts.trailLength) a.trail.shift();
  }

  _drawTrail(a) {
    const { ctx, opts } = this;
    if (a.trail.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(a.trail[0].x, a.trail[0].y);
    for (let i = 1; i < a.trail.length; i++) {
      const prev = a.trail[i - 1];
      const cur = a.trail[i];
      // do not draw the segment that jumps across a toroidal wrap
      if (Math.hypot(cur.x - prev.x, cur.y - prev.y) > opts.perceptionRadius) ctx.moveTo(cur.x, cur.y);
      else ctx.lineTo(cur.x, cur.y);
    }
    ctx.strokeStyle = a.lead ? opts.leadColor : opts.inkColor;
    ctx.globalAlpha = 0.25;
    ctx.lineWidth = 0.6;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  _drawGlyph(a) {
    const { ctx, opts } = this;
    const s = opts.size;
    const flap = Math.sin(a.flap) * 0.5 + 0.5;     // 0..1 wing fold
    const wingY = s * (0.5 + 0.35 * flap);
    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.rotate(a.heading);
    ctx.strokeStyle = a.lead ? opts.leadColor : opts.inkColor;
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(s, 0);             // nose
    ctx.lineTo(-s, -wingY);       // upper wing tip
    ctx.lineTo(-s * 0.45, 0);     // tail notch / center crease
    ctx.lineTo(-s, wingY);        // lower wing tip
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();              // center crease
    ctx.moveTo(s, 0);
    ctx.lineTo(-s * 0.45, 0);
    ctx.stroke();
    ctx.restore();
  }
}
```

- [ ] **Step 4: Run tests to verify all pass**

Run: `cd /Users/aaronbao/Developer/phaistos-labs-site && node --test test/flock.test.mjs`
Expected: PASS — all 16 tests pass, output pristine.

- [ ] **Step 5: Commit**

```bash
cd /Users/aaronbao/Developer/phaistos-labs-site
git add assets/js/flock.js test/flock.test.mjs
git commit -m "feat(flock): canvas renderer with wing-flap glyphs, trails, reduced-motion scatter"
```

---

### Task 4: Design-system stylesheet

**Files:**
- Create: `assets/css/site.css`

**Interfaces:**
- Consumes: nothing.
- Produces: `:root` tokens and the classes consumed by `index.html` (Task 5): `.wrap .section .eyebrow .hero .hero__title .hero__desc .hero__scroll .mission .section__title .lead .pillars .pillars__grid .pillar .focus .status-tag .cta .contact .site-footer .nav-toggle .nav-toggle__bars .nav-menu` and `[data-reveal]` / `.is-visible`, plus `.flock-canvas`.

This is a styling task; verification is by reading the file against the constraints and a browser check in Task 5/6. There is no automated test. Do NOT add a placeholder test.

- [ ] **Step 1: Create `assets/css/site.css`**

```css
/* Phaistos Labs — parchment design system */

:root {
  --paper: #E2DDD4;
  --paper-deep: #D8D1C4;
  --foxing: #C4B8A5;
  --ink: #1A1A1A;
  --ink-2: #5A5A58;
  --sage: #7A9A7E;
  --sage-deep: #5C7E60;
  --rose: #B0737A;
  --ochre: #C4A85C;
  --sepia: #7A5C3C;
  --highlight: #F5D76E;
  --grid-line: #D0CAC0;

  --serif: 'EB Garamond', Georgia, 'Times New Roman', serif;
  --sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --mono: 'IBM Plex Mono', 'SF Mono', Menlo, Consolas, monospace;

  --measure: 42rem;
  --pad: clamp(1.5rem, 5vw, 4rem);
}

* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  background-color: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  font-size: clamp(1rem, 0.95rem + 0.3vw, 1.125rem);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Subtle parchment grain + foxing — single fixed layer, never an obvious tile. */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background-color: var(--paper);
  background-image:
    radial-gradient(circle at 18% 28%, rgba(196,184,165,0.10), transparent 42%),
    radial-gradient(circle at 82% 72%, rgba(196,184,165,0.08), transparent 46%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  background-size: cover, cover, 220px 220px;
}

.flock-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  display: block;
  pointer-events: none;
}

/* Layout primitives */
.wrap { max-width: var(--measure); margin-inline: auto; padding-inline: var(--pad); }
.section { padding-block: clamp(4rem, 10vh, 8rem); position: relative; }

/* Typography */
h1, h2, h3 { font-family: var(--serif); font-weight: 500; line-height: 1.25; color: var(--ink); margin-top: 0; }
.eyebrow { font-family: var(--mono); font-size: 0.8125rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-2); margin: 0; }
.section__title { font-size: clamp(1.5rem, 3vw, 2rem); margin: 0 0 1.5rem; }
.lead { font-size: 1.125rem; }
p { margin: 0 0 1.25rem; }
a { color: var(--rose); text-underline-offset: 0.18em; }
a:hover, a:focus-visible { color: var(--sage-deep); }
:focus-visible { outline: 2px solid var(--sage-deep); outline-offset: 3px; border-radius: 2px; }

/* Hero */
.hero { min-height: 100svh; display: flex; flex-direction: column; justify-content: center; }
.hero__title { font-size: clamp(2.5rem, 6vw, 4.5rem); margin: 0.5rem 0 1.25rem; max-width: 18ch; }
.hero__desc { font-size: clamp(1.05rem, 1rem + 0.6vw, 1.375rem); color: var(--ink-2); max-width: 40ch; margin: 0; }
.hero__scroll { margin: auto 0 0; padding-top: 3rem; font-family: var(--mono); font-size: 0.8125rem; letter-spacing: 0.08em; color: var(--ink-2); }

/* Mission — near-solid parchment band so text reads over the flock */
.mission { background: color-mix(in srgb, var(--paper) 90%, transparent); }

/* Pillars on a lab-notebook grid */
.pillars {
  background-color: var(--paper-deep);
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 2rem 2rem;
}
.pillars__grid { display: grid; gap: 2.5rem; grid-template-columns: 1fr; }
@media (min-width: 720px) { .pillars__grid { grid-template-columns: repeat(3, 1fr); } }
.pillar h3 { font-size: 1.5rem; margin: 0 0 0.5rem; color: var(--sage-deep); }
.pillar p { color: var(--ink-2); margin: 0; }

/* Focus / Linear A */
.status-tag {
  display: inline-block; font-family: var(--mono); font-size: 0.75rem; letter-spacing: 0.12em;
  color: var(--sepia); background: var(--paper-deep); border: 1px solid var(--foxing);
  padding: 0.4rem 0.7rem; border-radius: 999px; margin: 1rem 0 1.5rem;
}
.cta {
  display: inline-block; font-family: var(--sans); font-weight: 500; color: var(--paper);
  background: var(--rose); text-decoration: none; padding: 0.7rem 1.25rem; border-radius: 999px;
  transition: background 0.2s ease;
}
.cta:hover, .cta:focus-visible { background: var(--sage-deep); color: var(--paper); }

/* Contact + footer */
.contact p { color: var(--ink-2); }
.site-footer {
  padding: 2rem var(--pad); font-family: var(--mono); font-size: 0.75rem;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-2);
}

/* Burger nav */
.nav-toggle {
  position: fixed; top: 1.25rem; right: 1.25rem; z-index: 30; width: 42px; height: 42px;
  border-radius: 50%; background: color-mix(in srgb, var(--paper) 85%, transparent);
  border: 1px solid var(--foxing); cursor: pointer; display: grid; place-items: center; padding: 0;
}
.nav-toggle__bars, .nav-toggle__bars::before, .nav-toggle__bars::after {
  content: ''; display: block; width: 18px; height: 1.5px; background: var(--ink);
}
.nav-toggle__bars { position: relative; }
.nav-toggle__bars::before { position: absolute; top: -5px; }
.nav-toggle__bars::after { position: absolute; top: 5px; }
.nav-menu {
  position: fixed; top: 4.5rem; right: 1.25rem; z-index: 29; display: none; min-width: 160px;
  background: var(--paper); border: 1px solid var(--foxing); border-radius: 8px; padding: 0.5rem;
}
.nav-menu[data-open="true"] { display: block; }
.nav-menu a { display: block; padding: 0.5rem 0.75rem; color: var(--ink); text-decoration: none; font-size: 0.95rem; }
.nav-menu a:hover, .nav-menu a:focus-visible { color: var(--sage-deep); }

/* Scroll reveal */
[data-reveal] { opacity: 0; transform: translateY(16px); transition: opacity 0.8s ease, transform 0.8s ease; }
[data-reveal].is-visible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  [data-reveal] { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 2: Verify token & rule presence (sanity grep)**

Run:
```bash
cd /Users/aaronbao/Developer/phaistos-labs-site
grep -c -- '--paper: #E2DDD4' assets/css/site.css        # 1
grep -c 'EB Garamond' assets/css/site.css                # >=1
grep -c 'prefers-reduced-motion' assets/css/site.css     # 1
grep -Ec '#000|#fff|#ffffff|#000000' assets/css/site.css # 0 (no pure black/white)
```
Expected: `1`, `≥1`, `1`, `0` respectively.

- [ ] **Step 3: Commit**

```bash
cd /Users/aaronbao/Developer/phaistos-labs-site
git add assets/css/site.css
git commit -m "feat(style): parchment design-system stylesheet"
```

---

### Task 5: Homepage markup

**Files:**
- Create: `index.html` (overwrites the current dark homepage on this branch; the original is preserved at `explore/index.html` from Task 1)

**Interfaces:**
- Consumes: classes/tokens from `assets/css/site.css` (Task 4); will load `assets/js/main.js` (Task 6 — until then the page renders without JS behavior, which is expected).
- Produces: DOM ids `#flock-canvas`, `#nav-toggle`, `#nav-menu` and `[data-reveal]` elements that `main.js` (Task 6) queries.

- [ ] **Step 1: Write `index.html`**

Overwrite `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Phaistos Labs — Recovering lost human knowledge</title>
  <meta name="description" content="Phaistos Labs is a frontier AI lab working where machine intelligence meets the humanities, beginning with the undeciphered scripts of the ancient world." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/css/site.css" />
</head>
<body>
  <canvas id="flock-canvas" class="flock-canvas" aria-hidden="true"></canvas>

  <button id="nav-toggle" class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">
    <span class="nav-toggle__bars" aria-hidden="true"></span>
  </button>
  <nav id="nav-menu" class="nav-menu" data-open="false" aria-label="Site">
    <a href="phaiphon/index.html">PhaiPhon</a>
  </nav>

  <main>
    <header class="hero section wrap">
      <p class="eyebrow">Phaistos Labs</p>
      <h1 class="hero__title">We teach machines to read what no one living can.</h1>
      <p class="hero__desc">A frontier AI lab working where machine intelligence meets the humanities.</p>
      <p class="hero__scroll">↓ the mission</p>
    </header>

    <section class="mission section" aria-labelledby="mission-h">
      <div class="wrap" data-reveal>
        <h2 id="mission-h" class="section__title">Mission</h2>
        <p class="lead">Phaistos Labs builds AI that recovers lost human knowledge. We begin with the undeciphered scripts of the ancient world — reconstructing languages from structure alone, without training data — and treat each decipherment as a step toward a general science of humanistic inference. The work is versioned, falsifiable, and open.</p>
      </div>
    </section>

    <section class="pillars section" aria-labelledby="pillars-h">
      <div class="wrap">
        <h2 id="pillars-h" class="section__title">What we do</h2>
        <div class="pillars__grid">
          <article class="pillar" data-reveal>
            <h3>Recover</h3>
            <p>Reconstruct lost languages and knowledge from structure alone.</p>
          </article>
          <article class="pillar" data-reveal>
            <h3>Generalize</h3>
            <p>Turn each decipherment into a general method for humanistic inference.</p>
          </article>
          <article class="pillar" data-reveal>
            <h3>Open</h3>
            <p>Versioned, falsifiable, and shared.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="focus section" aria-labelledby="focus-h">
      <div class="wrap" data-reveal>
        <h2 id="focus-h" class="section__title">Our first frontier — Linear A</h2>
        <p>Minoan Linear A is the last major undeciphered script of the Bronze Age Mediterranean. We are reading it — not by analogy or guesswork, but by inducing its sound values from the structure of the world's languages.</p>
        <p class="status-tag">NOT YET DECIPHERED · v0 · OPEN</p>
        <p><a class="cta" href="phaiphon/index.html">See the instrument — PhaiPhon →</a></p>
      </div>
    </section>

    <section class="contact section" aria-labelledby="contact-h">
      <div class="wrap" data-reveal>
        <h2 id="contact-h" class="section__title">Contact</h2>
        <p>Reach us at <a href="mailto:alvinxyz@stanford.edu">alvinxyz@stanford.edu</a>, <a href="mailto:aaronbao@berkeley.edu">aaronbao@berkeley.edu</a>, or <a href="mailto:kyriacos@stanford.edu">kyriacos@stanford.edu</a>.</p>
      </div>
    </section>
  </main>

  <footer class="site-footer">Phaistos Labs · 2026</footer>

  <script type="module" src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Structural verification (sanity grep)**

Run:
```bash
cd /Users/aaronbao/Developer/phaistos-labs-site
grep -c '<h1' index.html                       # exactly 1
grep -c 'id="flock-canvas"' index.html         # 1
grep -c 'id="nav-toggle"' index.html           # 1
grep -c 'id="nav-menu"' index.html             # 1
grep -c 'data-reveal' index.html               # >=5
grep -c 'assets/css/site.css' index.html       # 1
grep -c 'assets/js/main.js' index.html         # 1
grep -Ec '#000|#fff' index.html                # 0
```
Expected: `1`, `1`, `1`, `1`, `≥5`, `1`, `1`, `0`.

- [ ] **Step 3: Manual browser check (note in report)**

Open `index.html` in a browser. Confirm: parchment background; serif hero headline; the four content sections render with correct copy; nav button visible top-right. (The flock and reveal/nav behavior arrive in Task 6 — JS console will 404 on `main.js` until then; that is expected.)

- [ ] **Step 4: Commit**

```bash
cd /Users/aaronbao/Developer/phaistos-labs-site
git add index.html
git commit -m "feat(home): parchment homepage markup with mission, pillars, focus, contact"
```

---

### Task 6: Page wiring (main.js) + integration

**Files:**
- Create: `assets/js/main.js`

**Interfaces:**
- Consumes: `Flock` from `./flock.js` (Task 3); DOM ids `#flock-canvas`, `#nav-toggle`, `#nav-menu`, `[data-reveal]` from `index.html` (Task 5).
- Produces: the running page (flock backdrop, scroll reveals, working burger menu). Nothing later depends on it.

This is integration wiring against the live DOM; verification is in a browser plus a guard-logic check. There is no headless DOM test harness in this repo — do NOT add a placeholder test.

- [ ] **Step 1: Create `assets/js/main.js`**

```js
// Page initialization: flock backdrop, scroll reveals, burger menu.
import { Flock } from './flock.js';

const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1) Flock backdrop
const canvas = document.getElementById('flock-canvas');
if (canvas) {
  const flock = new Flock(canvas, { reducedMotion: prefersReduced });
  flock.start();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) flock.stop();
    else if (!prefersReduced) flock.start();
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      flock.resize();
      if (prefersReduced) flock.renderStatic();
    }, 200);
  });
}

// 2) Scroll reveal
const revealEls = document.querySelectorAll('[data-reveal]');
if (prefersReduced || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  revealEls.forEach((el) => io.observe(el));
}

// 3) Burger menu
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
if (toggle && menu) {
  const setOpen = (open) => {
    menu.dataset.open = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setOpen(menu.dataset.open !== 'true'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });
}
```

- [ ] **Step 2: Regression — unit tests still green**

Run: `cd /Users/aaronbao/Developer/phaistos-labs-site && node --test test/flock.test.mjs`
Expected: PASS — all 16 tests still pass (this task does not touch `flock.js`, but confirm no accidental breakage).

- [ ] **Step 3: Manual browser verification (note results in report)**

Open `index.html` in a browser and confirm, recording each in the report:
1. Paper airplanes drift across the parchment in a loose flock, slowly, with faint sepia trails; a few are sage-tinted. No console errors.
2. Scrolling reveals each section (fade + rise) once.
3. The burger button opens/closes the menu; `Esc` and outside-click close it; `aria-expanded` toggles. PhaiPhon link navigates to `phaiphon/index.html`.
4. Resize the window — the flock re-fits without errors.
5. In DevTools, emulate `prefers-reduced-motion: reduce` and reload: the flock is a static scatter (no animation) and all sections are visible immediately.

- [ ] **Step 4: Commit**

```bash
cd /Users/aaronbao/Developer/phaistos-labs-site
git add assets/js/main.js
git commit -m "feat(home): wire flock backdrop, scroll reveals, and burger menu"
```
