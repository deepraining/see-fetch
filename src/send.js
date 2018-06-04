
'use strict';

const setting = require('./setting');
const data = require('./data');
const logger = require('./util/logger');
const makeSearch = require('./util/make_search');
const makeUrlSearch = require('./util/make_url_search');
const fetchHandle = require('./fetch_handle');
const postFetchHandle = require('./post_fetch_handle');
const postHandle = require('./post_handle');

/**
 * send a request
 *
 * @param name Defined request name
 * @param reqData Request data
 */
module.exports = (name, reqData) => {
    if (!name) {
        logger.throwError(`name '${name}' is not defined.`);
        return;
    }

    // current option
    var option = data.options[name];
    // common option
    var commonOption = data.options['common'] || {};

    if (!option) {
        logger.throwError(`name '${name}' is not configured.`);
        return;
    }

    // index to select item
    var index = data.env;

    // http method, default is GET
    var method = option.method && option.method[index] || 'get';
    // stringify request data
    var stringify = option.stringify && option.stringify[index] || !1;
    // fetch options
    var settings = option.settings && option.settings[index] || {};
    // url
    var url = option.url && option.url[index] || '';
    // request keys
    var requestKeys = option.requestKeys && option.requestKeys[index] || {};
    // pre handle
    var preHandle = option.preHandle && option.preHandle[index];
    var commonPreHandle = commonOption.preHandle && commonOption.preHandle[index];
    // implement
    var implement = option.implement && option.implement[index];
    // implement delay
    let implementDelay = option.implementDelay && option.implementDelay[index];

    // ultimate request data after requestKeys mapping
    var ultimateReqData = Object.assign({}, reqData || {});
    for (var ultimateReqDataAttr in ultimateReqData) {
        if (ultimateReqData.hasOwnProperty(ultimateReqDataAttr) && requestKeys[ultimateReqDataAttr]) {
            // make a new key
            ultimateReqData[requestKeys[ultimateReqDataAttr]] = ultimateReqData[ultimateReqDataAttr];
            // delete old key
            delete ultimateReqData[ultimateReqDataAttr];
        }
    }

    // pre handle
    commonPreHandle && commonPreHandle(ultimateReqData);
    preHandle && preHandle(ultimateReqData);

    // custom implement
    if (implement) {

        var result = implement(!stringify ? ultimateReqData : JSON.stringify(ultimateReqData));

        if (setting.debug) {
            logger.info(`Custom implement fetch for "${name}", and request data is:`);
            console.log(ultimateReqData);
            logger.info(`result for "${name}" is:`);
            console.log(result);
        }

        // post handle
        postHandle(result, ultimateReqData, name);

        return new Promise((resolve) => {
            if (typeof implementDelay === 'number' && implementDelay > 0)
                setTimeout(_ => {
                    resolve(result);
                }, implementDelay);
            else
                resolve(result);
        });
    }
    else {
        settings.method = method;
        if (method === 'get' || method === 'GET') {
            let newUrl = url + (url.indexOf('?') < 0 ? '?' : '&') + makeSearch(ultimateReqData);
            return fetch(newUrl, settings).then(fetchHandle).then(postFetchHandle(name, ultimateReqData));
        }

        if (stringify) {
            settings.body = JSON.stringify(ultimateReqData);
            return fetch(url, settings).then(fetchHandle).then(postFetchHandle(name, ultimateReqData));
        }

        settings.body = makeUrlSearch(ultimateReqData);
        return fetch(url, settings).then(fetchHandle).then(postFetchHandle(name, ultimateReqData));
    }
};
