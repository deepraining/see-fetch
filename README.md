# see-fetch

A window.fetch wrapper, with customizing request keys, refactoring response, pre handling, post handling, etc.

## requirements

* [json-refactor](https://github.com/senntyou/json-refactor)

## related

* [see-ajax](https://github.com/senntyou/see-ajax)

## note

* Only for `json` response.

## quick start

### 1. load resources

```
const seeFetch = require('see-fetch');
seeFetch(...);
```

### 2. config application

```
seeFetch.config(name, {
    method: [...],
    stringify: [...],
    settings: [...],
    url: [...],
    requestKeys: [...],
    responseRefactor: [...],
    preHandle: [...],
    postHandle: [...],
    implement: [...]
});
```

### 3. use

```
seeFetch(name, reqData)
    .then(res => { ... });
```

## config options

### method

Which http method to use, default is `GET`.

```
method: [
    'delete', // env: 0, use DELETE
    'put', // env: 1, use PUT
    'post'// env: 2, use POST
    // other env, use GET
]
```

### stringify

Whether stringify request data, and put it into `body`, but not in the `header`.

Default is `false`.

* note: If `GET` method, request data will always not stringify.

```
stringify: [
    void 0, // env: 0, no
    true // env: 1, yes
    // other env, no
]
```

### settings

Extra fetch options.

```
settings: [
    {...}, // env: 0
    {...} // env: 1
]
```

### url

Url to request.

```
url: [
    'url1', //env: 0
    'url2', //env: 1
    'url3' //env: 2
]
```

### requestKeys

Request keys mapping.

```
requestKeys: [
    {displayKey: 'realKey'}, // env: 0
    {displayKey: 'realKey'}, // env: 1
    {displayKey: 'realKey'}, // env: 2
]
```

### responseRefactor

Refactor response data, after `fetch` responding.

```
responseRefactor: [
    {... refactor map ...}, // env: 0
    {... refactor map ...}, // env: 1
    {... refactor map ...}, // env: 2
]
```

* `refactor map`: see [json-refactor](https://github.com/senntyou/json-refactor)

### preHandle

More handling after `requestKeys`, before `fetch` sending.

```
preHandle: [
    (reqData) => {... do something ...}, // env: 0
    (reqData) => {... do something ...}, // env: 1
    (reqData) => {... do something ...}, // env: 2
]
```

### postHandle

More handling after `responseRefactor`.

```
postHandle: [
    (res, reqData, name) => {... do something ...}, // env: 0
    (res, reqData, name) => {... do something ...}, // env: 1
    (res, reqData, name) => {... do something ...}, // env: 2
]
```

### implement

Custom request implementing instead of `fetch`.

Sometimes, you have to not use `fetch`, instead using other ways. So, this is what you want.

```
implement: [
    (cb, reqData) => { ... cb(result) }, // env: 0
    (cb, reqData) => { ... cb(result) }, // env: 1
    (cb, reqData) => { ... or return a promise }, // env: 2
]
```

* `note`: After get you own data, you should call `cb` callback(the first argument) with a result, like ajax response.

## api

### config

Config application.

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

Set current environment.

```
seeFetch.setEnv(0/1/2/3);
```

### getEnv

Get current environment.

```
var env = seeFetch.getEnv(); // 0/1/2/3
```

### seeFetch

Make a request.

```
seeFetch(name, reqData)
    .then(res => { ... });
```

* `name`: Defined request name.
    - `note`: `common` is a special request name, for this will apply to all request.
* `reqData`: Request data
    - `type`: `map`
    - `example`: `{a: 1, b: '2'}`
* `res`: Handled ultimate response json. But if response status is `3XX, 4XX, 5XX`, `res` will be like: `{error: true, response: Response}`
    - `error`: Mark response having errors, and you can customize it by `seeFetch.set({errorField: 'yourErrorField'});`
    - `response`: Original [Response Object](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)

### set

Set custom config.

```
seeFetch.set({
    errorField: 'error',
    debug: !0
});
```

* `errorField`: Config your own error field, default is `error`.

* `debug`: Whether in debug mode, default is `true`.

## handlers sequences while processing

1. `method`: Check which http method to use, default is `GET`.
2. `stringify`: Check whether to stringify request data.
3. `settings`: Check extra fetch settings.
4. `url`: Get request url.
5. `requestKeys`: Get real request data.
6. `preHandle`: More handling before send a request.
    1. `common`: Common handling, if have.
    2. `name`: Named handling.
7. `implement`: If have, return a custom response data, and will not send a fetch.
8. `responseRefactor`: Refactoring response data.
    1. `common`: Common handling, if have.
    2. `name`: Named handling.
9. `postHandle`: More handling after refactoring response data.
    1. `common`: Common handling, if have.
    2. `name`: Named handling.

## [demo code](./example)
