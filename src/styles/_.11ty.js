const fs = require('fs-extra');

const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssImportUrl = require('postcss-import-url');
const postcssMixins = require('postcss-mixins');
const postcssFunctions = require('postcss-functions');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssNested = require('postcss-nested');
const postcssCustomMedia = require('postcss-custom-media');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCalc = require('postcss-calc');
const postcssOverflowShorthand = require('postcss-overflow-shorthand');
const postcssSelectorNot = require('postcss-selector-not');
const postcssUnprefix = require('postcss-unprefix');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const mixins = require('./js-mixins');
const functions = require('./js-functions');

module.exports = class {
  data() {
    return {
      pagination: {
        data: 'entrys',
        size: 1,
        alias: 'entry'
      },
      permalink: ({ entry: { output } }) => output,
      entrys: [
        {
          input: 'src/styles/main.css',
          output: 'main.css'
        }
      ]
    };
  }

  async render({ entry: { input, output } }) {
    const isProd = process.env.ELEVENTY_ENV === 'production';

    const { css } = await postcss([
      postcssImport(),
      postcssImportUrl(),
      postcssMixins({ mixins }),
      postcssFunctions({ functions }),
      postcssSimpleVars(),
      postcssNested(),
      postcssCustomMedia(),
      postcssCustomProperties(),
      postcssCalc(),
      postcssOverflowShorthand(),
      postcssSelectorNot(),
      ...(isProd ? [postcssUnprefix(), autoprefixer(), cssnano()] : [])
    ]).process(await fs.readFile(input), {
      from: input,
      to: output,
      map: !isProd
    });

    return css;
  }
};
