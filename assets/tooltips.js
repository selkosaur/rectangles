import tippy, * as tiptools from "./tippyes.js";
import tipcss from "./tippydefault.css" with { type: "css" };
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
