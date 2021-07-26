import {authService} from "./auth-service";

export const httpService = {
  get(path, queryParams) {
    return this.request(path + '?' + new URLSearchParams(queryParams), 'GET')
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

  request(path, method, body = {}) {
    return fetch('api/' + path, {
      method: method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(body)
    }).then()
      .then(onResponse);
  }
}

export function onResponse(response) {
  authService.updateSession();

  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response.status);
  }
}
