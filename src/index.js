import refactor from 'json-refactor';
import { getOption } from './util';
// import {error} from "./logger";

let env = 0;

export const setEnv = e => {
  env = e;
};

export const getEnv = () => env;

const settings = {
  // error field when response's status code is `3XX, 4XX, 5XX`
  errorField: 'error',
  // whether current mode is debug
  debug: !0,
};

export const setSettings = params => {
  Object.keys(params).forEach(key => {
    settings[key] = params[key];
  });
};

export const getSetting = name => settings[name];

const configs = {};

export const addConfig = (name, options) => {
  // One
  if (options) {
    configs[name] = options;
  }
  // Multiple
  else {
    Object.keys(name).forEach(key => {
      configs[key] = name[key];
    });
  }
};

export const getConfig = name => configs[name];

export const afterFetch = res => {
  // has error
  if (res.status >= 300) return { [settings.errorField]: !0, response: res };

  return res.json();
};

export const postHandle = (name, params) => res => {
  // has error
  if (res[settings.errorField]) return res;

  // current config
  const nConfig = configs[name];
  // common config
  const cConfig = configs.common || {};

  const {
    refactor: nRefactor,
    responseRefactor: nResponseRefactor,
    post: nPost,
    postHandle: nPostHandle,
  } = nConfig;
  const {
    refactor: cRefactor,
    responseRefactor: cResponseRefactor,
    post: cPost,
    postHandle: cPostHandle,
  } = cConfig;

  const rules = getOption(env, nRefactor, nResponseRefactor);
  const commonRules = getOption(env, cRefactor, cResponseRefactor);
  const post = getOption(env, nPost, nPostHandle);
  const commonPost = getOption(env, cPost, cPostHandle);

  let response = res;

  if (commonRules) refactor(response, commonRules);
  if (rules) refactor(response, rules);
  if (commonPost) {
    const result = commonPost(response, params, name);

    // if return a new object, use it
    if (result) response = result;
  }
  if (post) {
    const result = post(response, params, name);

    // if return a new object, use it
    if (result) response = result;
  }

  return response;
};

// export const send = (name, params) => {
//   if (!name) return;
//
//   // current config
//   const nConfig = configs[name];
//   // common config
//   const cConfig = configs.common || {};
//
//   if (!nConfig) {
//     error(`name ${name} is not configured`);
//     return;
//   }
//
//   const {
//     method: nMethod,
//     stringify: nStringify,
//     settings: nSettings,
//   } = nConfig;
//
//   const method = getOption(env, nMethod) || 'get';
//   const stringify = getOption(env, nStringify) || !1;
//   const settings = getOption(env, nSettings) || {};
//
//   // url
//   const url = (options.url && options.url[index]) || '';
//
//   // Request keys.
//   const requestKeys = (options.requestKeys && options.requestKeys[index]) || {};
//
//   // Pre handle.
//   const preHandle = options.preHandle && options.preHandle[index];
//
//   const commonPreHandle = commonOptions.preHandle && commonOptions.preHandle[index];
//
//   // implement
//   const implement = options.implement && options.implement[index];
//
//   // Real request params.
//   let realParams = Object.assign({}, params || {});
//
//   // Request keys mapping handling.
//   Object.keys(realParams).forEach(key => {
//     const newKey = requestKeys[key];
//     if (newKey && typeof newKey === 'string') {
//       // Make a new key.
//       realParams[newKey] = realParams[key];
//       // Delete old key.
//       delete realParams[key];
//     }
//   });
//
//   // Pre handling.
//   if (commonPreHandle) {
//     const result = commonPreHandle(realParams);
//
//     // If return a new object, use it.
//     if (result) realParams = result;
//   }
//   if (preHandle) {
//     const result = preHandle(realParams);
//
//     // If return a new object, use it.
//     if (result) realParams = result;
//   }
//
//   // Custom implement.
//   if (implement) {
//     return new Promise(resolve => {
//       const callback = result => {
//         if (setting.debug) {
//           info(`custom fetch implement for '${name}', and request params is:`, realParams);
//           info(`result for '${name}' is:`, result);
//         }
//
//         resolve(postHandle(result, realParams, name));
//       };
//
//       // Use callback
//       const promise = implement(result => {
//         callback(result);
//       }, !stringify ? realParams : JSON.stringify(realParams));
//
//       // Return a Promise
//       if (promise && promise instanceof Promise)
//         promise.then(result => {
//           callback(result);
//         });
//     });
//   } else {
//     settings.method = method;
//     if (method === 'get' || method === 'GET') {
//       const newUrl = url + (url.indexOf('?') < 0 ? '?' : '&') + makeSearch(realParams);
//       return fetch(newUrl, settings)
//         .then(fetchHandle)
//         .then(postFetchHandle(name, realParams));
//     }
//
//     settings.body = stringify ? JSON.stringify(realParams) : makeUrlSearchParams(realParams);
//
//     if (method !== 'get' && method !== 'GET' && method !== 'head' && method !== 'HEAD') {
//       if (!settings.headers) settings.headers = {};
//
//       if (!settings.headers['Content-Type'])
//         settings.headers['Content-Type'] = stringify
//           ? 'application/json'
//           : 'application/x-www-form-urlencoded;charset=UTF-8';
//     }
//
//     return fetch(url, settings)
//       .then(fetchHandle)
//       .then(postFetchHandle(name, realParams));
//   }
// };
