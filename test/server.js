const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { port, response } = require('./share');

const app = new Koa();

const keys = [
  'headers',
  'method',
  'length',
  'url',
  'originalUrl',
  'origin',
  'href',
  'path',
  'querystring',
  'search',
  'host',
  'hostname',
  'URL',
  'query',
  'body',
  'rawBody',
];

app.use(bodyParser());
app.use(ctx => {
  const { request } = ctx;

  if (request.path === '/error') throw new Error('Errors occurred.');

  const requestInRes = {};
  keys.forEach(key => {
    requestInRes[key] = request[key];
  });

  ctx.body = JSON.stringify({
    ...response,
    request: requestInRes,
  });
});

const server = app.listen(port);

module.exports = server;
