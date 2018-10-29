import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default [
  {
    file: 'lib/cjs.js',
    format: 'cjs',
  },
  {
    file: 'lib/m.js',
    format: 'esm',
  },
  {
    file: 'lib/umd.js',
    format: 'umd',
    name: 'JSONRefactor',
  },
  {
    file: 'lib/amd.js',
    format: 'amd',
  },
].map(output => ({
  input: 'src/index.js',
  output,
  plugins: [
    babel({
      presets: ['@babel/preset-env'],
    }),
    json(),
  ],
}));
