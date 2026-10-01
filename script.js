const yesArena = document.getElementById("yes-arena");
const yesButton = document.getElementById("yes-button");
const maybeButton = document.getElementById("maybe-button");
const playfulHint = document.getElementById("playful-hint");
const response = document.getElementById("response");
const dateOptions = [...document.querySelectorAll(".date-option")];
const selectionNote = document.getElementById("selection-note");
const noteButton = document.getElementById("note-button");
const sweetNote = document.getElementById("sweet-note");
let selectedVibe = "";
let dodgeCount = 0;
let invitationAccepted = false;

dateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const wasSelected = option.getAttribute("aria-pressed") === "true";
    dateOptions.forEach((item) => item.setAttribute("aria-pressed", "false"));

    if (wasSelected) {
      selectedVibe = "";
      selectionNote.hidden = true;
      return;
    }

    selectedVibe = option.dataset.vibe ?? "";
    option.setAttribute("aria-pressed", "true");
    selectionNote.textContent = `Lovely choice: ${selectedVibe}. We can always change the plan. ♡`;
    selectionNote.hidden = false;
  });
});

noteButton.addEventListener("click", () => {
  const isExpanded = noteButton.getAttribute("aria-expanded") === "true";
  noteButton.setAttribute("aria-expanded", String(!isExpanded));
  sweetNote.hidden = isExpanded;
});

yesArena.addEventListener("pointermove", (event) => {
  const isMousePlay =
    event.pointerType === "mouse" &&
    window.matchMedia("(min-width: 521px) and (prefers-reduced-motion: no-preference)").matches;

  if (!isMousePlay || invitationAccepted || dodgeCount >= 4) {
    return;
  }

  const buttonBounds = yesButton.getBoundingClientRect();
  const pointerIsClose =
    event.clientX >= buttonBounds.left - 10 &&
    event.clientX <= buttonBounds.right + 10 &&
    event.clientY >= buttonBounds.top - 10 &&
    event.clientY <= buttonBounds.bottom + 10;

  if (!pointerIsClose) {
    return;
  }

  const arenaBounds = yesArena.getBoundingClientRect();
  const buttonWidth = yesButton.offsetWidth;
  const buttonHeight = yesButton.offsetHeight;
  const maxX = Math.max(0, arenaBounds.width - buttonWidth);
  const maxY = Math.max(0, arenaBounds.height - buttonHeight);
  const left = Math.round(Math.random() * maxX);
  const top = Math.round(Math.random() * maxY);

  dodgeCount += 1;
  yesButton.style.left = `${left}px`;
  yesButton.style.top = `${top}px`;
  playfulHint.textContent =
    dodgeCount === 4 ? "Okay, you caught me! I’ll stay put now. ♡" : "Hehe, catch me if you can! ♡";
  playfulHint.hidden = false;
});

yesButton.addEventListener("click", () => {
  invitationAccepted = true;
  const plan = selectedVibe
    ? ` We’ll make it a ${selectedVibe.toLowerCase()} kind of evening.`
    : " You pick the day and I’ll plan something lovely.";
  response.textContent = `Yay! I’m looking forward to it.${plan} ♡`;
  response.hidden = false;
  playfulHint.hidden = true;
});

maybeButton.addEventListener("click", () => {
  invitationAccepted = true;
  response.textContent = "Absolutely—another day it is. Let me know when you feel like it. ♡";
  response.hidden = false;
  playfulHint.hidden = true;
});
