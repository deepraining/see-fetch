// const seeFetch = require('../dist/see-fetch');
const server = require('./server');

require('./configs');

describe('all fetch tests', () => {
  afterAll(() => {
    server.close();
  });
});
