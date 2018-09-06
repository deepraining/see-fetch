const config = require('./config');
const setEnv = require('./set_env');
const getEnv = require('./get_env');
const send = require('./send');
const set = require('./set');

const seeFetch = send;

seeFetch.config = config;
seeFetch.setEnv = setEnv;
seeFetch.getEnv = getEnv;
seeFetch.set = set;

module.exports = seeFetch;
