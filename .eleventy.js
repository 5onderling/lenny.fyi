const { rmSync } = require('fs');
const { minify } = require('html-minifier');

const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite');
const inclusiveLanguage = require('@11ty/eleventy-plugin-inclusive-language');

const config = {
  dir: {
    input: 'src',
    output: 'dist',
    includes: 'templates',
    data: 'data',
  },
  dataTemplateEngine: '11ty.js',
};

module.exports = (eleventyConfig) => {
  rmSync('dist', { force: true, recursive: true });

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: { build: { sourcemap: true } },
  });
  eleventyConfig.addPlugin(inclusiveLanguage);

  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/public');
  eleventyConfig.addPassthroughCopy('src/scripts');
  eleventyConfig.addPassthroughCopy('src/styles');

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

  return config;
};
