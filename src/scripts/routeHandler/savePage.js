export const savePage = (
  { pathname },
  dom,
  { pages, elementSelector, callbacks: { beforePageSave, afterPageSave } }
) => {
  beforePageSave.forEach(cb => cb(dom));

  const page = {
    title: dom.title,
    head: [
      ...dom.head.querySelectorAll(
        ':scope > script, :scope > style, :scope > link'
      )
    ],
    content: [...dom.body.querySelector(elementSelector).children]
  };
  pages[pathname] = page;

  afterPageSave.forEach(cb => cb(page));
  return page;
};
