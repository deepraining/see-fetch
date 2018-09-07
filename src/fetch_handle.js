import setting from './setting';

export default function(res) {
  // Has error
  if (res.status >= 300) return { [setting.errorField]: !0, response: res };

  return res.json();
}
