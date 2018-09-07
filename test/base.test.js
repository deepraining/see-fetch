const seeFetch = require('../dist/see-fetch');
const server = require('./server');

require('./configs');

describe('all fetch tests', () => {
  afterAll(() => {
    server.close();
  });

  test('fetch a non existed name.', () => {
    const ret = seeFetch('non-exist');

    expect(ret).toBeUndefined();
  });

  test('fetch "fetch1" [env=0].', done => {
    const ret = seeFetch('non-exist');

    expect(ret).toBeUndefined();

    done();
  });
});
