const fs = require('fs-extra');
const { minify } = require('html-minifier');

const rss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const inclusiveLanguage = require('@11ty/eleventy-plugin-inclusive-language');

module.exports = eleventy => {
  const isProd = process.env.ELEVENTY_ENV === 'production';

  fs.emptyDirSync('dist');

  eleventy.addPlugin(rss);
  eleventy.addPlugin(syntaxHighlight);
  eleventy.addPlugin(inclusiveLanguage);

  eleventy.addPassthroughCopy({ 'src/assets': '.' });

  eleventy.addWatchTarget('src/scripts');
  eleventy.addWatchTarget('src/styles');

  eleventy.addNunjucksFilter('readableDate', dateObj => {
    const date = new Date(dateObj),
      day = date
        .getDate()
        .toString()
        .padStart(2, 0),
      month = (date.getMonth() + 1).toString().padStart(2, 0),
      year = date.getFullYear();

    return `${day} ${month} ${year}`;
  });

  eleventy.addNunjucksFilter('htmlTime', (dateObj, sec) => {
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
    eleventy.addTransform('minify', (content, outputPath) => {
      if (!outputPath.endsWith('.html')) return content;

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

  eleventy.setBrowserSyncConfig({
    ui: false,
    ghostMode: false,
    callbacks: {
      ready: async (err, bs) => {
        const notFound = await fs.readFile('dist/404.html');
        bs.addMiddleware('*', (req, res) => {
          res.write(notFound);
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
