import { html, md } from '../utils/index.js';

export const data = {
  title: 'Links',
  nav: true,
  order: 3,
};

export const render = (data) => {
  return md`
    # ${data.title}

    ${Object.entries(data.links).map(([title, links]) => {
      return md`
        ## ${title}
        <ul class="page-list">
          ${links.map((link) => {
            return html`
              <li class="page-list__item">
                <a href="${link.url}" class="page-list__link"> ${link.icon}${link.name} </a>
              </li>
            `;
          })}
        </ul>
      `;
    })}
  `;
};
