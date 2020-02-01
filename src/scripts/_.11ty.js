const { rollup } = require('rollup');
const rollupCommonjs = require('rollup-plugin-commonjs');
const rollupResolve = require('rollup-plugin-node-resolve');
const { terser: rollupTerser } = require('rollup-plugin-terser');

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
          input: 'src/scripts/main.js',
          output: 'main.js'
        }
      ]
    };
  }

  async render({ entry: { input } }) {
    const isProd = process.env.ELEVENTY_ENV === 'production';

    const bundle = await rollup({
      input: input,
      plugins: [isProd && rollupTerser(), rollupResolve(), rollupCommonjs()]
    });

    const {
      output: [{ code, map }]
    } = await bundle.generate({
      format: 'iife',
      sourcemap: !isProd
    });

    if (!map) return code;

    return `${code}\n//# sourceMappingURL=data:application/json;base64,${Buffer.from(
      JSON.stringify(map)
    ).toString('base64')}`;
  }
};
