/**
 * {a: 1, b: 2} => URLSearchParam({a: 1, b: 2})
 *
 * @param params
 * @returns {URLSearchParams}
 */
export default function(params) {
  const search = new URLSearchParams();

  if (!params) return search;

  Object.keys(params).forEach(key => {
    search.append(key, typeof params[key] === 'undefined' ? '' : params[key]);
  });

  return search;
}
