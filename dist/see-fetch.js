/*!
 * 
 *     see-fetch v0.0.2-alpha
 * 
 *     https://github.com/senntyou/see-fetch
 * 
 *     @senntyou <jiangjinbelief@163.com>
 * 
 *     2018-05-25 12:03:35
 *     
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("json-refactor"));
	else if(typeof define === 'function' && define.amd)
		define(["json-refactor"], factory);
	else if(typeof exports === 'object')
		exports["seeFetch"] = factory(require("json-refactor"));
	else
		root["seeFetch"] = factory(root["JSONRefactor"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_13__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = {
    // application options
    options: {},
    // environment, default is 0
    env: 0
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    // error field when response statusCode
    errorField: 'error',
    // whether current mode is debug
    debug: !0
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var prefix = 'see-fetch: ';

module.exports = {
    log: function log(str) {
        console.log(prefix + str);
    },
    info: function info(str) {
        console.info(prefix + str);
    },
    warn: function warn(str) {
        console.warn(prefix + str);
    },
    error: function error(str) {
        console.error(prefix + str);
    },
    throwError: function throwError(str) {
        throw new Error(prefix + str);
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var JSONRefactor = __webpack_require__(13);

var data = __webpack_require__(0);
var logger = __webpack_require__(2);

/**
 * post handle after get response data
 *
 * @param res Response data
 * @param reqData Request data
 * @param name Name
 */
module.exports = function (res, reqData, name) {

    // current option
    var option = data.options[name];
    // common option
    var commonOption = data.options['common'] || {};

    // index to select item
    var index = data.env;

    // response refactor
    var responseRefactor = option.responseRefactor && option.responseRefactor[index];
    var commonResponseRefactor = commonOption.responseRefactor && commonOption.responseRefactor[index];

    // post handle
    var postHandle = option.postHandle && option.postHandle[index];
    var commonPostHandle = commonOption.postHandle && commonOption.postHandle[index];

    commonResponseRefactor && JSONRefactor(res, commonResponseRefactor);
    responseRefactor && JSONRefactor(res, responseRefactor);
    commonPostHandle && commonPostHandle(res, reqData, name);
    postHandle && postHandle(res, reqData, name);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var config = __webpack_require__(5);
var setEnv = __webpack_require__(6);
var getEnv = __webpack_require__(7);
var send = __webpack_require__(8);
var set = __webpack_require__(14);

var seeFetch = send;

seeFetch.config = config;
seeFetch.setEnv = setEnv;
seeFetch.getEnv = getEnv;
seeFetch.set = set;

module.exports = seeFetch;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var data = __webpack_require__(0);

/**
 * config application
 *
 * @param name
 * @param option
 */
module.exports = function (name, option) {
    // one
    if (typeof name === 'string') {
        data.options[name] = option;
    }
    // multi
    else {
            for (var attr in name) {
                if (name.hasOwnProperty(attr)) data.options[attr] = name[attr];
            }
        }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var data = __webpack_require__(0);

/**
 * set current environment
 */
module.exports = function (env) {
  data.env = env;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var data = __webpack_require__(0);

/**
 * get current environment
 *
 * @returns {Object.<string, *>|null|*|number}
 */
module.exports = function () {
  return data.env;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var setting = __webpack_require__(1);
var data = __webpack_require__(0);
var logger = __webpack_require__(2);
var makeSearch = __webpack_require__(9);
var makeUrlSearch = __webpack_require__(10);
var fetchHandle = __webpack_require__(11);
var postFetchHandle = __webpack_require__(12);
var postHandle = __webpack_require__(3);

/**
 * send a request
 *
 * @param name Defined request name
 * @param reqData Request data
 */
module.exports = function (name, reqData) {
    if (!name) {
        logger.throwError('name \'' + name + '\' is not defined.');
        return;
    }

    // current option
    var option = data.options[name];
    // common option
    var commonOption = data.options['common'] || {};

    if (!option) {
        logger.throwError('name \'' + name + '\' is not configured.');
        return;
    }

    // index to select item
    var index = data.env;

    // http method, default is GET
    var method = option.method && option.method[index] || 'get';
    // stringify request data
    var stringify = option.stringify && option.stringify[index] || !1;
    // fetch options
    var settings = option.settings && option.settings[index] || {};
    // url
    var url = option.url && option.url[index] || '';
    // request keys
    var requestKeys = option.requestKeys && option.requestKeys[index] || {};
    // pre handle
    var preHandle = option.preHandle && option.preHandle[index];
    var commonPreHandle = commonOption.preHandle && commonOption.preHandle[index];
    // implement
    var implement = option.implement && option.implement[index];
    // implement delay
    var implementDelay = option.implementDelay && option.implementDelay[index];

    // ultimate request data after requestKeys mapping
    var ultimateReqData = Object.assign({}, reqData || {});
    for (var ultimateReqDataAttr in ultimateReqData) {
        if (ultimateReqData.hasOwnProperty(ultimateReqDataAttr) && requestKeys[ultimateReqDataAttr]) {
            // make a new key
            ultimateReqData[requestKeys[ultimateReqDataAttr]] = ultimateReqData[ultimateReqDataAttr];
            // delete old key
            delete ultimateReqData[ultimateReqDataAttr];
        }
    }

    // pre handle
    commonPreHandle && commonPreHandle(ultimateReqData);
    preHandle && preHandle(ultimateReqData);

    // custom implement
    if (implement) {

        var result = implement(!stringify ? ultimateReqData : JSON.stringify(ultimateReqData));

        if (setting.debug) {
            logger.info('Custom implement fetch for "' + name + '", and request data is:');
            console.log(ultimateReqData);
            logger.info('result for "' + name + '" is:');
            console.log(result);
        }

        // post handle
        postHandle(result, ultimateReqData, name);

        return new Promise(function (resolve) {
            if (typeof implementDelay === 'number' && implementDelay > 0) setTimeout(function (_) {
                resolve(result);
            }, implementDelay);else resolve(result);
        });
    } else {
        settings.method = method;
        if (method === 'get' || method === 'GET') {
            var newUrl = url + (url.indexOf('?') < 0 ? '?' : '&') + makeSearch(ultimateReqData);
            return fetch(newUrl, settings).then(fetchHandle).then(postFetchHandle(name, ultimateReqData));
        }

        if (stringify) {
            settings.body = JSON.stringify(ultimateReqData);
            return fetch(url, settings).then(fetchHandle).then(postFetchHandle(name, ultimateReqData));
        }

        settings.body = makeUrlSearch(ultimateReqData);
        return fetch(url, settings).then(fetchHandle).then(postFetchHandle(name, ultimateReqData));
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * {a: 1, b: 2} => a=1&b=2
 *
 * @param params
 * @returns {string}
 */
module.exports = function (params) {
    if (!params) return '';

    var search = [];

    for (var attr in params) {
        if (params.hasOwnProperty(attr)) search.push(attr + '=' + (typeof params[attr] === 'undefined' ? '' : params[attr]));
    }

    return search.join('&');
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * {a: 1, b: 2} => URLSearchParam({a: 1, b: 2})
 *
 * @param params
 * @returns {URLSearchParams}
 */
module.exports = function (params) {
    var search = new URLSearchParams();

    if (!params) return search;

    for (var attr in params) {
        if (params.hasOwnProperty(attr)) search.append(attr, typeof params[attr] === 'undefined' ? '' : params[attr]);
    }

    return search;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setting = __webpack_require__(1);

module.exports = function (res) {
    // has error
    if (res.status >= 300) {
        var ret = { response: res };

        ret[setting.errorField] = !0;

        return ret;
    }

    return res.json();
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var postHandle = __webpack_require__(3);
var setting = __webpack_require__(1);

module.exports = function (name, ultimateReqData) {
    return function (res) {
        // has error
        if (res[setting.errorField]) return res;

        // post handle
        postHandle(res, ultimateReqData, name);

        return res;
    };
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setting = __webpack_require__(1);

module.exports = function (paramSetting) {
    for (var attr in paramSetting) {
        if (paramSetting.hasOwnProperty(attr) && typeof paramSetting[attr] !== 'undefined') {
            setting[attr] = paramSetting[attr];
        }
    }
};

/***/ })
/******/ ]);
});