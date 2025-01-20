export const isNewTab =
  window.location.href.indexOf("chrome-extension://") > -1;

const changeTitle = () => {
  document.querySelector("title").innerText = "New Tab";
};

const changeIcon = () => {
  document.querySelector("link[rel='icon']").href = "./assets/newtab.png";
};

const updatePage = () => {
  if (!isNewTab) {
    return;
  }
  changeTitle();
  changeIcon();
};

let initialChange = false;

!initialChange &&
  (() => {
    updatePage();
    initialChange = true;
  })();

export default updatePage;
