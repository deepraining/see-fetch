const clone = require('clone');
global.fetch = require('node-fetch');
global.URLSearchParams = require('url-search-params');

const seeFetch = require('../dist/see-fetch');
const { port, response } = require('./share');

seeFetch.config('common', {
  responseRefactor: [{ message: 'msg' }, { message: 'msg' }],
  preHandle: [
    req => {
      req.common = 0;
    },
    req => ({ ...req, common: 1 }),
  ],
  postHandle: [
    res => {
      res.success = res.code >= 0;
      res.common = 0;
    },
    res => ({ ...res, success: res.code >= 0, common: 1 }),
  ],
});

const fetch1Config = {
  method: [undefined, 'post', 'put'],
  stringify: [undefined, undefined, true],
  settings: [{ headers: { header0: 'header0' } }, { headers: { header1: 'header1' } }],
  url: [`http://localhost:${port}/url11`, `http://localhost:${port}/url12`, `http://localhost:${port}/url13`],
  requestKeys: [{ key1: 'key11', key2: 'key12' }, { key1: 'key21', key2: 'key22' }],
  responseRefactor: [
    { newData1: 'data', _newData1: [{ newImages1: 'images', _newImages1: [{ newUrl1: 'url' }] }] },
    { newData2: 'data', _newData2: [{ newImages2: 'images', _newImages2: [{ newUrl2: 'url' }] }] },
  ],
  preHandle: [
    req => {
      req.fetch1 = 0;
    },
    req => ({ ...req, fetch1: 1 }),
  ],
  postHandle: [
    res => {
      res.fetch1 = 0;
    },
    res => ({ ...res, fetch1: 1 }),
  ],
};

seeFetch.config({
  fetch1: fetch1Config,
  fetch2: {
    url: [`http://localhost:${port}/url21`, `http://localhost:${port}/url22`],
  },
  error: {
    url: [`http://localhost:${port}/error`],
  },
  implement: {
    ...fetch1Config,
    implement: [
      (cb, params) => {
        cb({ ...clone(response), params });
      },
      (cb, params) =>
        new Promise(resolve => {
          resolve({ ...clone(response), params });
        }),
    ],
  },
});
