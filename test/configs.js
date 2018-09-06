const seeFetch = require('../dist/see-fetch');

seeFetch.config('common', {
  settings: {
    headers: {
      customCommonHeader: 'customCommonHeader',
    },
  },
  responseRefactor: [{ message: 'msg' }, { message: 'msg' }],
  preHandle: [
    req => {
      req.common = 0;
    },
    req => {
      req.common = 1;
    },
  ],
  postHandle: [
    res => {
      res.success = res.code >= 0;
      res.common = 0;
    },
    res => ({ ...res, success: res.code >= 0, common: 1 }),
  ],
});

seeFetch.config({
  fetch1: {
    method: [undefined, 'post'],
  },
});
