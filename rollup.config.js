import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import npm from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: './src/blade.js',
    plugins: [
        json(),
        babel({
            exclude: 'node_modules/**',
        }),
        npm({
            jsnext : true
        }),
        eslint({
            exclude: [
                'test/**',
                'dist/**',
                'node_modules/**'
            ]
        }),
        commonjs()
    ],
    moduleName : 'blade',
    dest: './dist/blade.js',
    format : 'umd',
    sourceMap: true
};
