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

      // console.log(res);

      expect(seeFetch.getEnv()).toBe(1);

      expect(request.headers.header1).toBe('header1');
      expect(request.method).toBe('POST');
      expect(request.path).toBe('/url12');
      expect(request.url).toBe('/url12');
      // todo
      // expect(Object.keys(request.query).length).toBe(5);
      // expect(request.query.key11).toBe('1');
      // expect(request.query.key12).toBe('2');
      // expect(request.query.key3).toBe('3');
      // expect(request.query.common).toBe('0');
      // expect(request.query.fetch1).toBe('0');
      // expect(Object.keys(request.body).length).toBe(0);

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

      console.log(res);

      expect(seeFetch.getEnv()).toBe(2);

      expect(request.method).toBe('PUT');
      expect(request.url).toBe('/url13');
      // todo
      // expect(Object.keys(request.query).length).toBe(5);
      // expect(request.query.key11).toBe('1');
      // expect(request.query.key12).toBe('2');
      // expect(request.query.key3).toBe('3');
      // expect(request.query.common).toBe('0');
      // expect(request.query.fetch1).toBe('0');
      // expect(Object.keys(request.body).length).toBe(0);

      done();
    });
  });
});
