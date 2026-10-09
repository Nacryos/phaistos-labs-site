import "./transform-lab.css";

const strip = document.querySelector(".frame-strip");
const previewArt = document.querySelector(".preview-art");
const previewDescription = document.querySelector("#preview-description");
const previewPauseButton = document.querySelector('[data-preview-action="pause"]');
const compareButton = document.querySelector('[data-preview-action="compare"]');
const saveButton = document.querySelector('[data-save-action="save"]');
const revertButton = document.querySelector('[data-save-action="revert"]');
const saveStatus = document.querySelector(".save-status");
const frameCount = 15;
const step = 100 / (frameCount - 1);
const heroLoopDurationMs = 5000;
const savedStateKey = "phaistos-spiral-frame-transforms-v1";

const freshState = () => Array.from({ length: frameCount }, () => ({
  rotation: 0,
  flipX: 1,
  flipY: 1,
}));

let state = freshState();
let savedState = null;
let showingSaved = false;
let previewPaused = false;
let previewFrame = 0;
let previewTimer = null;

function cloneState(source) {
  return source.map((frame) => ({ ...frame }));
}

function validState(candidate) {
  return Array.isArray(candidate)
    && candidate.length === frameCount
    && candidate.every((frame) => Number.isFinite(frame.rotation)
      && [1, -1].includes(frame.flipX)
      && [1, -1].includes(frame.flipY));
}

function loadSavedState() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(savedStateKey));
    return validState(stored?.frames) ? stored : null;
  } catch {
    return null;
  }
}

function describeFrame(frame) {
  const horizontal = frame.flipX === -1 ? "H flip" : "normal H";
  const vertical = frame.flipY === -1 ? "V flip" : "normal V";
  return `${frame.rotation}° · ${horizontal} · ${vertical}`;
}

function renderFrame(index) {
  const card = strip.children[index];
  const frame = state[index];
  const art = card.querySelector(".frame-art");
  const summary = card.querySelector(".frame-state");
  art.style.setProperty("--rotation", `${frame.rotation}deg`);
  art.style.setProperty("--flip-x", frame.flipX);
  art.style.setProperty("--flip-y", frame.flipY);
  summary.textContent = describeFrame(frame);
}

function selectedPreviewState() {
  return showingSaved && savedState ? savedState.frames : state;
}

function renderPreview() {
  const frame = selectedPreviewState()[previewFrame];
  const position = `${(previewFrame * step).toFixed(6)}%`;
  previewArt.style.setProperty("--frame-position", position);
  previewArt.style.setProperty("--rotation", `${frame.rotation}deg`);
  previewArt.style.setProperty("--flip-x", frame.flipX);
  previewArt.style.setProperty("--flip-y", frame.flipY);
}

function startPreview() {
  window.clearInterval(previewTimer);
  if (previewPaused) return;
  previewTimer = window.setInterval(() => {
    previewFrame = (previewFrame + 1) % frameCount;
    renderPreview();
  }, heroLoopDurationMs / frameCount);
}

function updateControls() {
  const hasSaved = Boolean(savedState);
  compareButton.disabled = !hasSaved;
  revertButton.disabled = !hasSaved;
  compareButton.textContent = showingSaved ? "Show working version" : "Compare last saved";
  previewDescription.textContent = showingSaved
    ? "Previewing the version you last saved. Your unsaved edits remain untouched."
    : "Previewing the unsaved working version.";
  previewPauseButton.textContent = previewPaused ? "Play loop" : "Pause loop";

  if (!hasSaved) {
    saveStatus.textContent = "Nothing saved yet. Your frame edits stay in this browser until you save them.";
  } else if (showingSaved) {
    saveStatus.textContent = `Showing the version saved ${savedState.savedAt}.`;
  } else {
    saveStatus.textContent = `Last saved ${savedState.savedAt}. Save again to make your current choices the new final version.`;
  }
}

function renderAll() {
  for (let index = 0; index < frameCount; index += 1) renderFrame(index);
  renderPreview();
  updateControls();
}

function createCard(index) {
  const number = String(index + 1).padStart(2, "0");
  const position = `${(index * step).toFixed(6)}%`;
  const card = document.createElement("article");
  card.className = "frame-card";
  card.innerHTML = `
    <div class="frame-label"><span>Frame ${number}</span><span>${index + 1}/15</span></div>
    <div class="frame-stage"><div class="frame-art" style="--frame-position: ${position}; --rotation: 0deg; --flip-x: 1; --flip-y: 1;"></div></div>
    <div class="frame-controls" aria-label="Frame ${number} controls">
      <button type="button" data-action="rotate-left">Rotate −90°</button>
      <button type="button" data-action="rotate-right">Rotate +90°</button>
      <button type="button" data-action="flip-horizontal">Flip H</button>
      <button type="button" data-action="flip-vertical">Flip V</button>
      <button class="reset" type="button" data-action="reset">Reset frame</button>
    </div>
    <p class="frame-state" aria-live="polite">0° · normal H · normal V</p>
  `;

  card.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const frame = state[index];
    switch (button.dataset.action) {
      case "rotate-left":
        frame.rotation = (frame.rotation + 270) % 360;
        break;
      case "rotate-right":
        frame.rotation = (frame.rotation + 90) % 360;
        break;
      case "flip-horizontal":
        frame.flipX *= -1;
        break;
      case "flip-vertical":
        frame.flipY *= -1;
        break;
      case "reset":
        state[index] = { rotation: 0, flipX: 1, flipY: 1 };
        break;
      default:
        return;
    }
    showingSaved = false;
    renderAll();
  });

  return card;
}

for (let index = 0; index < frameCount; index += 1) {
  strip.append(createCard(index));
}

savedState = loadSavedState();
if (savedState) state = cloneState(savedState.frames);

previewPauseButton.addEventListener("click", () => {
  previewPaused = !previewPaused;
  startPreview();
  updateControls();
});

compareButton.addEventListener("click", () => {
  showingSaved = !showingSaved;
  previewFrame = 0;
  renderPreview();
  updateControls();
});

saveButton.addEventListener("click", () => {
  const savedAt = new Intl.DateTimeFormat(undefined, {
    day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit",
  }).format(new Date());
  savedState = { frames: cloneState(state), savedAt };
  window.localStorage.setItem(savedStateKey, JSON.stringify(savedState));
  showingSaved = false;
  updateControls();
});

revertButton.addEventListener("click", () => {
  if (!savedState) return;
  state = cloneState(savedState.frames);
  showingSaved = false;
  previewFrame = 0;
  renderAll();
});

renderAll();
startPreview();
