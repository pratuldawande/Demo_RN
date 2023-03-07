/* eslint-disable import/no-cycle */
/* eslint no-undef: "error" */

import axios from 'axios';
import {BASE_URL} from '@env';

const serverError = 500;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.timeout = 30000;

axios.interceptors.response.use(
  response => {
    const res = response;
    response.config.meta.responseTime =
      new Date().getTime() - response.config.meta.requestTimestamp;
    return res;
  },
  error => {
    // if (error?.response?.status >= 500) Sentry.captureMessage(error);
    // if (error.response && error.response.status >= serverError) {
    //   /* eslint-disable no-param-reassign */
    //   error.name = `API Error (${error.response.status})`;
    // }
    // const errorData = ApiFailMessageFilter(error);
    // if (errorData.status === API_STATUS.UNAUTHORIZED) {
    //   // When API auth token expired then remove saved token
    //   showToast('Sesión expirada', 'error');
    //   removeAuthInfoCookie();
    //   resetAllContext();
    // } else if (errorData.status === 500 || errorData.status === 401) {
    //   openServerError();
    // }
    /* eslint-disable prefer-promise-reject-errors */
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  request => {
    request.meta = request.meta || {};
    request.meta.requestTimestamp = new Date().getTime();
    return request;
  },
  error => Promise.reject(error),
);

const AxiosService = () => {
  let Authorization = null;
  let ApiKey = null;

  function addHeaders(userConfig) {
    const {params, headers = {}, timeout, ...restConfigs} = userConfig;
    const globalHeaders = {};

    // if (Authorization) {
    //   globalHeaders[API_HEADER_KEYS.SESSION_TOKEN] = `${Authorization}`;
    // }

    // if (ApiKey) {
    //   globalHeaders[API_HEADER_KEYS.API_KEY] = ApiKey;
    // }

    const {...restParams} = params || {};
    return {
      ...restConfigs,
      headers: {
        ...globalHeaders,
        ...headers,
      },
      params: {
        ...restParams,
      },
      timeout,
    };
  }

  function getAuthorizationToken() {
    return Authorization;
  }

  function setAuthorizationToken(token) {
    Authorization = token;
  }

  function resetAuthorizationToken() {
    Authorization = null;
  }

  function get(endPoint, userConfig = {}) {
    return axios.get(endPoint, addHeaders(userConfig));
  }

  function post(endPoint, params = {}, userConfig = {}) {
    return axios.post(endPoint, params, addHeaders(userConfig));
  }

  function put(endPoint, params = {}, userConfig = {}) {
    return axios.put(endPoint, params, addHeaders(userConfig));
  }

  function postFormData(endPoint, params = {}, userConfig = {}) {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });
    return axios.post(
      endPoint,
      formData,
      addHeaders({...userConfig, 'Content-Type': 'multipart/form-data'}),
    );
  }

  function patchFormData(endPoint, params = {}, userConfig = {}) {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });
    return axios.patch(
      endPoint,
      formData,
      addHeaders({...userConfig, 'Content-Type': 'multipart/form-data'}),
    );
  }

  function remove(endPoint, userConfig = {}) {
    return axios.delete(endPoint, addHeaders(userConfig));
  }

  function patch(endPoint, params = {}, userConfig = {}) {
    return axios.patch(endPoint, params, addHeaders(userConfig));
  }

  return {
    setAuthorizationToken,
    getAuthorizationToken,
    resetAuthorizationToken,
    get,
    post,
    put,
    patchFormData,
    postFormData,
    remove,
    patch,
  };
};

export default AxiosService();
