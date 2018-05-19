
const postHandle = require('./post_handle');
const setting = require('./setting');

module.exports = (name, ultimateReqData) => {
    return res => {
        // has error
        if (res[setting.errorField]) return res;

        // post handle
        postHandle(res, ultimateReqData, name);

        return res;
    };
};
