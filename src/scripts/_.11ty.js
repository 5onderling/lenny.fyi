const { startService, build } = require('esbuild');

const isServing = process.argv.includes('--serve');
let service;
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
          input: 'src/scripts/main.js',
          output: 'main.js',
        },
      ],
    };
  }

  async render({ entry: { input, output } }) {
    try {
      if (isServing && !service) service = await startService();

      await (isServing ? service.build : build)({
        entryPoints: [input],
        outfile: `dist/${output}`,
        format: 'esm',
        bundle: true,
        minify: true,
        sourcemap: true,
        target: 'es2015',
      });
    } catch (error) {
      console.error(error);
    }
  }
};
