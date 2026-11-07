import "./styles.css";

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function syncMotionPreference(event) {
  document.documentElement.dataset.motion = event.matches ? "reduced" : "full";
}

syncMotionPreference(motionQuery);
motionQuery.addEventListener("change", syncMotionPreference);

const marginalCreatures = document.querySelectorAll(".marginal-creature");

function jiggleCreature(creature) {
  if (motionQuery.matches) return;

  creature.classList.remove("is-jiggling");
  void creature.offsetWidth;
  creature.classList.add("is-jiggling");
}

marginalCreatures.forEach((creature) => {
  creature.addEventListener("pointerdown", () => jiggleCreature(creature));
  creature.addEventListener("click", (event) => {
    if (event.detail === 0) jiggleCreature(creature);
  });
  creature.addEventListener("animationend", () => {
    creature.classList.remove("is-jiggling");
  });
});

const spiralMarkControl = document.querySelector(".spiral-mark-control");

function spinSpiralMark() {
  if (!spiralMarkControl || motionQuery.matches) return;

  spiralMarkControl.classList.remove("is-spinning");
  void spiralMarkControl.offsetWidth;
  spiralMarkControl.classList.add("is-spinning");
}

if (spiralMarkControl) {
  spiralMarkControl.addEventListener("pointerdown", spinSpiralMark);
  spiralMarkControl.addEventListener("click", (event) => {
    if (event.detail === 0) spinSpiralMark();
  });
  spiralMarkControl.addEventListener("animationend", () => {
    spiralMarkControl.classList.remove("is-spinning");
  });
}

// The marginal creatures come alive in place: wing beats, and every few beats the dragon breathes fire. Frames are the
// animations made of these same cutouts (scripts/marginal-sprites.py), loaded after the page so the stills paint first.
// offset: where the still cutout lies in a frame; size: the cutout's own size (the button's box).
const CREATURE_FRAMES = {
  butterfly: { frame: [312, 273], count: 6, fps: 12, offset: [-4, 12], size: [320, 259], flap: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1] },
  dragon: {
    frame: [357, 310], count: 23, fps: 12, offset: [104, -5], size: [258, 320], flap: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    fire: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], fireEvery: [3, 6],
  },
  bird: { frame: [311, 259], count: 12, fps: 11, offset: [-4, -5], size: [320, 267], flap: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
};
const livingCreatures = [];
const heroArt = document.querySelector(".hero-art");
let heroOnScreen = true;
const beatsUntilFire = ([a, b]) => a + Math.floor(Math.random() * (b - a + 1));

function playCreatures(now) {
  if (heroOnScreen && !motionQuery.matches) {
    for (const c of livingCreatures) {
      if (now < c.next) continue;
      c.next = Math.max(c.next + 1000 / c.m.fps, now - 250);
      c.el.style.backgroundPosition = `${(c.seq[c.i] / (c.m.count - 1)) * 100}% 0`;
      if (++c.i < c.seq.length) continue;
      c.i = 0;
      if (c.seq === c.m.fire) { c.seq = c.m.flap; c.untilFire = beatsUntilFire(c.m.fireEvery); }
      else if (c.m.fire && --c.untilFire <= 0) c.seq = c.m.fire;
    }
  }
  requestAnimationFrame(playCreatures);
}

function wakeCreatures() {
  marginalCreatures.forEach((creature) => {
    const name = Object.keys(CREATURE_FRAMES).find((n) => creature.classList.contains(`marginal-creature--${n}`));
    const el = creature.querySelector(".creature-frames");
    if (!name || !el) return;
    const small = window.matchMedia("(max-width: 760px)").matches;   // phones: the half-size sheet
    const m = CREATURE_FRAMES[name], url = `/media/marginalia/${name}-frames${small ? "-sm" : ""}.webp`, sheet = new Image();
    sheet.src = url;
    sheet.decode().then(() => {
      const [fw, fh] = m.frame, [sw, sh] = m.size, [ox, oy] = m.offset;
      Object.assign(el.style, {
        left: `${(-ox / sw) * 100}%`, top: `${(-oy / sh) * 100}%`, width: `${(fw / sw) * 100}%`, height: `${(fh / sh) * 100}%`,
        backgroundImage: `url("${url}")`, backgroundSize: `${m.count * 100}% 100%`, backgroundPosition: "0 0",
      });
      livingCreatures.push({ el, m, seq: m.flap, i: 0, next: 0, untilFire: m.fire ? beatsUntilFire(m.fireEvery) : 0 });
      creature.classList.add("is-animated");
      if (livingCreatures.length === 1) requestAnimationFrame(playCreatures);
    }).catch(() => {});
  });
}

if (heroArt) new IntersectionObserver(([e]) => { heroOnScreen = e.isIntersecting; }).observe(heroArt);
const whenIdle = (fn) => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 300));
if (document.readyState === "complete") whenIdle(wakeCreatures);
else window.addEventListener("load", () => whenIdle(wakeCreatures), { once: true });
