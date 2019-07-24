# see-fetch

[English Documentation](./README.en.md)

一个 `window.fetch` 封装器, 能够对响应 Json 对象进行重构, 预处理请求对象, 后置处理响应数据等.

## 依赖

- [json-refactor](https://github.com/senntyou/json-refactor)

## 相关

- [see-ajax](https://github.com/senntyou/see-ajax)

## 注意

仅适用于 `json` 数据响应.

## 快速开始

```
npm install see-fetch --save
```

```
import seeFetch from 'see-fetch';

// 配置应用
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

// 发起一个请求
seeFetch(name, params).then(result => { ... });
```

## 配置项

### `method`: 使用哪个 http 方法

- `type`: `string`
- `default`: `get`

```
'post/put/delete'
```

### `stringify`: 是否序列化请求参数

- `type`: `bool`
- `default`: `false`

如果为 `true`, 则服务器将会收到字符串, 而非 `key-value` 对.

如果是 `GET` 方法, 请求参数在任何情况下都不会被序列化.

### `settings`: 额外的 fetch 配置

- `type`: `map`
- `default`: `{}`

### `url`: 请求链接

- `type`: `string`
- `default`: 空

### `req/requestKeys`: 请求参数键名的映射

- `type`: `map`
- `default`: `{}`

```
{sourceKey: 'newKey'}
```

### `refactor/responseRefactor`: 使用 [json-refactor](https://github.com/senntyou/json-refactor) 重构返回对象的规则

- `type`: `map`
- `default`: `{}`

```
refactor: rules
```

- `rules`: 查看 [json-refactor](https://github.com/senntyou/json-refactor)

### `pre/preHandle`: 对请求参数更多的前置处理

- `type`: `function`

```
(params, name) => {... modify params, or return a new params ...}
```

### `post/postHandle`: 对响应数据更多的后置处理

- `type`: `function`

```
(result, params, name) => {... modify result, or return a new result }
```

### `implement`: 自定义 `fetch` 实现

- `type`: `function`

```
(cb, params) => { ... cb(result), or return a Promise }
```

有时不一定会通过 `fetch` 获取数据, 而是其他方式, 如 html 模板引擎.

## api

### `seeFetch.config`: 配置应用

```
// 一个
seeFetch.config(name, options);

// 多个
seeFetch.config({
  name1: options1,
  name2: options2,
  ...
});
```

### `seeFetch.setEnv`: 设置当前的环境(用于获取配置项)

```
seeFetch.setEnv(0/1/2/3);
```

如果需要配置多个环境支持，可以把所有的配置项设为数组，并设置一个环境值.

如果未设置环境值，则默认是 0.

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

### `seeFetch.getEnv`: 获取当前的环境

```
const env = seeFetch.getEnv(); // 0/1/2/3
```

### `seeFetch`: 发起一个请求

```
seeFetch(name, params).then(result => { ... });
```

- `name`: 定义的请求名
  - `note`: `common` 是一个特殊的请求名, 会应用到所有的请求上
- `params`: 请求参数
  - `type`: `map`
  - `example`: `{a: 1, b: '2'}`
- `result`: 成功的回调. 但如果响应码是 `3XX, 4XX, 5XX`, 则 `result` 会如: `{error: true, response: Response}`
  - `error`: 标记响应出现错误, 当然你可以通过 `seeFetch.set({errorField: 'yourErrorField'})` 自定义这个字段
  - `response`: 原始 [Response Object](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)

### `seeFetch.set`: 设置自定义配置

```
seeFetch.set({
  errorField: 'error',
  debug: !0,
  disableCache: !0,
  disableCacheField: '_',
});
```

- `errorField`: `type: string` `default: error` 配置你的自定义错误字段
- `debug`: `type: bool` `default: true` 是否开启调试模式
- `disableCache`: `type: bool` `default: true` 禁用 `GET, HEAD` 方法请求的缓存功能
- `disableCacheField`: `type: string` `default: _` 当`disableCache` 为 `true` 时, 添加时间戳到原 url 上的字段名

## 各个操作的先后顺序

1. `method`: 检查使用哪个 http 方法, 默认是 `GET`
2. `stringify`: 检查是否序列化请求参数
3. `settings`: 检查额外的 fetch 配置
4. `url`: 获取请求 url
5. `req`: 获取最终的请求参数对象
6. `pre`: 发起请求之前对请求参数的前置操作
   1. `common`: 通用的操作, 如果有
   2. `name`: 当前配置的操作
7. `implement`: 如果有, `see-fetch` 将不会发起 `fetch` 请求
8. `refactor`: 重构响应数据
   1. `common`: 通用的操作, 如果有
   2. `name`: 当前配置的操作
9. `post`: 重构响应对象之后对响应对象的后置操作
   1. `common`: 通用的操作, 如果有
   2. `name`: 当前配置的操作
