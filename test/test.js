// This should be the first.
require('./configs');

const seeFetch = require('../dist/see-fetch');
const server = require('./server');

describe('all fetch tests', () => {
  afterAll(() => {
    seeFetch.setEnv(0);
    server.close();
  });

  test('fetch a non existed name.', () => {
    const ret = seeFetch('non-exist');

    expect(ret).toBeUndefined();
  });

  test('fetch "fetch1" [env=0].', done => {
    seeFetch('fetch1', { key1: 1, key2: 2, key3: '3' }).then(res => {
      const { request } = res;

      expect(seeFetch.getEnv()).toBe(0);

      expect(request.headers.header0).toBe('header0');
      expect(request.method).toBe('GET');
      expect(request.path).toBe('/url11');
      expect(request.url).toBe('/url11?key3=3&key11=1&key12=2&common=0&fetch1=0');
      expect(Object.keys(request.query).length).toBe(5);
      expect(request.query.key11).toBe('1');
      expect(request.query.key12).toBe('2');
      expect(request.query.key3).toBe('3');
      expect(request.query.common).toBe('0');
      expect(request.query.fetch1).toBe('0');
      expect(Object.keys(request.body).length).toBe(0);

      expect(res.code).toBe(0);
      expect(res.success).toBe(true);
      expect(res.msg).toBe('success');
      expect(res.message).toBe('success');
      expect(res.common).toBe(0);
      expect(res.fetch1).toBe(0);
      expect(res.newData1.length).toBe(2);
      expect(Object.keys(res.newData1[0]).length).toBe(4); // id, name, images, newImages1
      expect(Object.keys(res.newData1[0].newImages1[0]).length).toBe(3); // id, url, newUrl1
      expect(res.newData1[0].newImages1[0].newUrl1).toBe('url11');

      done();
    });
  });

  test('fetch "fetch1" [env=1].', done => {
    seeFetch.setEnv(1);

    seeFetch('fetch1', { key1: 1, key2: 2, key3: '3' }).then(res => {
      const { request } = res;

      expect(seeFetch.getEnv()).toBe(1);

      expect(request.headers.header1).toBe('header1');
      expect(request.method).toBe('POST');
      expect(request.path).toBe('/url12');
      expect(request.url).toBe('/url12');
      expect(Object.keys(request.body).length).toBe(5);
      expect(request.body.key21).toBe('1');
      expect(request.body.key22).toBe('2');
      expect(request.body.key3).toBe('3');
      expect(request.body.common).toBe('1');
      expect(request.body.fetch1).toBe('1');
      expect(Object.keys(request.query).length).toBe(0);

      expect(res.code).toBe(0);
      expect(res.success).toBe(true);
      expect(res.msg).toBe('success');
      expect(res.message).toBe('success');
      expect(res.common).toBe(1);
      expect(res.fetch1).toBe(1);
      expect(res.newData2.length).toBe(2);
      expect(Object.keys(res.newData2[0]).length).toBe(4); // id, name, images, newImages2
      expect(Object.keys(res.newData2[0].newImages2[0]).length).toBe(3); // id, url, newUrl2
      expect(res.newData2[0].newImages2[0].newUrl2).toBe('url11');

      done();
    });
  });

  test('fetch "fetch1" [env=2].', done => {
    seeFetch.setEnv(2);

    seeFetch('fetch1', { key1: 1, key2: 2, key3: '3' }).then(res => {
      const { request } = res;

      expect(seeFetch.getEnv()).toBe(2);

      expect(request.method).toBe('PUT');
      expect(request.url).toBe('/url13');
      expect(Object.keys(request.body).length).toBe(3);
      expect(request.body.key1).toBe(1);
      expect(request.body.key2).toBe(2);
      expect(request.body.key3).toBe('3');
      expect(Object.keys(request.query).length).toBe(0);

      done();
    });
  });

  test('fetch "fetch2" [env=0].', done => {
    seeFetch.setEnv(0);

    seeFetch('fetch2', { key1: 1, key2: 2, key3: '3' }).then(res => {
      const { request } = res;

      expect(seeFetch.getEnv()).toBe(0);

      expect(request.method).toBe('GET');
      expect(request.url).toBe('/url21?key1=1&key2=2&key3=3&common=0');
      expect(Object.keys(request.query).length).toBe(4);
      expect(request.query.key1).toBe('1');
      expect(request.query.key2).toBe('2');
      expect(request.query.key3).toBe('3');
      expect(Object.keys(request.body).length).toBe(0);

      done();
    });
  });

  test('fetch "fetch2" [env=1].', done => {
    seeFetch.setEnv(1);

    seeFetch('fetch2', { key1: 1, key2: 2, key3: '3' }).then(res => {
      const { request } = res;

      expect(seeFetch.getEnv()).toBe(1);

      expect(request.method).toBe('GET');
      expect(request.url).toBe('/url22?key1=1&key2=2&key3=3&common=1');
      expect(Object.keys(request.query).length).toBe(4);
      expect(request.query.key1).toBe('1');
      expect(request.query.key2).toBe('2');
      expect(request.query.key3).toBe('3');
      expect(Object.keys(request.body).length).toBe(0);

      done();
    });
  });

  test('fetch "error" [env=0].', done => {
    seeFetch.setEnv(0);

    seeFetch('error', { key1: 1, key2: 2, key3: '3' }).then(res => {
      const { error, response } = res;

      expect(seeFetch.getEnv()).toBe(0);

      expect(error).toBe(true);
      expect(response).toBeDefined();

      done();
    });
  });

  test('fetch "error" [env=0] custom error filed.', done => {
    seeFetch.setEnv(0);
    seeFetch.set({ errorField: 'err', debug: !1 });

    seeFetch('error', { key1: 1, key2: 2, key3: '3' }).then(res => {
      const { err, error, response } = res;

      expect(seeFetch.getEnv()).toBe(0);

      expect(err).toBe(true);
      expect(error).toBeUndefined();
      expect(response).toBeDefined();

      done();
    });
  });

  test('fetch "implement" [env=0].', done => {
    seeFetch.setEnv(0);

    seeFetch('implement', { key1: 1, key2: 2, key3: '3' }).then(res => {
      const { params } = res;

      expect(seeFetch.getEnv()).toBe(0);

      expect(Object.keys(params).length).toBe(5);
      expect(params.key11).toBe(1);
      expect(params.key12).toBe(2);
      expect(params.key3).toBe('3');
      expect(params.common).toBe(0);
      expect(params.fetch1).toBe(0);

      expect(res.code).toBe(0);
      expect(res.success).toBe(true);
      expect(res.msg).toBe('success');
      expect(res.message).toBe('success');
      expect(res.common).toBe(0);
      expect(res.fetch1).toBe(0);
      expect(res.newData1.length).toBe(2);
      expect(Object.keys(res.newData1[0]).length).toBe(4); // id, name, images, newImages1
      expect(Object.keys(res.newData1[0].newImages1[0]).length).toBe(3); // id, url, newUrl1
      expect(res.newData1[0].newImages1[0].newUrl1).toBe('url11');

      done();
    });
  });

  test('fetch "implement" [env=1].', done => {
    seeFetch.setEnv(1);

    seeFetch('implement', { key1: 1, key2: 2, key3: '3' }).then(res => {
      const { params } = res;

      expect(seeFetch.getEnv()).toBe(1);

      expect(Object.keys(params).length).toBe(5);
      expect(params.key21).toBe(1);
      expect(params.key22).toBe(2);
      expect(params.key3).toBe('3');
      expect(params.common).toBe(1);
      expect(params.fetch1).toBe(1);

      expect(res.code).toBe(0);
      expect(res.success).toBe(true);
      expect(res.msg).toBe('success');
      expect(res.message).toBe('success');
      expect(res.common).toBe(1);
      expect(res.fetch1).toBe(1);
      expect(res.newData2.length).toBe(2);
      expect(Object.keys(res.newData2[0]).length).toBe(4); // id, name, images, newImages2
      expect(Object.keys(res.newData2[0].newImages2[0]).length).toBe(3); // id, url, newUrl2
      expect(res.newData2[0].newImages2[0].newUrl2).toBe('url11');

      done();
    });
  });
});
