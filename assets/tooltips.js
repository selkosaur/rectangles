import tippy, {createSingleton, roundArrow} from "./tippyes.js";
import tipcss from "./tippydefault.css" with { type: "css" };
import tippyarrowcss from "./tippysvgarrow.css" with {type: "css"};
document.adoptedStyleSheets = [...document.adoptedStyleSheets,tipcss, tippyarrowcss];

/**
 * @typedef {Object} TippyInstance
 * @property {Function} clearDelayTimeouts - Function to clear delay timeouts.
 * @property {Function} destroy - Function to destroy the tooltip instance.
 * @property {Function} disable - Function to disable the tooltip.
 * @property {Function} enable - Function to enable the tooltip.
 * @property {Function} hide - Function to hide the tooltip.
 * @property {Function} hideWithInteractivity - Function to hide the tooltip with interactivity.
 * @property {number} id - Unique identifier for the tooltip instance.
 * @property {Array} plugins - Array of plugins associated with the tooltip.
 * @property {HTMLElement} popper - Popper element associated with the tooltip.
 * @property {null} popperInstance - Instance of the Popper.js instance (currently null).
 * @property {Object} props - Properties of the tooltip.
 * @property {HTMLElement} reference - Reference element for the tooltip.
 * @property {Function} setContent - Function to set the content of the tooltip.
 * @property {Function} setProps - Function to set the properties of the tooltip.
 * @property {Function} show - Function to show the tooltip.
 * @property {Object} state - State of the tooltip.
 * @property {boolean} state.isEnabled - Indicates if the tooltip is enabled.
 * @property {boolean} state.isVisible - Indicates if the tooltip is visible.
 * @property {boolean} state.isDestroyed - Indicates if the tooltip is destroyed.
 * @property {boolean} state.isMounted - Indicates if the tooltip is mounted.
 * @property {boolean} state.isShown - Indicates if the tooltip is shown.
 * @property {Function} unmount - Function to unmount the tooltip.
 */

tippy.setDefaultProps({
  arrow:roundArrow
})

/**
 * @type {Array<TippyInstance>}
 */
const tips = tippy("[title]", {
  content: (reference) => {
    let tip = reference.getAttribute("title");
    reference.removeAttribute("title");
    return tip;
  },
  placement: "bottom",
});


/**
 * @type {Map<string, Array<TippyInstance>>}
 */
const singletonInstancesMap = new Map();

tips.forEach(tip => {
  const { reference } = tip;
  const dataSingletonId = reference.getAttribute("data-singleton");
  if (!dataSingletonId) return;
  if (singletonInstancesMap.has(dataSingletonId)) {
    const arr = singletonInstancesMap.get(dataSingletonId);
    arr.push(tip);
  }
  else {
    singletonInstancesMap.set(dataSingletonId, [tip]);
  }
});


const singletonsRef = new Map();

const initSingletons = () => {
  singletonInstancesMap.forEach((instances, id) => {
    const inst0 = instances[0];

    const singleton = createSingleton(instances, {
      moveTransition: 'transform 0.2s ease-out',
      placement:inst0.props.placement
    });
    singletonsRef.set(id, singleton);
  })
}
initSingletons();

export default tips;
