/**
 * {a: 1, b: 2} => a=1&b=2
 *
 * @param params
 * @returns {string}
 */
module.exports = params => {
    if (!params) return '';

    let search = [];

    for (let attr in params) {
        if (params.hasOwnProperty(attr)) search.push(attr + '=' + (typeof params[attr] === 'undefined' ? '' : params[attr]));
    }

    return search.join('&');
};
