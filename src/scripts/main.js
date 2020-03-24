import skipNavigation from './skipNavigation';
import stickyNavigation from './stickyNavigation';
import mobileNavigation from './mobileNavigation';
import themeSwitcher from './themeSwitcher';
import postWebshare from './postWebshare';

const main = () => {
  themeSwitcher();
  stickyNavigation();
  mobileNavigation();
  skipNavigation();
  postWebshare();
};

// polyfill addEventlistener option { once: true }
import 'eventlistener-polyfill';

const unsupportedFeatures = [
  !window.Symbol && 'Symbol',
  !Object.assign && 'Object.assign',
  !Array.from && 'Array.from',
  !Element.prototype.matches && 'Element.prototype.matches',
  !Element.prototype.closest && 'Element.prototype.closest',
  !Element.prototype.append && 'Element.prototype.append',
  !Element.prototype.remove && 'Element.prototype.remove',
  !NodeList.prototype.forEach && 'NodeList.prototype.forEach'
]
  .filter(item => item)
  .join();

if (!unsupportedFeatures) {
  main();
} else {
  const script = document.createElement('script');
  script.src =
    'https://polyfill.io/v3/polyfill.min.js?features=' + unsupportedFeatures;
  script.onload = main;
  document.head.appendChild(script);
}
