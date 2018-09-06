const data = require('./data');

/**
 * config application
 *
 * @param name
 * @param option
 */
module.exports = (name, option) => {
  // one
  if (typeof name === 'string') {
    data.options[name] = option;
  }
  // multi
  else {
    Object.keys(name).forEach(key => {
      data.options[key] = name[key];
    });
  }
};
