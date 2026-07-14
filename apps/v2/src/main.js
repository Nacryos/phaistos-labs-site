import "./styles.css";

const initialStyle = new URLSearchParams(window.location.search).get("initial");
if (initialStyle === "classic" || initialStyle === "elaborate") {
  document.documentElement.dataset.initial = initialStyle;
}

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
