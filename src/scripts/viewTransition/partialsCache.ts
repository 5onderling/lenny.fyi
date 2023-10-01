import mitt from 'mitt';

const isLoading = Symbol();

const cacheEmitter = mitt<Record<string, string>>();
const partialsCache: Record<string, string | Symbol> = {};

export const cacheInitialPage = (contentParent: HTMLElement) => {
  partialsCache[location.pathname] = `
    <script>document.title=${JSON.stringify(document.title)}</script>
    ${contentParent.innerHTML}
  `;
};

export const loadPage = async (path: string, signal?: AbortSignal): Promise<string | void> => {
  const partialCache = partialsCache[path];
  if (typeof partialCache === 'string') return partialCache;

  if (partialCache === isLoading) {
    return new Promise((resolve) => cacheEmitter.on(path, resolve));
  }

  try {
    partialsCache[path] = isLoading;
    const partial = await fetch(`${path}index.partial.html`, { signal }).then((res) => res.text());
    cacheEmitter.emit(path, partial);
    return (partialsCache[path] = partial);
  } catch (_error) {
    delete partialsCache[path];
  }
};

export const getPagePartial = (event: NavigateEvent) => loadPage(location.pathname, event.signal);
