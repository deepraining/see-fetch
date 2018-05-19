
'use strict';

const data = require('./data');

/**
 * config application
 *
 * @param name
 * @param option
 */
module.exports = (name, option) => {
    // one
    if (typeof name === 'string') {
        data.options[name] = option;
    }
    // multi
    else {
        for (let attr in name) {
            if (name.hasOwnProperty(attr)) data.options[attr] = name[attr];
        }
    }
};
