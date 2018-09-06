const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

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

  const requestInRes = {};
  keys.forEach(key => {
    requestInRes[key] = request[key];
  });

  ctx.body = JSON.stringify({
    request: requestInRes,
    code: 0,
    msg: 'success',
    data: [
      {
        id: 1,
        name: 'name1',
        images: [{ id: 11, url: 'url11' }, { id: 12, url: 'url12' }],
      },
      {
        id: 2,
        name: 'name2',
        images: [{ id: 21, url: 'url21' }, { id: 22, url: 'url22' }],
      },
    ],
  });
});

const server = app.listen(3000);

module.exports = server;
