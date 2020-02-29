const fs = require('fs-extra');
const { minify } = require('html-minifier');

const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const rss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const inclusiveLanguage = require('@11ty/eleventy-plugin-inclusive-language');

module.exports = eleventyConfig => {
  const isProd = process.env.ELEVENTY_ENV === 'production';

  fs.emptyDirSync('dist');

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true
    }).use(markdownItAnchor, {
      level: 2,
      permalink: true,
      permalinkClass: 'permalink',
      permalinkSpace: false,
      permalinkSymbol:
        '<svg class="permalink__icon" viewBox="0 0 24 24" focusable="false"><path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 010-7.07l3.54-3.54a5.003 5.003 0 017.07 0 5.003 5.003 0 010 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 000-4.24 2.982 2.982 0 00-4.24 0l-3.53 3.53a2.982 2.982 0 000 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 010 7.07l-3.54 3.54a5.003 5.003 0 01-7.07 0 5.003 5.003 0 010-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 000 4.24 2.982 2.982 0 004.24 0l3.53-3.53a2.982 2.982 0 000-4.24.973.973 0 010-1.42z"/></svg>',
      permalinkBefore: true,
      permalinkAttrs: slug => ({ 'aria-label': `${slug} permalink` }),
      // "custom" render function (only for permalinkAttrs) (remove after new markdown-it-anchor release)
      renderPermalink: (slug, opts, state, idx) => {
        const position = {
          false: 'push',
          true: 'unshift'
        };

        const space = () =>
          Object.assign(new state.Token('text', '', 0), { content: ' ' });

        const linkTokens = [
          Object.assign(new state.Token('link_open', 'a', 1), {
            attrs: [
              ['class', opts.permalinkClass],
              ['href', opts.permalinkHref(slug, state)],
              ...Object.entries(opts.permalinkAttrs(slug, state))
            ]
          }),
          Object.assign(new state.Token('html_block', '', 0), {
            content: opts.permalinkSymbol
          }),
          new state.Token('link_close', 'a', -1)
        ];

        // `push` or `unshift` according to position option.
        // Space is at the opposite side.
        if (opts.permalinkSpace) {
          linkTokens[position[!opts.permalinkBefore]](space());
        }
        state.tokens[idx + 1].children[position[opts.permalinkBefore]](
          ...linkTokens
        );
      }
    })
  );

  eleventyConfig.addPlugin(rss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(inclusiveLanguage);

  eleventyConfig.addPassthroughCopy({ 'src/assets': '.' });

  eleventyConfig.addWatchTarget('src/scripts');
  eleventyConfig.addWatchTarget('src/styles');

  eleventyConfig.addNunjucksFilter('readableDate', dateObj => {
    const date = new Date(dateObj),
      day = date
        .getDate()
        .toString()
        .padStart(2, 0),
      month = (date.getMonth() + 1).toString().padStart(2, 0),
      year = date.getFullYear();

    return `${day} ${month} ${year}`;
  });

  eleventyConfig.addNunjucksFilter('htmlTime', (dateObj, sec) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      date = new Date(dateObj),
      day = date
        .getDate()
        .toString()
        .padStart(2, 0),
      month = (date.getMonth() + 1).toString().padStart(2, 0),
      shortMonth = months[date.getMonth()].substr(0, 3),
      year = date.getFullYear();

    return `<time ${
      sec ? `class="${sec}"` : ''
    } datetime="${year}-${month}-${day}">${day} ${shortMonth} ${year}</time>`;
  });

  if (isProd) {
    // xml ???
    eleventyConfig.addTransform('minify', (content, outputPath) => {
      if (!outputPath || !outputPath.endsWith('.html')) return content;

      return minify(content, {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
      });
    });
  }

  let notFoundPage;
  eleventyConfig.addTransform('minify', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('404.html')) {
      notFoundPage = content;
    }
    return content;
  });
  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    ghostMode: false,
    callbacks: {
      ready: async (err, bs) => {
        bs.addMiddleware('*', (req, res) => {
          res.write(notFoundPage);
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'templates',
      data: 'data'
    },
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: '11ty.js'
  };
};
