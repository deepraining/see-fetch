/**
 * {a: 1, b: 2} => URLSearchParam({a: 1, b: 2})
 *
 * @param params
 * @returns {URLSearchParams}
 */
module.exports = params => {
    let search = new URLSearchParams();

    if (!params) return search;

    for (let attr in params) {
        if (params.hasOwnProperty(attr)) search.append(attr, typeof params[attr] === 'undefined' ? '' : params[attr]);
    }

    return search;
};
