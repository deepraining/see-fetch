import setting from './setting';
import share from './share';
import { info, error } from './util/logger';
import makeSearch from './util/make_search';
import makeUrlSearchParams from './util/make_url_search_params';
import fetchHandle from './fetch_handle';
import postFetchHandle from './post_fetch_handle';
import postHandle from './post_handle';

/**
 * Make a request.
 *
 * @param name Defined request name.
 * @param params Request params.
 */
export default function(name, params) {
  if (!name) return;

  // Current options.
  const options = share.optionsCollection[name];
  // Common options.
  const commonOptions = share.optionsCollection.common || {};

  if (!options) {
    error(`name '${name}' is not configured.`);
    return;
  }

  // Index to select item.
  const index = share.env;

  // Http method, default is `GET`.
  const method = (options.method && options.method[index]) || 'get';

  // Stringify request params.
  const stringify = (options.stringify && options.stringify[index]) || !1;

  // Fetch options.
  const settings = (options.settings && options.settings[index]) || {};

  // url
  const url = (options.url && options.url[index]) || '';

  // Request keys.
  const requestKeys = (options.requestKeys && options.requestKeys[index]) || {};

  // Pre handle.
  const preHandle = options.preHandle && options.preHandle[index];

  const commonPreHandle = commonOptions.preHandle && commonOptions.preHandle[index];

  // implement
  const implement = options.implement && options.implement[index];

  // Real request params.
  let realParams = Object.assign({}, params || {});

  // Request keys mapping handling.
  Object.keys(realParams).forEach(key => {
    const newKey = requestKeys[key];
    if (newKey && typeof newKey === 'string') {
      // Make a new key.
      realParams[newKey] = realParams[key];
      // Delete old key.
      delete realParams[key];
    }
  });

  // Pre handling.
  if (commonPreHandle) {
    const result = commonPreHandle(realParams);

    // If return a new object, use it.
    if (result) realParams = result;
  }
  if (preHandle) {
    const result = preHandle(realParams);

    // If return a new object, use it.
    if (result) realParams = result;
  }

  // Custom implement.
  if (implement) {
    return new Promise(resolve => {
      const callback = result => {
        if (setting.debug) {
          info(`custom fetch implement for '${name}', and request params is:`, realParams);
          info(`result for '${name}' is:`, result);
        }

        resolve(postHandle(result, realParams, name));
      };

      // Use callback
      const promise = implement(result => {
        callback(result);
      }, !stringify ? realParams : JSON.stringify(realParams));

      // Return a Promise
      if (promise && promise instanceof Promise)
        promise.then(result => {
          callback(result);
        });
    });
  } else {
    settings.method = method;
    if (method === 'get' || method === 'GET') {
      const newUrl = url + (url.indexOf('?') < 0 ? '?' : '&') + makeSearch(realParams);
      return fetch(newUrl, settings)
        .then(fetchHandle)
        .then(postFetchHandle(name, realParams));
    }

    settings.body = stringify ? JSON.stringify(realParams) : makeUrlSearchParams(realParams);

    if (method !== 'get' && method !== 'GET' && method !== 'head' && method !== 'HEAD') {
      if (!settings.headers) settings.headers = {};

      if (!settings.headers['Content-Type'])
        settings.headers['Content-Type'] = stringify
          ? 'application/json'
          : 'application/x-www-form-urlencoded;charset=UTF-8';
    }

    return fetch(url, settings)
      .then(fetchHandle)
      .then(postFetchHandle(name, realParams));
  }
}
