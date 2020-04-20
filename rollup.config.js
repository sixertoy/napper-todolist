import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import builtins from 'builtin-modules';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';

import {
  browser,
  devDependencies,
  main,
  module,
  peerDependencies,
} from './package.json';

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const globals = {
  react: 'React',
  'react-dom': 'ReactDom',
  'react-jss': 'ReactJSS',
};

const external = [
  builtins,
  ...Object.keys(devDependencies),
  ...Object.keys(peerDependencies),
];

const plugins = [
  postcss({
    minimize: !isProduction,
    plugins: [],
    sourceMap: (isProduction && 'inline') || false,
  }),
  url(),
  svgr(),
  resolve({ extensions: ['.js', '.jsx'] }),
  babel({
    babelrc: true,
    exclude: ['node_modules/**'],
    runtimeHelpers: true,
  }),
  commonjs(),
  sizeSnapshot(),
  terser(),
];

export default {
  external,
  input: 'src/index.jsx',
  output: [
    {
      file: main,
      format: 'cjs',
      globals,
      name: '@nappr/nappr-todolist',
      sourcemap: true,
    },
    {
      file: browser,
      format: 'umd',
      globals,
      name: 'NapprTodolist',
      sourcemap: true,
    },
    {
      file: module,
      format: 'es',
      globals,
      name: '@nappr/nappr-todolist',
      sourcemap: true,
    },
  ],
  plugins,
};
