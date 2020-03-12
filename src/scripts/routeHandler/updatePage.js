export const updatePage = (
  { hash, href, pathname },
  { pages, content, callbacks: { beforePageUpdate, afterPageUpdate } }
) => {
  const page = pages[pathname];

  // call callbacks, if some returns false don't update the page
  if (beforePageUpdate.some(cb => cb(page) === false)) return;

  // update title
  document.title = page.title;

  // merge head scripts and styles
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

  // replace content
  while (content.hasChildNodes()) content.lastChild.remove();
  content.append(...page.content);

  // update aria-current attributes on links
  document
    .querySelectorAll('a[aria-current]')
    .forEach(link => link.removeAttribute('aria-current'));
  document
    .querySelectorAll(`a[href="${pathname}"], a[href="${pathname}/"]`)
    .forEach(link => link.setAttribute('aria-current', 'page'));

  // move focus and scroll to top if theres no hash
  if (!hash) {
    scrollTo(0, 0);
    document.body.focus();
  }

  // update history if there is a href (not on popstate)
  if (href) history.pushState(pathname, '', href);

  afterPageUpdate.forEach(cb => cb());
};
