
"use strict";

const moment = require('moment');

const packageJson = require('./package.json');

module.exports = {
    // module definition
    modules: {
        index: {
            js: 'src/index.js',
            filename: 'see-fetch',
            library: 'seeFetch',
            libraryTarget: "umd"
        },
        demo: {
            html: 'demo/index.html',
            js: 'demo/index.js'
        },
        'demo-implement': {
            html: 'demo/implement.html',
            js: 'demo/implement.js'
        },
        example: {
            html: 'example/index.html',
            js: 'example/index.js'
        },
        'example-implement': {
            html: 'example/implement.html',
            js: 'example/implement.js'
        }
    },
    externals: {
        'json-refactor' : {
            commonjs: 'json-refactor',
            amd: 'json-refactor',
            commonjs2: 'json-refactor',
            root: 'JSONRefactor'
        }
    },
    banner: `
    see-fetch v${packageJson.version}

    https://github.com/senntyou/see-fetch

    @senntyou <jiangjinbelief@163.com>

    ${moment().format('YYYY-MM-DD HH:mm:ss')}
    `,
    treatAllMethodsAsGet: !0
};

