import {authService} from "./auth-service";

export const httpService = {
  get(path, queryParams) {
    return this.request(path + '?' + new URLSearchParams(queryParams), 'GET', null)
  },

  post(path, body) {
    return this.request(path, 'POST', body)
  },

  put(path, body) {
    return this.request(path, 'PUT', body)
  },

  patch(path, body) {
    return this.request(path, 'PATCH', body)
  },

  delete(path, body) {
    return this.request(path, 'DELETE', body)
  },

  options(path) {
    return this.request(path, 'OPTIONS');
  },

  request(path, method, body = null) {
    return fetch('http://localhost/api/' + path, {
      method: method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      credentials: 'include',
      body: body && JSON.stringify(body)
    }).then(onResponse);
  }
}

export function onResponse(response) {
  authService.updateSession();

  if (response.ok) {
    return new Promise((resolve, reject) => response.json()
      .then(data => resolve({status: response.status, headers: response.headers, data}))
      .catch(err => reject(err)));
  } else {
    return Promise.reject(response.status);
  }
}
