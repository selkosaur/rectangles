import tippy, * as tiptools from "https://esm.run/tippy.js";
import tipcss from "https://cdn.jsdelivr.net/npm/tippy.js@6.3.7/dist/tippy.css" assert { type: "css" };
document.adoptedStyleSheets = [tipcss];

const tips = tippy("[title]", {
  content: (reference) => {
    let tip = reference.getAttribute("title");
    reference.removeAttribute("title");
    return tip;
  },
  placement: "bottom",
});

export default tips;
