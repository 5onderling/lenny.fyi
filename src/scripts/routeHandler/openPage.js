import { fetchPage } from './fetchPage';
import { savePage } from './savePage';
import { updatePage } from './updatePage';

export const openPage = async (link, routeHandler) => {
  const { pages } = routeHandler;
  const { pathname, href } = link;

  const page = pages[pathname];
  if (page) return updatePage(link, routeHandler);

  try {
    savePage(link, await fetchPage(pathname), routeHandler);
    updatePage(link, routeHandler);
  } catch (err) {
    console.error(err);
    link.href = href;
  }
};
