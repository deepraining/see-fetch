
'use strict';

var JSONRefactor = require('json-refactor');

var data = require('./data');
var logger = require('./util/logger');

/**
 * post handle after get response data
 *
 * @param res Response data
 * @param reqData Request data
 * @param name Name
 */
module.exports = (res, reqData, name) => {

    // current option
    var option = data.options[name];
    // common option
    var commonOption = data.options['common'] || {};

    // index to select item
    var index = data.env;

    // response refactor
    var responseRefactor = option.responseRefactor && option.responseRefactor[index];
    var commonResponseRefactor = commonOption.responseRefactor && commonOption.responseRefactor[index];

    // post handle
    var postHandle = option.postHandle && option.postHandle[index];
    var commonPostHandle = commonOption.postHandle && commonOption.postHandle[index];

    commonResponseRefactor && JSONRefactor(res, commonResponseRefactor);
    responseRefactor && JSONRefactor(res, responseRefactor);
    commonPostHandle && commonPostHandle(res, reqData, name);
    postHandle && postHandle(res, reqData, name);
};
