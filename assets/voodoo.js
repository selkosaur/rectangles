"use strict";
import { theme } from "./theme.js";
import CalClock from "./calclock.js";
import updatePage from "./newtab.js";

let cal = new CalClock("separate", ".display-date", ".clock");
const createGrid = () => {
  for (let i = 0; i < 12 * 12; i++) {
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    document.querySelector(".grid-container").appendChild(gridItem);
  }
};

const minutesSinceMidnight = () => {
  const now = new Date();
  const midnight = new Date().setHours(0, 0, 0, 0);

  return (now - midnight) / 1000 / 60;
};

const fillGrid = () => {
  const minutesPassed = minutesSinceMidnight();

  const fullBlocks = Math.floor(minutesPassed / 10);

  document
    .querySelectorAll(".grid-container .grid-item")
    .forEach((element, index) => {
      if (index + 1 <= fullBlocks) {
        element.classList.add("bg-time-passed");
      } else {
        element.classList.remove("bg-time-passed");
        element.style = "background: transparent";
      }
    });

  const remainderBlock = (minutesPassed % 10) * 10;
  const lastUncoloredGridItem = document.querySelector(
    ".grid-item:not(.bg-time-passed)"
  );

  lastUncoloredGridItem.classList.add("last-grid");

  lastUncoloredGridItem.style = `background: linear-gradient(to right, var(--square-passed) ${remainderBlock}%, transparent 0%)`;
};

/**
 * @type {HTMLAnchorElement|null}
 */
const fullScreenButton = document.querySelector(`a[data-action="fullscreen"]`);

/**
 * Toggle fullscreen (from click on toggle button)
 * @param {MouseEvent} e
 * @returns
 */
const reqFullscreen = async (e) => {
  e.preventDefault();
  const fsEl = document.fullscreenElement;

  return fsEl
    ? await document.exitFullscreen()
    : await document.documentElement.requestFullscreen();
};

fullScreenButton?.addEventListener("click", reqFullscreen);

// potentially change this to different setting, like a zen mode kind of thing
const enableFullScreen = () => {
  const isFullScreen =
    new URLSearchParams(window.location.search).get("full_screen") === "true";
  document.querySelector(".text-container").hidden = isFullScreen;
};

document.addEventListener("DOMContentLoaded", () => {
  const updateGridItems = (rectangles, addSelected, addPassed) => {
    document
      .querySelectorAll(".grid-container .grid-item")
      .forEach((element, index) => {
        if (index + 1 <= rectangles) {
          element.classList.toggle("bg-time-selected", addSelected);
          element.classList.toggle("bg-time-passed", addPassed);
        }
      });
  };

  document.querySelectorAll(".js-hover").forEach((element) => {
    const rectangles = Number(element.dataset.rectangles);

    element.addEventListener("mouseenter", () => {
      updateGridItems(rectangles, true, false);
    });

    element.addEventListener("click", () => {
      updateGridItems(rectangles, true, false);
    });

    element.addEventListener("mouseleave", () => {
      const minutesPassed = minutesSinceMidnight();
      const fullBlocks = Math.floor(minutesPassed / 10);

      document
        .querySelectorAll(".grid-container .grid-item")
        .forEach((element, index) => {
          if (index + 1 <= fullBlocks) {
            element.style = "background: transparent";
            updateGridItems(rectangles, false, true);
          } else {
            element.classList.remove("bg-time-selected");
            element.classList.remove("bg-time-passed");
          }
        });
    });
  });

  createGrid();

  enableFullScreen();
  fillGrid();
  setInterval(fillGrid, 4000);
});
