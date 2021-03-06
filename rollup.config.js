import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

import { minify } from 'uglify-es'
// experimental minifier for ES modules
// https://github.com/TrySound/rollup-plugin-uglify#warning

const pkg = require('./package.json')

const config = {
  input: 'src/index.js',
  external: ['react'],
  plugins: [
    babel(),
    uglify(
      {
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      },
      minify
    )
  ],
  output: [
    {
      name: 'ClassierReact',
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
      sourcemap: true,
      globals: {
        React: 'react'
      }
    }, // Universal Modules
    { file: pkg.main, format: 'cjs', exports: 'named', sourcemap: true }, // CommonJS Modules
    { file: pkg.module, format: 'es', exports: 'named', sourcemap: true } // ES Modules
  ]
}

export default [config]
