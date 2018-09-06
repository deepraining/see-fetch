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
  const option = data.options[name];
  // common option
  const commonOption = data.options.common || {};

  if (!option) {
    logger.throwError(`name '${name}' is not configured.`);
    return;
  }

  // index to select item
  const index = data.env;

  // http method, default is GET
  const method = (option.method && option.method[index]) || 'get';
  // stringify request data
  const stringify = (option.stringify && option.stringify[index]) || !1;
  // fetch options
  const settings = (option.settings && option.settings[index]) || {};
  // url
  const url = (option.url && option.url[index]) || '';
  // request keys
  const requestKeys = (option.requestKeys && option.requestKeys[index]) || {};
  // pre handle
  const preHandle = option.preHandle && option.preHandle[index];
  const commonPreHandle = commonOption.preHandle && commonOption.preHandle[index];
  // implement
  const implement = option.implement && option.implement[index];

  // ultimate request data after requestKeys mapping
  const ultimateReqData = Object.assign({}, reqData || {});
  Object.keys(ultimateReqData).forEach(key => {
    if (requestKeys[key]) {
      // make a new key
      ultimateReqData[requestKeys[key]] = ultimateReqData[key];
      // delete old key
      delete ultimateReqData[key];
    }
  });

  // pre handle
  if (commonPreHandle) commonPreHandle(ultimateReqData);
  if (preHandle) preHandle(ultimateReqData);

  // custom implement
  if (implement) {
    return new Promise(resolve => {
      const callback = result => {
        if (setting.debug) {
          logger.info(`Custom implement fetch for "${name}", and request data is:`);
          console.log(ultimateReqData);
          logger.info(`result for "${name}" is:`);
          console.log(result);
        }

        // post handle
        postHandle(result, ultimateReqData, name);

        resolve(result);
      };

      const promise = implement(result => {
        callback(result);
      }, !stringify ? ultimateReqData : JSON.stringify(ultimateReqData));

      if (promise && promise instanceof Promise) {
        promise.then(result => {
          callback(result);
        });
      }
    });
  } else {
    settings.method = method;
    if (method === 'get' || method === 'GET') {
      const newUrl = url + (url.indexOf('?') < 0 ? '?' : '&') + makeSearch(ultimateReqData);
      return fetch(newUrl, settings)
        .then(fetchHandle)
        .then(postFetchHandle(name, ultimateReqData));
    }

    if (stringify) {
      settings.body = JSON.stringify(ultimateReqData);
      return fetch(url, settings)
        .then(fetchHandle)
        .then(postFetchHandle(name, ultimateReqData));
    }

    settings.body = makeUrlSearch(ultimateReqData);
    return fetch(url, settings)
      .then(fetchHandle)
      .then(postFetchHandle(name, ultimateReqData));
  }
};
