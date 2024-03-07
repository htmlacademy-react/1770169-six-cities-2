import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {toast} from 'react-toastify';


import {getToken} from './token';
import {API_URL, REQUEST_TIMEOUT, StatusCodeMapping} from '../const';
import {DetailMessage} from '../types/app-type';

const shouldDisplayError = (res: AxiosResponse) => !!StatusCodeMapping[res.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use((res) => res, (error: AxiosError<DetailMessage>) => {
    if (error.response && shouldDisplayError(error.response)) {
      toast.warn(error.response.data.message);
    }

    throw error;
  });

  return api;
};
