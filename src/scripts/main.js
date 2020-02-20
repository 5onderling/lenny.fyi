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

const browserSupportsAllFeatures = () =>
  window.Promise &&
  window.fetch &&
  window.Symbol &&
  Object.assign &&
  Array.from &&
  Element.prototype.matches &&
  Element.prototype.closest &&
  [
    Element.prototype,
    Document.prototype,
    DocumentFragment.prototype
  ].every(item => item.hasOwnProperty('append')) &&
  [
    Element.prototype,
    CharacterData.prototype,
    DocumentType.prototype
  ].every(item => item.hasOwnProperty('remove')) &&
  window.NodeList &&
  NodeList.prototype.forEach;

if (browserSupportsAllFeatures()) {
  main();
} else {
  const script = document.createElement('script');
  script.src = '/polyfills.js';
  script.onload = main;
  document.head.appendChild(script);
}
