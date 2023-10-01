// document.createRange().createContextualFragment makes scripts work on append (do not work with insertAdjacentHTML or innerHTML), script is for setting title

import { Try } from '../utils/try';
import { updatePageWithViewTransition } from '../utils/viewTransition';
import { cacheInitialPage, getPagePartial, loadPage } from './partialsCache';

const contentParent = document.getElementById('content');

const scroll = (top: number) => window.scrollTo({ top, behavior: 'instant' });

const updatePageContent = (contentParent: HTMLElement, partial: string, event: NavigateEvent) => {
  contentParent.innerHTML = '';
  contentParent.append(document.createRange().createContextualFragment(partial));

  const activeNav = document.querySelector('.nav__link[aria-current="Page"]');
  if (activeNav) activeNav.ariaCurrent = null;
  const newActiveNav = document.querySelector(`.nav__link[href="${location.pathname}"]`);
  if (newActiveNav) newActiveNav.ariaCurrent = 'Page';

  if (event.navigationType === 'push') return scroll(0);

  const stateScrollY = (<any>event.destination?.getState())?.scrollY;
  scroll(typeof stateScrollY === 'number' ? stateScrollY : 0);
};

const getNavigationInterceptHandler = (contentParent: HTMLElement, event: NavigateEvent) => {
  return async () => {
    const [error, partial] = await Try(() => getPagePartial(event));
    if (error || !partial) {
      if (event.signal.aborted) return;
      throw error;
    }

    updatePageWithViewTransition(() => updatePageContent(contentParent, partial, event));
  };
};

const navigateHandler = (event: NavigateEvent) => {
  if (!contentParent || !event.canIntercept) return;

  const url = new URL(event.destination.url);

  // do default in same page (reloading) or scroll to hash when only hash changes
  if (url.pathname === location.pathname) return;

  window.navigation.updateCurrentEntry({ state: { scrollY: window.scrollY } });

  const handler = getNavigationInterceptHandler(contentParent, event);
  event.intercept({ scroll: 'manual', handler });
};

const preloadLinkHandler = (event: MouseEvent | TouchEvent) => {
  if (event.ctrlKey || event.metaKey) return;

  const link = event.target instanceof HTMLElement && event.target.closest('a');
  if (!link || link.origin !== location.origin) return;

  loadPage(link.pathname);
};

if (contentParent && window.navigation) {
  cacheInitialPage(contentParent);

  window.navigation.addEventListener('navigate', navigateHandler);

  window.navigation.addEventListener('navigateerror', (event) => {
    // user aborted
    if (event.error instanceof DOMException) return;

    location.reload();
  });

  window.addEventListener('mouseover', preloadLinkHandler);
  window.addEventListener('mousedown', preloadLinkHandler);
  window.addEventListener('touchstart', preloadLinkHandler);
}
