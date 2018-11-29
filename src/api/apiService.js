import axios from 'axios';
import { getStore } from '../index';

const errorMessage = {
  title: 'Oops',
  text: 'There was an error',
};

const handleErrors = (response) =>
  new Promise((resolve, reject) => {
    if (!response || response.status === 500) {
      reject(errorMessage);
      return;
    }

    if (response.status === 200 || response.status === 204) {
      resolve(response);
      return;
    }
  });

const getResponseBody = (response) => {
  const bodyIsEmpty = response.status === 204;
  if (bodyIsEmpty) {
    return Promise.resolve();
  }

  return response.data;
};

class Api {

  getConfig(hasFile) {
    let config = {};
    let user = getStore().getState().loginReducer.user;
    let token = user ? user.token : null;

    if (token) {
      config = {
        ...config,
        headers: {
          'X-USER-TOKEN': token,
          'Content-Type': hasFile ? undefined : 'application/json',
        },
      };
    }
    return config;
  }

  get(uri) {
    return new Promise((resolve, reject) => {
      axios
        .get(uri, this.getConfig())
        .then(handleErrors)
        .then(getResponseBody)
        .then(response => resolve(response))
        .catch(() => reject(errorMessage));
    });
  }

  post(uri, data, hasFile = false) {
    return new Promise((resolve, reject) => {
      axios
        .post(uri, data, this.getConfig(hasFile))
        .then(handleErrors)
        .then(getResponseBody)
        .then(response => resolve(response))
        .catch(error => reject(
          error.response.data.error ||
          error.response.data.errors)
        );
    });
  }

  delete(uri) {
    return new Promise((resolve, reject) => {
      axios
        .delete(uri, this.getConfig())
        .then(handleErrors)
        .then(getResponseBody)
        .then(response => resolve(response))
        .catch(() => reject(errorMessage));
    });
  }

  put(uri, data, hasFile = false) {
    return new Promise((resolve, reject) => {
      axios
        .put(uri, data, this.getConfig(hasFile))
        .then(handleErrors)
        .then(getResponseBody)
        .then(response => resolve(response))
        .catch((error) => reject(
          error.response.data.error ||
          error.response.data.errors)
        );
    });
  }

  patch(uri, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch(uri, data, this.getConfig())
        .then(handleErrors)
        .then(getResponseBody)
        .then(response => resolve(response))
        .catch((error) => reject(
          error.response.data.error ||
          error.response.data.errors)
        );
    });
  }
}

export default new Api();
