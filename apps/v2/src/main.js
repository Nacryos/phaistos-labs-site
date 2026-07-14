import "./styles.css";

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const loop = document.querySelector(".nature-loop");

function syncMotionPreference(event) {
  const reduceMotion = event.matches;
  document.documentElement.dataset.motion = reduceMotion ? "reduced" : "full";

  if (!loop) return;

  if (reduceMotion || document.hidden) {
    loop.pause();
    return;
  }

  loop.play().catch(() => {
    document.documentElement.dataset.video = "poster";
  });
}

syncMotionPreference(motionQuery);
motionQuery.addEventListener("change", syncMotionPreference);

document.addEventListener("visibilitychange", () => {
  syncMotionPreference(motionQuery);
});

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
