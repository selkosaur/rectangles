/**
 * Generate svg with specified colors.
 * @param {string} color1
 * @param {string} color2
 * @returns
 */
const faviconTemplate = (color1, color2) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 200 200"><rect width="85.172" height="85.172" x="6.575" y="6.575" ry="32.875" style="opacity:.702335;fill:${color1};fill-opacity:1;stroke:${color2};stroke-width:9.85;stroke-dasharray:none;stroke-opacity:1;"/><rect width="85.172" height="85.172" x="6.575" y="108.253" ry="32.875" style="opacity:.702335;fill:${color2};fill-opacity:1;stroke:${color1};stroke-width:9.85;stroke-dasharray:none;stroke-opacity:1;" /><rect width="85.172" height="85.172" x="108.253" y="108.253" ry="32.875" style="opacity:.702335;fill:${color1};fill-opacity:1;stroke:${color2};stroke-width:9.85;stroke-dasharray:none;stroke-opacity:1;" /><rect width="85.172" height="85.172" x="108.253" y="6.575" ry="32.875" style="opacity:.702335;fill:${color2};fill-opacity:1;stroke:${color1};stroke-width:9.85;stroke-dasharray:none;stroke-opacity:1;" /></svg>`;

/**
 * Applies svg favicon for the specified colors.
 * @param {string} color1
 * @param {string} color2
 */
export function applyFavicon(color1, color2) {
  //create the svg content
  const svgContent = faviconTemplate(color1, color2);

  //convert to blob
  const blob = new Blob([svgContent], { type: "image/svg+xml" });

  // generate object url
  const objectURL = URL.createObjectURL(blob);

  const createLinkEl = () => {
    const el = document.createElement("link");
    el.rel = "icon";
    document.head.append(el);
    return el;
  };

  // manage link tag
  /**
   * @type {HTMLLinkElement|null}
   */
  const existingLinkEl = document.head.querySelector(`link[rel="icon"]`);

  const existingHref = existingLinkEl?.href;

  const linkEl = existingLinkEl ?? createLinkEl();

  linkEl.type = `image/svg+xml`;
  linkEl.href = objectURL;

  // if there was a previous object url, then release it from memory
  existingHref && URL.revokeObjectURL(existingHref);
}
