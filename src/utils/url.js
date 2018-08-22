import reduce from 'lodash/reduce';

export const paramsSerializer = (params = {}) =>
  reduce(
    params,
    (queryString, value, key) => [
      ...queryString,
      `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    ],
    []
  ).join('&');
