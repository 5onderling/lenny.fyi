import cursor from './cursor';
import skipNavigation from './skipNavigation';
import stickyNavigation from './stickyNavigation';
import mobileNavigation from './mobileNavigation';
import themeSwitcher from './themeSwitcher';
import RouteHandler from './routeHandler';
import postWebshare from './postWebshare';

const main = () => {
  // :scope polyfill
  (function(elProto) {
    try {
      document.querySelector(':scope');
    } catch (error) {
      var scope = /:scope(?![\w-])/gi;
      ['querySelector', 'querySelectorAll', 'matches', 'closest'].forEach(
        function(entry) {
          var orig = elProto[entry];
          if (!orig) return;
          elProto[entry] = function(query) {
            if (!scope.test(query)) return orig.apply(this, arguments);

            var attr = 'q' + Math.floor(Math.random() * 9000000) + 1000000;
            this.setAttribute(attr, '');
            arguments[0] = query.replace(scope, '[' + attr + ']');
            var res = orig.apply(this, arguments);
            this.removeAttribute(attr);

            return res;
          };
        }
      );
    }
  })(Element.prototype);

  const router = new RouteHandler({
    elementSelector: '.content',
    on: {
      beforePageSave() {
        console.log('save');
      },
      afterPageUpdate() {
        console.log('updated');
      }
    }
  });

  cursor();
  themeSwitcher();
  stickyNavigation();
  mobileNavigation({ router });
  skipNavigation();
  postWebshare({ router });

  router.start();
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
