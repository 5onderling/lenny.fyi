import { default as inclusiveLanguage } from '@11ty/eleventy-plugin-inclusive-language';
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';
import { rmSync } from 'fs';
import { minify } from 'html-minifier';

const config = {
  dir: {
    input: 'src',
    output: 'dist',
    includes: 'templates',
    data: 'data',
  },
  dataTemplateEngine: '11ty.js',
};

export default (eleventyConfig) => {
  rmSync('dist', { force: true, recursive: true });

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: { build: { sourcemap: true } },
  });
  eleventyConfig.addPlugin(inclusiveLanguage);

  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/public');
  eleventyConfig.addPassthroughCopy('src/scripts');
  eleventyConfig.addPassthroughCopy('src/styles');

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
