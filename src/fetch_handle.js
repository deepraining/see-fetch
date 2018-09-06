const setting = require('./setting');

module.exports = res => {
  // has error
  if (res.status >= 300) {
    const ret = { response: res };

    ret[setting.errorField] = !0;

    return ret;
  }

  return res.json();
};
