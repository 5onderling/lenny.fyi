import { getImageHtml } from '../utils/getImage.js';
import { html } from '../utils/index.js';
import { getTitle } from '../utils/layout.js';

export const render = async (data) => {
  const curUrl = data.page.url;
  const desc = data.description || 'Lenny Anders is a frontend developer based in Kürten, Germany.';

  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>${getTitle(data)}</title>
        <meta name="description" content="${desc}" />
        <meta property="og:description" content="${desc}" />
        <link
          rel="preload"
          href="/assets/fonts/libre-baskerville-v7-latin-700.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link
          rel="preload"
          href="/assets/fonts/lato-v16-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link
          rel="preload"
          href="/assets/fonts/lato-v16-latin-italic.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link
          rel="preload"
          href="/assets/fonts/lato-v16-latin-700.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link rel="stylesheet" href="/styles/main.scss" />
        <script type="module" src="/scripts/main.ts"></script>
        <script>
          document.documentElement.className = localStorage.getItem('theme') || '';
        </script>
      </head>
      <body>
        <a class="skip-navigation" href="#content">Skip Navigation</a>

        <a
          href="https://music.apple.com/de/playlist/die-beste-musik/pl.u-06oxpz3sYRq9W30"
          class="playlist"
        >
          Listen to "Die Beste Musik"
          <div class="icon icon--playlist"></div>
        </a>
        <header class="nav">
          ${data.page.url !== '/' &&
          html`<a class="logo" href="/" aria-label="homepage">
            ${await getImageHtml('./src/assets/avatar.png', {
              width: 640,
              class: 'logo__image logo-image-transition',
              alt: 'My avatar (An image of Majime Mitsuya from The Great Passage)',
              lazy: false,
            })}
          </a>`}
          <nav class="nav__menu">
            ${data.collections.all
              .filter((page) => page.data.nav)
              .sort(({ data: { order: orderA = 0 } }, { data: { order: orderB = 0 } }) => {
                return orderA - orderB;
              })
              .map(
                (page) => html`
                  <a
                    class="nav__link"
                    href="${page.url}"
                    ${page.url === curUrl && 'aria-current="Page"'}
                  >
                    ${page.data.title}
                  </a>
                `,
              )}
            <button
              class="nav__icon theme-switcher"
              aria-label="Switch theme"
              type="button"
              hidden
            ></button>
          </nav>
        </header>

        <main class="content" id="content">${data.content}</main>
      </body>
    </html>
  `;
};
