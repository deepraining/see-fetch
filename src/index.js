import refactor from 'json-refactor';
import { getOption, makeSearch, makeUrlSearchParams } from './util';
import { error, info } from './logger';

let env = 0;

const setEnv = e => {
  env = e;
};

const getEnv = () => env;

const sets = {
  // error field when response's status code is `3XX, 4XX, 5XX`
  errorField: 'error',
  // whether current mode is debug
  debug: !0,
};

const setSettings = params => {
  Object.keys(params).forEach(key => {
    sets[key] = params[key];
  });
};

// const getSetting = name => sets[name];

const configs = {};

const addConfig = (name, options) => {
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

// const getConfig = name => configs[name];

const afterFetch = res => {
  // has error
  if (res.status >= 300) return { [sets.errorField]: !0, response: res };

  return res.json();
};

const postHandle = (name, params) => res => {
  // has error
  if (res[sets.errorField]) return res;

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

const send = (name, params) => {
  if (!name) return;

  // current config
  const nConfig = configs[name];
  // common config
  const cConfig = configs.common || {};

  if (!nConfig) {
    error(`name ${name} is not configured`);
    return;
  }

  const {
    method: nMethod,
    stringify: nStringify,
    settings: nSettings,
    url: nUrl,
    req: nReq,
    requestKeys: nRequestKeys,
    pre: nPre,
    preHandle: nPreHandle,
    implement: nImplement,
  } = nConfig;

  const { pre: cPre, preHandle: cPreHandle } = cConfig;

  const method = getOption(env, nMethod) || 'get';
  const stringify = getOption(env, nStringify) || !1;
  const settings = getOption(env, nSettings) || {};
  const url = getOption(env, nUrl) || '';
  const req = getOption(env, nReq, nRequestKeys) || {};
  const pre = getOption(env, nPre, nPreHandle);
  const commonPre = getOption(env, cPre, cPreHandle);
  const implement = getOption(env, nImplement);

  let realParams = { ...params };

  Object.keys(realParams).forEach(key => {
    const newKey = req[key];
    if (newKey && typeof newKey === 'string') {
      // make a new key
      realParams[newKey] = realParams[key];
      // delete old key
      delete realParams[key];
    }
  });

  if (commonPre) {
    const result = commonPre(realParams);

    // if return a new object, use it
    if (result) realParams = result;
  }
  if (pre) {
    const result = pre(realParams);

    // if return a new object, use it
    if (result) realParams = result;
  }

  if (implement) {
    /* eslint-disable consistent-return */
    return new Promise(resolve => {
      const callback = result => {
        if (sets.debug) {
          info(`custom fetch implement for name[${name}]:`);
          info(`request params is`, realParams);
          info(`result is`, result);
        }

        resolve(postHandle(name, realParams)(result));
      };

      const promise = implement(result => {
        callback(result);
      }, !stringify ? realParams : JSON.stringify(realParams));

      // return a Promise
      if (promise && promise instanceof Promise)
        promise.then(result => {
          callback(result);
        });
    });
  }
  settings.method = method;
  if (method === 'get' || method === 'GET') {
    const newUrl =
      url + (url.indexOf('?') < 0 ? '?' : '&') + makeSearch(realParams);
    return fetch(newUrl, settings)
      .then(afterFetch)
      .then(postHandle(name, realParams));
  }

  settings.body = stringify
    ? JSON.stringify(realParams)
    : makeUrlSearchParams(realParams);

  if (
    method !== 'get' &&
    method !== 'GET' &&
    method !== 'head' &&
    method !== 'HEAD'
  ) {
    if (!settings.headers) settings.headers = {};

    if (!settings.headers['Content-Type'])
      settings.headers['Content-Type'] = stringify
        ? 'application/json'
        : 'application/x-www-form-urlencoded;charset=UTF-8';
  }

  return fetch(url, settings)
    .then(afterFetch)
    .then(postHandle(name, realParams));
};

send.config = addConfig;
send.setEnv = setEnv;
send.getEnv = getEnv;
send.set = setSettings;

export default send;
