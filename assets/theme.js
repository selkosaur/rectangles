/**
 * @template T
 * @class
 */
class Cycle extends Array {
  /** * Create a new CustomArray.
   * @param {...T} [input] - The initial items.
   **/
  constructor(...input) {
    input ? super(...input) : super();
  }
  #count = 0;
  /**
   * Get the next item in the cycle.
   * @returns {T}
   */
  next() {
    const index = this.#count % this.length;
    this.#count++;

    return this[index];
  }
  /**
   * Get the previous item in the cycle.
   * @returns {T}
   */
  previous() {
    this.#count <= 1 ? (this.#count = this.length) : this.#count--;

    const index = (this.#count - 1) % this.length;
    return this[index];
  }
  /**
   * Get item at a specified index in the cycle (loops around if needed).
   * @param {number} index
   * @returns {T}
   */
  item(index) {
    return this[index % this.length];
  }
  /**
   * Set the current index of the cycle.
   * @param {number} index
   */
  setCount(index) {
    this.#count = index;
  }
}

async function loadtips() {
  return await import("./tooltips.js");
}
loadtips();

const themes = {
  light: true,
  lavender: true,
  honeydew: true,
  cantaloupe: true,
  dark: true,
};

/**
 * @typedef {keyof typeof themes} ThemeName
 */

/**
 * @type {Cycle<ThemeName>}
 */
const themelist = new Cycle(
  "light",
  "lavender",
  "honeydew",
  "cantaloupe",
  "dark"
);

export const theme = (() => {
  const bodyEl = document.querySelector("body");

  /**
   * Saves theme pref to local storage.
   * @param {ThemeName} theme
   */
  const saveLocal = (theme) => {
    localStorage.setItem("rectangle-theme", theme);
  };

  /**
   * Apply the specified color theme.
   * @param {ThemeName} pref Name of the theme.
   * @param {boolean} [withSave = true] Should also save theme to local storage? Default is `true`.
   */
  const apply = (pref, withSave = true) => {
    bodyEl.setAttribute("data-theme", pref);
    withSave && saveLocal(pref);
  };

  const storedpref = (() => {
    const pref = localStorage.getItem("rectangle-theme");
    if (pref) {
      apply(pref, false);

      const currentIndex = themelist.findIndex((item) => item === pref);
      currentIndex > -1 && themelist.setCount(currentIndex + 1);
    }
  })();

  const toggleTheme = (e) => {
    const nexttheme = themelist.next();

    // apply next theme and save preference
    apply(nexttheme, true);
  };

  const themebtn = document.getElementById("theme-change");
  if (!themebtn) return;

  themebtn.addEventListener("click", toggleTheme);
})();

export { theme as default };
