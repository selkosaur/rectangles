class Cycle extends Array {
  constructor(...input) {
    input ? super(...input) : super();
  }
  #count = 0;
  next() {
    const index = this.#count % this.length;
    this.#count++;

    return this[index];
  }
  previous() {
    this.#count <= 1 ? (this.#count = this.length) : this.#count--;

    const index = (this.#count - 1) % this.length;
    return this[index];
  }
  item(index) {
    return this[index % this.length];
  }
  setCount(index) {
    this.#count = index;
  }
}

async function loadtips() {
  const tips = await import("./tooltips.js");
}
loadtips();
const themelist = new Cycle(
  "light",
  "lavender",
  "honeydew",
  "cantaloupe",
  "dark"
);

export const theme = (() => {
  const bodyEl = document.querySelector("body");
  const storedpref = (() => {
    let pref = localStorage.getItem("rectangle-theme");
    if (pref) {
      bodyEl.setAttribute("data-theme", pref);
      if (pref) {
        const currentIndex = themelist.findIndex((item) => item === pref);
        currentIndex > -1 && themelist.setCount(currentIndex + 1);
      }
    }
  })();

  const saveLocal = (theme) => {
    localStorage.setItem("rectangle-theme", theme);
  };

  const toggleTheme = (e) => {
    const nexttheme = themelist.next();

    bodyEl.setAttribute("data-theme", nexttheme);
    saveLocal(nexttheme);
  };

  const themebtn = document.getElementById("theme-change");
  if (!themebtn) {
    return;
  }
  themebtn.addEventListener("click", toggleTheme);
})();

export { theme as default };
