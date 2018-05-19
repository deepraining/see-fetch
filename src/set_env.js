
'use strict';

var data = require('./data');

/**
 * set current environment
 */
module.exports = (env) => {
    data.env = env;
};
