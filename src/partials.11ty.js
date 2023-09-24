exports.data = {
  pagination: {
    data: 'collections.all',
    size: 1,
    alias: 'partial',
    before: (paginationData) => paginationData.filter((page) => page.url.endsWith('/')),
  },
  permalink: ({ partial }) => `${partial.url}index.partial.html`,
  layout: 'partial.11ty.js',
};

exports.render = ({ partial }) => partial.content;
