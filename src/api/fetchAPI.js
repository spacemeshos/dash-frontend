// @flow

export function fetchAPI(url, options) {
  const fetchOptions = {};
  fetchOptions.method = options && (options.method || 'GET');

  if (options && options.headers) {
    fetchOptions.headers = { ...fetchOptions.headers, ...options.headers };
  }

  return fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((data) => data);
}
