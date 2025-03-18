import { html, md } from '../utils/index.js';

export const data = {
  title: 'Blogroll',
  nav: true,
  order: 2,
};

export const render = (data) => {
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
                <div class="page-list__link-wrapper">
                  <a href="${blog.url}" class="page-list__link">${blog.icon}${blog.name}</a>
                  ${blog.feedUrl &&
                  html`<a class="page-list__rss" href="${blog.feedUrl}">
                    <small>RSS</small>
                    <span class="icon icon--rss"></span>
                  </a>`}
                </div>
                ${blog.latestBlogPost &&
                html`<small class="page-list__latest-post">
                  Latest
                  post${blog.latestBlogPost.updated && ` from ${blog.latestBlogPost.updated}`}:
                  <a href="${blog.latestBlogPost.link}">${blog.latestBlogPost.title}</a>
                </small>`}
              </li>
            `;
          })}
        </ul>
      `;
    })}
  `;
};
