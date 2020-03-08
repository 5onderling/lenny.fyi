const { rollup } = require('rollup');
const rollupTypescript = require('@rollup/plugin-typescript');
const rollupCommonjs = require('@rollup/plugin-commonjs');
const rollupResolve = require('@rollup/plugin-node-resolve');
const { terser: rollupTerser } = require('rollup-plugin-terser');
const rollupBabel = require('rollup-plugin-babel');

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
      plugins: [
        isProd && rollupTerser(),
        rollupBabel({
          plugins: [
            [
              'babel-plugin-transform-async-to-promises',
              { inlineHelpers: true }
            ],
            ['@babel/plugin-transform-strict-mode'],
            ['@babel/plugin-transform-block-scoping'],
            ['@babel/plugin-transform-for-of', { assumeArray: true }],
            ['@babel/plugin-transform-spread'],
            [
              '@babel/plugin-transform-destructuring',
              { loose: true, useBuiltIns: true }
            ],
            ['@babel/plugin-transform-shorthand-properties'],
            ['@babel/plugin-transform-template-literals', { loose: true }],
            ['@babel/plugin-transform-arrow-functions'],
            ['@babel/plugin-transform-parameters', { loose: true }],
            ['@babel/plugin-transform-exponentiation-operator'],
            // proposals (are already in chrome (v80 maybe earlier))
            [
              '@babel/plugin-proposal-object-rest-spread',
              { loose: true, useBuiltIns: true }
            ],
            ['@babel/plugin-proposal-optional-chaining'],
            ['@babel/plugin-proposal-nullish-coalescing-operator']
          ]
        }),
        rollupTypescript({ allowJs: true }),
        rollupResolve(),
        rollupCommonjs()
      ]
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
