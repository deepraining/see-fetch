import config from './config';
import setEnv from './set_env';
import getEnv from './get_env';
import send from './send';
import set from './set';

send.config = config;
send.setEnv = setEnv;
send.getEnv = getEnv;
send.set = set;

export default send;
