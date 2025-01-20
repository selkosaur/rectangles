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
  const THEME_STORAGE_KEY = "rectangle-theme";
  const HEADER_COLOR_VAR = "--header-color";
  const bodyEl = document.querySelector("body");

  /**
   * Saves theme pref to local storage.
   * @param {ThemeName} theme
   */
  const saveLocal = (theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  };

  /**
   * Determines the header color based on currently applied theme and sets the value of the meta tag to it.
   */
  const setHeaderColor = () => {
    const computedStyle = getComputedStyle(document.body);
    const hcol = computedStyle.getPropertyValue(HEADER_COLOR_VAR);

    /**
     * Creates color theme meta tag and appends to document head.
     *
     */
    const createMetaTag = () => {
      const m = document.createElement("meta");
      m.name = `theme-color`;
      document.head.append(m);
      return m;
    };

    /**
     * @type {HTMLMetaElement}
     */
    const metaTag =
      document.head.querySelector(`meta[name="theme-color"]`) ??
      createMetaTag();

    metaTag.content = hcol;
  };

  /**
   * Apply the specified color theme.
   * @param {ThemeName} pref Name of the theme.
   * @param {boolean} [withSave = true] Should also save theme to local storage? Default is `true`.
   */
  const apply = (pref, withSave = true) => {
    bodyEl.setAttribute("data-theme", pref);
    setHeaderColor();
    withSave && saveLocal(pref);
  };

  const storedpref = (() => {
    const pref = localStorage.getItem(THEME_STORAGE_KEY);
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
