exports.data = {
  layout: 'views/base.njk',
  title: 'Blogroll',
  nav: true,
  order: 2,
};

exports.render = async (data) => {
  return `
    <h1>${data.title}</h1>
    <p>Inspired by <a href="https://mxb.dev/blogroll">Max Böck</a>.</p>
    <p>Here I show off the blogs I read the most, and from them I learn the most. Currently, I'm discovering new interesting blogs, like on a daily basis, so this list is most probably going to grow.</p>
    ${Object.entries(data.blogs).map(([title, blogs]) => {
      return `
        <h2>${title}</h2>
        <ul class="page-list">
          ${blogs
            .map((blog) => {
              return `
              <li class="page-list__item">
                <a href="${blog.url}" class="page-list__link">${blog.icon}${blog.name} (${blog.url
                .replace('https://', '')
                .replace('www.', '')})
                </a>
              </li>
          `;
            })
            .join('')}
        </ul>
      `;
    })}
  `;
};
