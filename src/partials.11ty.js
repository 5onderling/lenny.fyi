export const data = {
  pagination: {
    data: 'collections.all',
    size: 1,
    alias: 'partial',
    before: (paginationData) => paginationData.filter((page) => page.url.endsWith('/')),
  },
  permalink: ({ partial }) => `${partial.url}index.partial.html`,
  layout: 'partial.11ty.js',
};

export const render = ({ partial }) => partial.content;
