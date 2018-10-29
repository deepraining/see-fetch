# see-fetch

A `window.fetch` wrapper, with response refactoring, pre handling, post handling, etc.

## requirements

- [json-refactor](https://github.com/senntyou/json-refactor)

## related

- [see-ajax](https://github.com/senntyou/see-ajax)

## note

Only for `json` response.

## quick start

```
npm install see-fetch --save
```

```
import seeFetch from 'see-fetch';

// configure application
seeFetch.config(name, {
  method,
  stringify,
  settings,
  url,
  req,
  refactor,
  pre,
  post,
  implement,
});

// make a request
seeFetch(name, params).then(result => { ... });
```

## config options

### `method`: which http method to use

- `type`: `string`
- `default`: `get`

```
'post/put/delete'
```

### `stringify`: whether to stringify request params

- `type`: `bool`
- `default`: `false`

If `true`, the server will receive string, but not `key-value` pairs.

If `GET` method, request params will not stringify at any time.

### `settings`: extra fetch options

- `type`: `map`
- `default`: `{}`

### `url`: url to request

- `type`: `string`
- `default`: empty string

### `req/requestKeys`: keys mapping of request params

- `type`: `map`
- `default`: `{}`

```
{sourceKey: 'newKey'}
```

### `refactor/responseRefactor`: rules to refactor response using [json-refactor](https://github.com/senntyou/json-refactor)

- `type`: `map`
- `default`: `{}`

```
refactor: rules
```

- `rules`: see [json-refactor](https://github.com/senntyou/json-refactor)

### `pre/preHandle`: more handling to request params

- `type`: `function`

```
params => {... modify params, or return a new params ...}
```

### `post/postHandle`: more handling to response data

- `type`: `function`

```
(result, params, name) => {... modify result, or return a new result }
```

### `implement`: custom implementing instead of `fetch`

- `type`: `function`

```
(cb, params) => { ... cb(result), or return a Promise }
```

Sometimes, you have to not use `fetch`, but other ways, like html templates.

## api

### `seeFetch.config`: configure application

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

### `seeFetch.setEnv`: set current environment(index to get config options)

```
seeFetch.setEnv(0/1/2/3);
```

If you need multiple environments supports, you can configure all config options by array, and then set a env.

If you don't set an environment, 0 will be the default.

```
seeFetch.config(name, {
  method: [method1, method2, ...],
  stringify: [stringify1, stringify2, ...],
  settings: [settings1, settings2, ...],
  url: [url1, url2, ...],
  req: [req1, req2, ...],
  refactor: [refactor1, refactor2, ...],
  pre: [pre1, pre2, ...],
  post: [post1, post2, ...],
  implement: [implement1, implement2, ...],
});

seeFetch.setEnv(0); // method1, stringify1, url1, ...
seeFetch.setEnv(1); // method2, stringify2, url2, ...
```

### `seeFetch.getEnv`: get current environment

```
const env = seeFetch.getEnv(); // 0/1/2/3
```

### `seeFetch`: make a request

```
seeFetch(name, params).then(result => { ... });
```

- `name`: defined request name
  - `note`: `common` is a special request name, and it will apply to all requests
- `params`: request params
  - `type`: `map`
  - `example`: `{a: 1, b: '2'}`
- `result`: handled response data. But if response's status code is `3XX, 4XX, 5XX`, `result` will be like: `{error: true, response: Response}`
  - `error`: mark response having an error, and you can customize it by `seeFetch.set({errorField: 'yourErrorField'})`
  - `response`: original [Response Object](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)

### `seeFetch.set`: set custom config

```
seeFetch.set({
    errorField: 'error',
    debug: !0
});
```

- `errorField`: `string`, default `error`, configure your own error field
- `debug`: `bool`, default `true`, whether in debug mode

## handlers sequences while processing

1. `method`: check which http method to use, default is `GET`
2. `stringify`: check whether to stringify request params
3. `settings`: check extra fetch settings
4. `url`: get request url
5. `req`: get real request params
6. `pre`: more handling before send a request
   1. `common`: common handling, if have
   2. `name`: named handling
7. `implement`: if have, `see-fetch` will not send a `fetch`
8. `refactor`: refactoring response data
   1. `common`: common handling, if have
   2. `name`: named handling
9. `post`: more handling after refactoring response data
   1. `common`: common handling, if have
   2. `name`: named handling
