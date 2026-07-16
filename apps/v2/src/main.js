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
