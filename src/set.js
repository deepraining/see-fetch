
const setting = require('./setting');

module.exports = paramSetting => {
    for (let attr in paramSetting) {
        if (paramSetting.hasOwnProperty(attr) && typeof paramSetting[attr] !== 'undefined') {
            setting[attr] = paramSetting[attr];
        }
    }
};
