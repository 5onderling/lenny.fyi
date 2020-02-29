const linkSelector =
  'a[href]:not([target="_blank"]):not([href*="."]):not([href^="mailto:"]):not([href^="tel:"]), a[href$=".html"]:not([target="_blank"])';

export let pages = {};

const addPage = ({ pathname }, dom, elementSelector) => {
  pages[pathname] = {
    title: dom.title,
    head: [...dom.querySelectorAll('head > script, head > style, head > link')],
    content: [...dom.querySelector(elementSelector).children]
  };
};

const updatePage = ({ pathname }, content) => {
  const page = pages[pathname];

  // compare and merge head
  document.title = page.title;
  const overHead = page.head.reduce((res, el) => {
    const selector = [...el.attributes].reduce(
      (res, { nodeName, nodeValue }) =>
        `${res}[${nodeName}${nodeValue ? `="${nodeValue}"` : ''}]`,
      `head > ${el.tagName.toLowerCase()}`
    );

    const inDom = document.querySelector(selector);
    if (inDom && inDom.innerHTML === el.innerHTML) return res;

    return [...res, el];
  }, []);
  document.head.append(...overHead);

  // update content
  while (content.hasChildNodes()) content.lastChild.remove();
  content.append(...page.content);

  /* update aria-current attributes */
  document
    .querySelectorAll('a[aria-current]')
    .forEach(link => link.removeAttribute('aria-current'));
  document
    .querySelectorAll(`a[href="${pathname}"]`)
    .forEach(link => link.setAttribute('aria-current', 'page'));

  window.scrollTo(0, 0);
  document.body.focus();

  window.dispatchEvent(new CustomEvent('navigated'));
};

export default ({ elementSelector = 'body' } = {}) => {
  const content = document.querySelector(elementSelector);
  if (!content) return;

  document.body.tabIndex = -1;
  pages[location.pathname] = {
    title: document.title,
    head: [...document.head.querySelectorAll('script, style, link')],
    content: [...content.children]
  };

  window.addEventListener('popstate', e => {
    // return when theres no state (hopefully only on hashchange / anchorlinks)
    if (!e.state) return;

    try {
      updatePage({ pathname: e.state }, content);
    } catch (err) {
      location.reload();
    }
  });
  // implemet: start downloading on mousedown, change page on click
  // window.addEventListener('mousedown', e => {
  //   const link = e.target.closest(linkSelector);
  //   if (!link || link.host !== location.host || pages[link.pathname]) return;
  // });
  window.addEventListener('click', async e => {
    const link = e.target.closest(linkSelector);
    if (!link || link.host !== location.host) return;
    if (link.hash) return;
    e.preventDefault();

    if (link.pathname === location.pathname) return;

    history.pushState(link.pathname, '', link.href);

    try {
      updatePage(link, content);
    } catch {
      try {
        const pageDom = new DOMParser().parseFromString(
          await (await fetch(link.href)).text(),
          'text/html'
        );

        addPage(link, pageDom, elementSelector);
        updatePage(link, content);
      } catch {
        location.reload();
      }
    }
  });
};
