import JSONRefactor from 'json-refactor';

import share from './share';

/**
 * Post handling after getting response data.
 *
 * @param res Response data.
 * @param params Request params.
 * @param name Request name.
 */
export default function(res, params, name) {
  // Current options.
  const options = share.optionsCollection[name];
  // Common options.
  const commonOptions = share.optionsCollection.common || {};

  // Index to select item.
  const index = share.env;

  // Response refactor.
  const responseRefactor = options.responseRefactor && options.responseRefactor[index];
  const commonResponseRefactor = commonOptions.responseRefactor && commonOptions.responseRefactor[index];

  // Post handle.
  const postHandle = options.postHandle && options.postHandle[index];
  const commonPostHandle = commonOptions.postHandle && commonOptions.postHandle[index];

  let response = res;

  if (commonResponseRefactor) JSONRefactor(response, commonResponseRefactor);
  if (responseRefactor) JSONRefactor(response, responseRefactor);
  if (commonPostHandle) {
    const result = commonPostHandle(response, params, name);

    // If return a new object, use it.
    if (result) response = result;
  }
  if (postHandle) {
    const result = postHandle(response, params, name);

    // If return a new object, use it.
    if (result) response = result;
  }

  return response;
}
