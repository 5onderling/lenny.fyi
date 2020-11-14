const { writeFile } = require('fs/promises');

const postcss = require('postcss');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssUnprefix = require('postcss-unprefix');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('sass');

const sassRenderer = (options) =>
  new Promise((resolve, reject) => {
    sass.render(options, (error, result) => {
      if (error) return reject(error);

      resolve(result);
    });
  });

module.exports = class {
  data() {
    return {
      pagination: {
        data: 'entrys',
        size: 1,
        alias: 'entry',
      },
      permalink: ({ entry: { output } }) => output,
      entrys: [
        {
          input: 'src/styles/main.scss',
          output: 'main.css',
        },
      ],
    };
  }

  async render({ entry: { input, output } }) {
    try {
      const { css: sassCss } = await sassRenderer({
        file: input,
        outFile: output,
        sourceMap: true,
        sourceMapEmbed: true,
      });

      const { css, map } = await postcss([
        postcssCustomProperties(),
        postcssUnprefix(),
        autoprefixer(),
        cssnano(),
      ]).process(sassCss, {
        from: input,
        to: output,
        map: {
          inline: false,
        },
      });

      await writeFile(`dist/${output}.map`, JSON.stringify(map));

      return css;
    } catch (error) {
      console.error(error);
    }
  }
};
