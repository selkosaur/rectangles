async function loadtips() {
  const tips = await import("./tooltips.js");
}
loadtips();

export const theme = (() => {
  const bodyEl = document.querySelector("body");

  const storedpref = (() => {
    let pref = localStorage.getItem("rectangle-theme");
    if (pref) {
      switch (pref) {
        case "dark":
          bodyEl.setAttribute("data-theme", "dark");
          break;

        default:
          break;
      }
    }
  })();

  const saveLocal = (theme) => {
    localStorage.setItem("rectangle-theme", theme);
  };

  const toggleTheme = (e) => {
    let newtheme = "dark";
    if (bodyEl.hasAttribute("data-theme")) {
      let prev = bodyEl.getAttribute("data-theme");

      prev == "dark" ? (newtheme = "light") : (newtheme = "dark");
    }
    bodyEl.setAttribute("data-theme", newtheme);
    saveLocal(newtheme);
  };

  const themebtn = document.getElementById("theme-change");
  if (!themebtn) {
    return;
  }
  themebtn.addEventListener("click", toggleTheme);
})();

export { theme as default };
