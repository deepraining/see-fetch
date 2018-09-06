import postHandle from './post_handle';
import setting from './setting';

export default (name, params) => res => {
  // Has error.
  if (res[setting.errorField]) return res;

  return postHandle(res, params, name);
};
