const setting = require('./setting');

module.exports = paramSetting => {
  Object.keys(paramSetting).forEach(key => {
    if (typeof paramSetting[key] !== 'undefined') setting[key] = paramSetting[key];
  });
};
