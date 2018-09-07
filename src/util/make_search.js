/**
 * {a: 1, b: 2} => a=1&b=2
 *
 * @param params
 * @returns {string}
 */
export default function(params) {
  if (!params) return '';

  const search = [];

  Object.keys(params).forEach(key => {
    search.push(`${key}=${typeof params[key] === 'undefined' ? '' : params[key]}`);
  });

  return search.join('&');
}
