import { fetchPage } from './fetchPage';
import { savePage } from './savePage';
import { openPage } from './openPage';

export default class RouteHandler {
  constructor(
    {
      elementSelector = 'body',
      linkSelector = 'a:not([target="_blank"])',
      on = {}
    } = {},
    startInitial
  ) {
    Object.assign(this, {
      elementSelector,
      linkSelector,
      callbacks: {
        beforePageSave: [],
        afterPageSave: [],
        beforePageUpdate: [],
        afterPageUpdate: []
      }
    });

    for (const event in on) this.on(event, on[event]);

    if (startInitial) this.start();
  }

  on(event, cb) {
    if (!this.callbacks[event]) return false;

    this.callbacks[event].push(cb);
    return true;
  }

  goTo(href) {
    if (!this.started) return;

    const location = Object.assign(document.createElement('a'), { href });
    openPage(location, this);
  }

  start() {
    if (this.started) return;

    this.content = document.querySelector(this.elementSelector);
    if (!this.content) return;

    this.started = true;
    this.pages = {};

    savePage(location, document, this);
    history.replaceState(location.pathname, '', location.href);

    document.body.tabIndex = -1;

    addEventListener('popstate', async ({ state: pathname }) => {
      // only update page when state/pathname exists (not on hashchange)
      if (pathname) openPage({ pathname }, this);
    });

    addEventListener('mousedown', async e => {
      // button must be 0 (primary button)
      const link = !e.button && e.target.closest(this.linkSelector);
      if (!link || link.host !== location.host || this.pages[link.pathname]) {
        return;
      }

      this.savingPage = link.pathname;
      savePage(link, await fetchPage(link.pathname), this);

      if (this.openSavingPage) openPage(link, this);

      this.savingPage = false;
      this.openSavingPage = false;
    });

    addEventListener('click', e => {
      const link = e.target.closest(this.linkSelector);
      if (!link || link.host !== location.host) return;

      if (!link.hash) e.preventDefault();

      if (link.pathname === location.pathname) return;

      if (this.savingPage === link.pathname) {
        this.openSavingPage = true;
        return;
      }

      openPage(link, this);
    });
  }
}
