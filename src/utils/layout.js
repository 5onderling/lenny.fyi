import { html } from './index.js';

export const getTitle = (data) => {
  return html`${data.title && data.page.url !== '/' && `${data.title} | `}Lenny Anders - Web
  Developer`;
};
