const pagesCache: Record<string, string> = {};

export const cacheInitialPage = (contentParent: HTMLElement) => {
  pagesCache[location.pathname] = `
    <script>document.title=${JSON.stringify(document.title)}</script>
    ${contentParent.innerHTML}
  `;
};

export const getPagePartial = async (event: NavigateEvent) => {
  const cachePage = pagesCache[location.pathname];
  if (cachePage) return cachePage;

  const partial = await fetch(`${location.pathname}index.partial.html`, {
    signal: event.signal,
  }).then((res) => res.text());
  return (pagesCache[location.pathname] = partial);
};
