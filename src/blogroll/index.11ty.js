const { html, md } = require('../utils/index.js');

exports.data = {
  layout: 'views/base.njk',
  title: 'Blogroll',
  nav: true,
  order: 2,
};

exports.render = (data) => {
  return md`
    # ${data.title}

    Inspired by [Max Böck](https://mxb.dev/blogroll).

    Here I show off the blogs I read the most, and from them I learn the most. Currently, I'm
    discovering new interesting blogs, like on a daily basis, so this list is most probably going
    to grow.

    ${Object.entries(data.blogs).map(([title, blogs]) => {
      return md`
        ## ${title}
        <ul class="page-list">
          ${blogs.map((blog) => {
            return html`
              <li class="page-list__item">
                <a href="${blog.url}" class="page-list__link">
                  ${blog.icon}${blog.name} (${blog.url.replace('https://', '').replace('www.', '')})
                </a>
              </li>
            `;
          })}
        </ul>
      `;
    })}
  `;
};
