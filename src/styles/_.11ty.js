import { writeFile } from 'fs/promises';

import postcss from 'postcss';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssUnprefix from 'postcss-unprefix';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sass from 'sass';

const sassRenderer = (options) => {
  return new Promise((resolve, reject) => {
    sass.render(options, (error, result) => {
      if (error) return reject(error);

      resolve(result);
    });
  });
};

export const data = {
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

const postcssInstance = postcss([
  postcssCustomProperties(),
  postcssUnprefix(),
  autoprefixer(),
  cssnano(),
]);
export const render = async ({ entry: { input, output } }) => {
  try {
    const { css: sassCss } = await sassRenderer({
      file: input,
      outFile: `dist/${output}`,
      sourceMap: true,
      sourceMapEmbed: true,
    });

    const { css, map } = await postcssInstance.process(sassCss, {
      from: input,
      to: `dist/${output}`,
      map: { inline: false },
    });

    await writeFile(`dist/${output}.map`, JSON.stringify(map));

    return css;
  } catch (error) {
    console.error(error);
  }
};
