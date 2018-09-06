import share from './share';

/**
 * Configure application.
 *
 * @param name
 * @param options
 */
export default function(name, options) {
  // One
  if (typeof name === 'string') {
    share.optionsCollection[name] = options;
  }
  // Multiple
  else {
    Object.keys(name).forEach(key => {
      share.optionsCollection[key] = name[key];
    });
  }
}
