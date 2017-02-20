import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import npm from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: './src/ziz.js',
    plugins: [
        json(),
        // uglify(),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
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
    moduleName : 'ziz',
    dest: './dist/ziz.js',
    format : 'umd',
    sourceMap: true
};
