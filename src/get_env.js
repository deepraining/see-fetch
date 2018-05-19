
'use strict';

var data = require('./data');

/**
 * get current environment
 *
 * @returns {Object.<string, *>|null|*|number}
 */
module.exports = () => {
    return data.env;
};
