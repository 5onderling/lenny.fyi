import { md } from './utils/index.js';

export const data = {
  title: '404',
  permalink: '404.html',
};

export const render = () => md`
  # 404 not found

  The page that you found does not exist, or got deleted since the last time, maybe you'll find something on the [homepage](/).
`;
