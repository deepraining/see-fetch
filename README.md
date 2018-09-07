# see-fetch

A `window.fetch` wrapper, with customizing request keys, refactoring response, pre handling, post handling, etc.

## requirements

- [json-refactor](https://github.com/senntyou/json-refactor)

## related

- [see-ajax](https://github.com/senntyou/see-ajax)

## note

- Only for `json` response.

## Quick start.

```
const seeFetch = require('see-fetch');
```

Configure application.

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

Make a request.

```
seeFetch(name, params)
    .then(result => { ... });
```

## Config options.

### `method`

Decide which http method to use. Default is `GET`.

```
method: [
    'delete', // env: 0, DELETE
    'put', // env: 1, PUT
    'post'// env: 2, POST
    // other env, GET
]
```

### `stringify`

Decide Whether to stringify request params. If `true`, the server will receive string, but not `key-value` pairs. Default is `false`.

- note: If `GET` method, request params will not stringify at any time.

```
stringify: [
    undefined, // env: 0, no
    true // env: 1, yes
    // other env, no
]
```

### `settings`

Extra fetch options.

```
settings: [
    {...}, // env: 0
    {...} // env: 1
]
```

### `url`

Url to request.

```
url: [
    'url1', //env: 0
    'url2', //env: 1
    'url3' //env: 2
]
```

### `requestKeys`

Request keys mapping.

```
requestKeys: [
    {sourceKey: 'newKey'}, // env: 0
    {sourceKey: 'newKey'}, // env: 1
    {sourceKey: 'newKey'}, // env: 2
]
```

### `responseRefactor`

Refactor response json data, after `fetch` responding.

```
responseRefactor: [
    {... refactor rules ...}, // env: 0
    {... refactor rules ...}, // env: 1
    {... refactor rules ...}, // env: 2
]
```

- `refactor rules`: see [json-refactor](https://github.com/senntyou/json-refactor)

### `preHandle`

More handling after `requestKeys`, before `fetch` sending.

```
preHandle: [
    params => {... modify params, or return a new params ...}, // env: 0
    params => {... modify params, or return a new params ...}, // env: 1
    params => {... modify params, or return a new params ...}, // env: 2
]
```

### `postHandle`

More handling after `responseRefactor`.

```
postHandle: [
    (result, params, name) => {... modify result, or return a new result }, // env: 0
    (result, params, name) => {... modify result, or return a new result }, // env: 1
    (result, params, name) => {... modify result, or return a new result }, // env: 2
]
```

### `implement`

Custom request implementing instead of `fetch`.

Sometimes, you have to not use `fetch`, but other ways, like html templates.

```
implement: [
    (cb, params) => { ... cb(result), or return a Promise }, // env: 0
    (cb, params) => { ... cb(result), or return a Promise }, // env: 1
    (cb, params) => { ... cb(result), or return a Promise }, // env: 2
]
```

## api

### `config`

Configure application.

```
// one
seeFetch.config(name, options);

// multiple
seeFetch.config({
    name1: options1,
    name2: options2,
    ...
});
```

### `setEnv`

Set current environment.

```
seeFetch.setEnv(0/1/2/3);
```

### `getEnv`

Get current environment.

```
const env = seeFetch.getEnv(); // 0/1/2/3
```

### `seeFetch`

Make a request.

```
seeFetch(name, params)
  .then(result => { ... });
```

- `name`: Defined request name.
  - `note`: `common` is a special request name, for this will apply to all request.
- `params`: Request params.
  - `type`: `map`
  - `example`: `{a: 1, b: '2'}`
- `result`: Handled ultimate response json result. But if response status is `3XX, 4XX, 5XX`, `result` will be like: `{error: true, response: Response}`
  - `error`: Mark response having errors, and you can customize it by `seeFetch.set({errorField: 'yourErrorField'});`
  - `response`: Original [Response Object](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)

### `set`

Set custom config.

```
seeFetch.set({
    errorField: 'error',
    debug: !0
});
```

- `errorField`: Config your own error field, default is `error`.

- `debug`: Whether in debug mode, default is `true`.

## Handlers sequences while processing.

1. `method`: Check which http method to use, default is `GET`.
2. `stringify`: Check whether to stringify request params.
3. `settings`: Check extra fetch settings.
4. `url`: Get request url.
5. `requestKeys`: Get real request params.
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
