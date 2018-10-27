/**
 * {a: 1, b: 2} => a=1&b=2
 *
 * @param params
 * @returns {string}
 */
export const makeSearch = params => {
  if (!params) return '';

  const search = [];

  Object.keys(params).forEach(key => {
    search.push(
      `${key}=${typeof params[key] === 'undefined' ? '' : params[key]}`
    );
  });

  return search.join('&');
};

/**
 * {a: 1, b: 2} => URLSearchParam({a: 1, b: 2})
 *
 * @param params
 * @returns {URLSearchParams}
 */
export const makeUrlSearchParams = params => {
  const search = new URLSearchParams();

  if (!params) return search;

  Object.keys(params).forEach(key => {
    search.append(key, typeof params[key] === 'undefined' ? '' : params[key]);
  });

  return search;
};

export const getOption = (env, first, second) => {
  let result;

  if (typeof first !== 'undefined') {
    if (Array.isArray(first)) result = first[env];
    else result = first;
  } else if (typeof second !== 'undefined') {
    if (Array.isArray(second)) result = second[env];
    else result = second;
  }

  return result;
};
