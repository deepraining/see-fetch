const prefix = 'see-fetch: ';

export const log = (str, ...rest) => {
  console.log(prefix + str, ...rest);
};

export const info = (str, ...rest) => {
  console.info(prefix + str, ...rest);
};

export const warn = (str, ...rest) => {
  console.warn(prefix + str, ...rest);
};

export const error = (str, ...rest) => {
  console.error(prefix + str, ...rest);
};

export const throwError = str => {
  throw new Error(prefix + str);
};
