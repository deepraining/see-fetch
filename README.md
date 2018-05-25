# A window.fetch wrapper, with custom request keys, response refactoring, pre handling, post handling.

## requirements

* [json-refactor](https://github.com/senntyou/json-refactor)

## related

* [see-ajax](https://github.com/senntyou/see-ajax)

## note

* only for `json` response

## quick start

### 1. load resources

```
const seeFetch = require('see-fetch');
seeFetch(...);
```

### 2. config current application

```
seeFetch.config(name, {
    // options: method, stringify, settings, url, requestKeys, responseRefactor, preHandle, postHandle, implement, implementDelay
});
```

### 3. use

```
seeFetch(name, reqData)
    .then(res => { ... });
```

## config options

example:

```
{
    method: [...],
    stringify: [...],
    settings: [...],
    url: [...],
    requestKeys: [...],
    responseRefactor: [...],
    preHandle: [...],
    postHandle: [...],
    implement: [...],
    implementDelay: [...]
}
```

### method

tell which http method to request, default is `GET`.

```
method: [
    'delete', // env: 0, use DELETE
    'put', // env: 1, use PUT
    'post'// env: 2, use POST
    // other env, use GET
]
```

### stringify

whether stringify request data, default is `false`, and request will use `application/x-www-form-urlencoded`(`POST`, `PUT`, `DELETE`).
if `true`, request will use a string in the body.

* note: if `GET` method, request data will always not to stringify.

```
stringify: [
    void 0, // env: 0, no
    true // env: 1, yes
    // other env, no
]
```

### settings

extra fetch options

```
settings: [
    {...}, // env: 0
    {...} // env: 1
]
```

### url

url to request data

```
url: [
    'url1', //env: 0
    'url2', //env: 1
    'url3' //env: 2
]
```

### requestKeys

request keys mapping

```
requestKeys: [
    {displayKey: 'realKey'}, // env: 0
    {displayKey: 'realKey'}, // env: 1
    {displayKey: 'realKey'}, // env: 2
]
```

### responseRefactor

refactor response data, after `fetch` responding

```
responseRefactor: [
    {... refactor map ...}, // env: 0
    {... refactor map ...}, // env: 1
    {... refactor map ...}, // env: 2
]
```

* `refactor map`: see [json-refactor](https://github.com/senntyou/json-refactor)

### preHandle

more handling after `requestKeys`, before fetch sending

```
preHandle: [
    (reqData) => {... do something ...}, // env: 0
    (reqData) => {... do something ...}, // env: 1
    (reqData) => {... do something ...}, // env: 2
]
```

### postHandle

more handling after `responseRefactor`

```
postHandle: [
    (res, reqData, name) => {... do something ...}, // env: 0
    (res, reqData, name) => {... do something ...}, // env: 1
    (res, reqData, name) => {... do something ...}, // env: 2
]
```

### implement

custom implement instead of `fetch`.

sometimes, you have not to use `fetch`, but other ways, for some reasons, this is what you want.

```
implement: [
    reqData => {... return a response ...}, // env: 0
    reqData => {... return a response ...}, // env: 1
    reqData => {... return a response ...}, // env: 2
]
```

* `note`: every function should return a value, like fetch response

### implementDelay

milliseconds delay for implement, default is `0`

```
implementDelay: [
    1000, // 1 second delay
    100 // 0.1 second delay
]
```

## api

### config

config current application

```
// one
seeFetch.config(name, options);

// multi
seeFetch.config({
    name1: options1,
    name2: options2,
    ...
});
```

### setEnv

set current environment

```
seeFetch.setEnv(0/1/2/3);
```

### getEnv

get current environment

```
var env = seeFetch.getEnv(); // 0/1/2/3
```

### seeFetch

make a request

```
seeFetch(name, reqData)
    .then(res => { ... });
```

* `name`: defined request name
    - `note`: `common` is a special request name, for this will apply to all request.
* `reqData`: request data
    - `type`: `map`
    - `example`: `{a: 1, b: '2'}`
* `res`: handled ultimate response json. but if response status is `3XX, 4XX, 5XX`, `res` is like this: `{error: true, response: Response}`
    - `error`: mark response has error, and you can custom it by `seeFetch.set({errorField: 'yourErrorField'});`
    - `response`: original [Response Object](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)

### set

set custom config;

```
seeFetch.set({
    errorField: 'error',
    debug: !0
});
```

* `errorField`: config your own error field, default is `error`

* `debug`: whether in debug mode, default is `true`

## handlers sequences while processing

1. `method`: check which http method to request, default is `GET`.
2. `stringify`: check whether to stringify request data.
3. `settings`: check extra fetch options.
4. `url`: get request url
5. `requestKeys`:  get real request data
6. `preHandle`: more handling before send a request
    1. `common`: common handling, if have
    2. `name`: named handling
7. `implement`: if have, return a custom response data, and will not send a `fetch`
8. `responseRefactor`: refactoring response data
    1. `common`: common handling, if have
    2. `name`: named handling
9. `postHandle`: more handling after refactoring response data
    1. `common`: common handling, if have
    2. `name`: named handling

## [demo code](./example)
