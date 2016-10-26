import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import npm from "rollup-plugin-node-resolve";
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: "./src/blade.js",
    plugins: [ json(), babel(), npm({jsnext : true}), commonjs() ],
    moduleName : "blade",
    dest: "./dist/blade.js",
    format : "umd",
    sourceMap: true

    // format: 'umd'
};
