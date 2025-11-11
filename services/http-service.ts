// Libs
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

// Utils
import { getErrorMessageFromApi } from '@/utils';

// Constants
import { API_BASE_URL } from '@/constants';

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

/**
 * Generic API request wrapper
 */
const request = async <T>(
  method: Method,
  endpoint: string,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axiosInstance.request<T>({
      url: endpoint,
      method,
      ...options,
    });

    return response;
  } catch (error) {
    throw getErrorMessageFromApi(error);
  }
};

export const get = <T>(endpoint: string, configs?: AxiosRequestConfig) =>
  request<T>('get', endpoint, configs);

export const post = async <TRequestBody, T>(
  endpoint: string,
  body: TRequestBody,
  configs?: AxiosRequestConfig,
) => (await request<T>('post', endpoint, { data: body, ...configs })).data;

export const put = async <TRequestBody, T>(
  endpoint: string,
  body: TRequestBody,
  configs?: AxiosRequestConfig,
) => (await request<T>('put', endpoint, { data: body, ...configs })).data;

export const patch = async <TRequestBody, T>(
  endpoint: string,
  body: TRequestBody,
  configs?: AxiosRequestConfig,
) => (await request<T>('patch', endpoint, { data: body, ...configs })).data;

export const remove = async <T>(
  endpoint: string,
  configs?: AxiosRequestConfig,
) => (await request<T>('delete', endpoint, configs)).data;
