const { html } = require('./index.js');

exports.getTitle = (data) => {
  return html`${data.title && data.page.url !== '/' && `${data.title} | `}${data.meta.title}`;
};
