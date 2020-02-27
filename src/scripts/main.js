import cursor from './cursor';
import skipNavigation from './skipNavigation';
import stickyNavigation from './stickyNavigation';
import themeSwitcher from './themeSwitcher';
import hotlinks from './hotlinks';

const main = () => {
  cursor();
  themeSwitcher();
  stickyNavigation();
  skipNavigation();
  hotlinks({ elementSelector: 'main' });
};

// polyfill addEventlistener option { once: true }
import 'eventlistener-polyfill';

const unsupportedFeatures = [
  !window.Symbol && 'Symbol',
  !window.Promise && 'Promise',
  !window.fetch && 'fetch',
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
