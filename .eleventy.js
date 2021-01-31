import { rmSync } from 'fs';
import { minify } from 'html-minifier';

import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

import rss from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import inclusiveLanguage from '@11ty/eleventy-plugin-inclusive-language';

const config = {
  dir: {
    input: 'src',
    output: 'dist',
    includes: 'templates',
    data: 'data',
  },
  markdownTemplateEngine: 'njk',
  dataTemplateEngine: '11ty.js',
};

export default (eleventyConfig) => {
  rmSync('dist', { force: true, recursive: true });

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    }).use(markdownItAnchor, {
      level: 2,
      permalink: true,
      permalinkClass: 'permalink',
      permalinkSpace: false,
      permalinkSymbol:
        '<svg class="permalink__icon" viewBox="0 0 24 24" focusable="false"><path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 010-7.07l3.54-3.54a5.003 5.003 0 017.07 0 5.003 5.003 0 010 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 000-4.24 2.982 2.982 0 00-4.24 0l-3.53 3.53a2.982 2.982 0 000 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 010 7.07l-3.54 3.54a5.003 5.003 0 01-7.07 0 5.003 5.003 0 010-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 000 4.24 2.982 2.982 0 004.24 0l3.53-3.53a2.982 2.982 0 000-4.24.973.973 0 010-1.42z"/></svg>',
      permalinkBefore: true,
      permalinkAttrs: (slug) => ({ 'aria-label': `${slug} permalink` }),
    }),
  );

  eleventyConfig.addPlugin(rss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(inclusiveLanguage);

  eleventyConfig.addPassthroughCopy({ 'src/assets': '.' });

  eleventyConfig.addWatchTarget('src/scripts');
  eleventyConfig.addWatchTarget('src/styles');

  eleventyConfig.addNunjucksFilter('readingTime', (text) => {
    const textWithoutHtml = text.replace(/(<([^>]+)>)/gi, '');
    const wordsCount = textWithoutHtml.split(' ').length;
    return `${Math.ceil(wordsCount / 225)} min read`;
  });

  eleventyConfig.addNunjucksFilter('readableDate', (dateObj) => {
    const date = new Date(dateObj);
    const day = date.getDate().toString().padStart(2, 0);
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  });

  eleventyConfig.addNunjucksFilter('htmlTime', (dateObj, className, long) => {
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
      'December',
    ];
    const date = new Date(dateObj);
    const day = date.getDate().toString().padStart(2, 0);
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const year = date.getFullYear();

    let monthText = months[date.getMonth()];
    if (!long) monthText = monthText.substr(0, 3);

    return `<time ${
      className ? `class="${className}"` : ''
    } datetime="${year}-${month}-${day}">${day} ${monthText} ${year}</time>`;
  });

  eleventyConfig.addNunjucksFilter('nav', (pages) =>
    pages
      .filter((page) => page.data.nav)
      .sort(({ data: { order: orderA = 0 } }, { data: { order: orderB = 0 } }) => orderA - orderB),
  );

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
      minifyJS: true,
    });
  });

  let notFoundPage;
  eleventyConfig.addTransform('updateNotFoundPage', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('404.html')) notFoundPage = content;
    return content;
  });
  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    ghostMode: false,
    callbacks: {
      ready: async (_err, bs) => {
        bs.addMiddleware('*', (_req, res) => {
          res.write(notFoundPage);
          res.end();
        });
      },
    },
  });

  return config;
};
