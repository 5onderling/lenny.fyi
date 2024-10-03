import { html } from './index.js';

export const getTitle = (data) => {
  return html`${data.title && data.page.url !== '/' && `${data.title} | `}${data.meta.title}`;
};
