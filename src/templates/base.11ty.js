const { html } = require('../utils');
const { getTitle } = require('../utils/layout.js');

exports.render = (data) => {
  const curUrl = data.page.url;
  const desc = data.description || data.meta.description;

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
        <link rel="stylesheet" href="/styles/main.scss" />
        <script type="module" src="/scripts/main.js"></script>
        <script>
          document.documentElement.className = localStorage.getItem('theme') || '';
        </script>
        <noscript>
          <style>
            .nav__menu {
              position: static;
              width: auto;
              min-height: 0;
              padding-top: 0;
              opacity: 1;
              visibility: visible;
              flex-wrap: wrap;
              flex-direction: row;
              justify-content: flex-end;
            }
            .nav__link {
              margin: 0.3em 0 0 1em;
            }
          </style>
        </noscript>
      </head>
      <body>
        <a class="skip-navigation" href="#content">Skip Navigation</a>

        <header class="nav">
          <div class="nav__inner">
            <a
              class="logo"
              href="/"
              aria-label="homepage"
              ${data.page.url === curUrl && 'aria-current="Page"'}
            >
              <svg focusable="false" fill-rule="evenodd" viewBox="0 0 128 96">
                <path
                  fill="#ba1a4f"
                  d="M85.771 51.95c-3.453-1.568-4.363-11.656-1.395-18.497 3.225-7.435 10.698-10.288 11.502-9.11.692 1.017-3.667 4.903-2.673 9.11.647 2.729 2.858 2.784 3.486 5.045 1.357 4.885-6.69 15.373-10.92 13.452"
                />
                <path
                  fill="currentColor"
                  d="M37.187-36.477c-7.593 26.385-23.865 83.475-9.688 78.193 11.085-4.129 32.602-13.062 34.34-13.87 8.692-4.034 12.234-7.418 21.376-11.21 1.532-.636 4.31-1.746 8.132-3.644 5.807-2.884 8.785-4.204 9.99-5.605.769-.892 1.309-1.795 1.713-2.786 4.262 2.704 8.082 6.081 11.319 9.989-2.656 1.243-9.868 5.596-23.486 13.818C72.198 39.686 70.972 41.4 61.607 46.345c-2.219 1.17-5.789 2.995-26.955 11.491-11.431 4.588-20.042 3.582-26.442-.101-9.944-5.723 2.952-50.444 7.263-94.212h21.714z"
                />
                <path
                  fill="#b3b3b3"
                  d="M90.91 12.541c2.533-1.814 5.446-2.415 6.71-.95.31.359.508.828.599 1.498l-.018.044c-.806 1.937-2.051 3.881-2.788 5.043-.932 1.471-2.087 3.795-2.904 7.428-2.606-2.953-3.626-7.271-2.557-10.93.234-.801.551-1.508.958-2.133z"
                />
                <path
                  fill="#e92063"
                  d="M116.499 55.458c-.374.39-.78.808-1.22 1.258C104.39 67.859 98.944 73.43 93.205 77.455c-8.218 5.765-13.424 8.473-17.426 9.81-5.732 1.823-22.921 5.652-32.529-10.651-8.096-13.737-3.777-34.057 4.879-42.881 5.19-5.288 13.007-7.586 13.71-6.166.415.838-2.123 2.613-4.416 6.727-3.004 5.39-5.938 14.272-3.02 19.618.705 1.291 1.58 2.067 2.055 2.443 1.695-.934 3.42-1.592 4.916-2.163 1.585-.603 2.836-.912 3.9-1.053.028-3.62.291-7.166.515-10.158.23-3.104 1.801-21.337 10.688-26.905.056-.037.122-.077.122-.077 2.554-1.563 6.157-2.073 6.848-.764.653 1.238-1.743 3.262-3.022 6.725-2.229 6.05.46 13.023 2.093 17.659.811 2.304 1.649 4.082 2.207 5.185 2.556-.529 6.21-1.723 9.76-4.765.415-.356.781-.697 1.108-1.023.512-3.099 1.816-7.919 5.514-10.888 5.235-4.207 12.684-2.624 17.192 2.241 5.41 5.838 6.71 16.535 3.254 21.58-1.114 1.626-2.469 2.299-5.054 3.509z"
                />
                <path
                  fill="#ed4d82"
                  d="M99.114 50.365c-1.941-3.173-1.554-6.906-1.337-8.991 0 0 .427-5.734 3.137-9.16l.067-.083c.002 0 .713-.884 1.574-1.593.672-.555 8.57-4.171 14.142 1.846 4.452 4.801 5.519 13.601 2.676 17.752-.948 1.384-2.113 1.927-4.395 2.996-1.869.874-5.346 2.499-9.557 1.383-1.729-.459-4.498-1.191-6.307-4.15"
                />
                <path
                  fill="#ba1a4f"
                  d="M116.225 55.74l-.155-.721c-.872-2.666-2.705-5.136-3.781-6.588-1.183-1.595-1.859-2.205-1.857-3.348.003-1.447 1.088-2.935 2.298-3.35 1.82-.624 3.59 1.297 4.934 2.755 1.258 1.364 3.459 3.751 4.331 6.708l-.442.753c-1.114 1.626-2.469 2.299-5.054 3.509l-.274.282zm-8.087-12.128c-.662-.874-2.107-2.289-2.828-2.113-.748.453-.626 3.86-.51 5.008.031.141.098.246.204.312 2.046.584 3.661.824 4.437.092.287-.521-.697-2.362-1.303-3.299zm-5.457-16.488c2.187 1.181 3.954 3.551 4.998 4.953 1.21 1.624 2.803 3.757 2.285 5.952-.342 1.46-1.579 2.77-2.776 2.773-.949.002-1.457-.815-2.777-2.239-1.204-1.3-3.252-3.51-5.461-4.562-.64-.305-1.227-.481-1.751-.568.848-1.934 2.088-3.844 3.908-5.305l1.574-1.004zM90.91 12.541c1.79-3.096 4.898-4.101 5.548-4.313 1.729-.561 3.239-.446 4.184-.28-.215.265-.521.685-.815 1.26-.258.509-.397.924-.464 1.123l-1.144 2.758c-.091-.67-.289-1.139-.599-1.498-1.264-1.465-4.177-.864-6.71.95z"
                />
                <path
                  fill="currentColor"
                  d="M111.89 41.858c.754-.635.852-1.763.218-2.518-.634-.755-1.761-.854-2.517-.222l-.002.002c-2.52 2.114-6.283 1.785-8.398-.735-2.115-2.52-1.786-6.283.735-8.398 2.52-2.115 6.283-1.785 8.398.735 1.649 1.966 1.812 4.688.607 6.794.784.051 1.546.409 2.09 1.058.545.648.765 1.462.679 2.242 2.283-.82 4.936-.188 6.586 1.778 2.114 2.52 1.785 6.283-.735 8.398-2.52 2.115-6.283 1.786-8.398-.735-2.115-2.52-1.785-6.283.735-8.397l.002-.002zm-2.48-10.37c1.692 2.016 1.429 5.027-.587 6.718-2.017 1.692-5.027 1.429-6.719-.587-1.692-2.016-1.428-5.027.588-6.719 2.016-1.691 5.027-1.428 6.718.588zm9.962 11.873c1.692 2.016 1.429 5.026-.587 6.718-2.017 1.692-5.027 1.428-6.719-.588-1.691-2.016-1.428-5.026.588-6.718 2.016-1.692 5.027-1.429 6.718.588z"
                />
              </svg>
            </a>
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
            </nav>
            <button
              class="nav__icon theme-switcher"
              aria-label="Switch theme"
              type="button"
              hidden
            ></button>
            <button class="nav__icon burger" aria-label="open navigation" hidden>
              <span class="burger__line"></span>
            </button>
          </div>
        </header>

        <main class="content" id="content">${data.content}</main>
      </body>
    </html>
  `;
};
