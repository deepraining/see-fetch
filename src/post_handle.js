const JSONRefactor = require('json-refactor');

const data = require('./data');

/**
 * post handle after get response data
 *
 * @param res Response data
 * @param reqData Request data
 * @param name Name
 */
module.exports = (res, reqData, name) => {
  // current option
  const option = data.options[name];
  // common option
  const commonOption = data.options.common || {};

  // index to select item
  const index = data.env;

  // response refactor
  const responseRefactor = option.responseRefactor && option.responseRefactor[index];
  const commonResponseRefactor = commonOption.responseRefactor && commonOption.responseRefactor[index];

  // post handle
  const postHandle = option.postHandle && option.postHandle[index];
  const commonPostHandle = commonOption.postHandle && commonOption.postHandle[index];

  if (commonResponseRefactor) JSONRefactor(res, commonResponseRefactor);
  if (responseRefactor) JSONRefactor(res, responseRefactor);
  if (commonPostHandle) commonPostHandle(res, reqData, name);
  if (postHandle) postHandle(res, reqData, name);
};
