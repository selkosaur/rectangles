/**
 * display current date
 * @param {HTMLElement|String} targetEl the element to display the date
 * @returns
 */
const displaydate = (targetEl) => {
  if (typeof targetEl == "string") {
    targetEl = document.querySelector(targetEl);
  }
  if (!targetEl) {
    console.error("no target element found");
    return;
  }
  let wrapper = document.createElement("span");
  wrapper.classList.add("current-date");
  targetEl.appendChild(wrapper);

  const formatDate = () => {
    let d = new Date();
    let str = d.toLocaleDateString([], {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    str = str.replace(/,/g, `</span><span>,`);
    str = `<span>${str}</span>`;
    return str;
  };

  const insertHTML = () => {
    wrapper.innerHTML = formatDate();
  };
  insertHTML();
  const update = setInterval(insertHTML, 1000);
};

export { displaydate };
