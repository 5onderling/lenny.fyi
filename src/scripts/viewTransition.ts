// document.createRange().createContextualFragment makes scripts work on append (do not work with insertAdjacentHTML or innerHTML), script is for setting title

import { Try } from './utils/try';

(() => {
  if (!window.navigation) return;

  const contentParent = document.getElementById('content');
  if (!contentParent) return;

  const pagesCache = {
    [location.pathname]: `<script>document.title="${document.title}"</script>${contentParent.innerHTML}`,
  };

  window.navigation.addEventListener('navigate', (event) => {
    if (!event.canIntercept) return;

    const url = new URL(event.destination.url);

    // do default in same page (reloading) or scroll to hash when only hash changes
    if (url.pathname === location.pathname) return;

    const isPushNavigation = event.navigationType === 'push';

    window.navigation.updateCurrentEntry({ state: { scrollY: window.scrollY } });

    event.intercept({
      scroll: 'manual',
      async handler() {
        const [error, partial] = await Try(async () => {
          const cachePage = pagesCache[url.pathname];
          if (cachePage) return cachePage;

          const partial = await fetch(`${url.pathname}index.partial.html`, {
            signal: event.signal,
          }).then((res) => res.text());
          return (pagesCache[url.pathname] = partial);
        });
        if (error || !partial) {
          if (event.signal.aborted) return;
          throw error;
        }

        const updatePageContent = () => {
          contentParent.innerHTML = '';
          contentParent.append(document.createRange().createContextualFragment(partial));

          if (isPushNavigation) return window.scrollTo({ top: 0, behavior: 'instant' });

          const navigationState = window.navigation.currentEntry?.getState() as any;
          if (navigationState.scrollY) {
            window.scrollTo({ top: navigationState.scrollY, behavior: 'instant' });
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        };

        if (!!document.startViewTransition) document.startViewTransition(updatePageContent);
        else updatePageContent();

        const activeNav = document.querySelector('.nav__link[aria-current="Page"]');
        if (activeNav) activeNav.ariaCurrent = null;
        const newActiveNav = document.querySelector(`.nav__link[href="${url.pathname}"]`);
        if (newActiveNav) newActiveNav.ariaCurrent = 'Page';
      },
    });
  });

  window.navigation.addEventListener('navigateerror', (event) => {
    // user aborted
    if (event.error instanceof DOMException) return;

    location.reload();
  });
})();
