import setting from './setting';

export default function(params) {
  if (!params) return;

  Object.keys(params).forEach(key => {
    setting[key] = params[key];
  });
}
