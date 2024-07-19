import type { AxiosRequestConfig } from 'axios';
import axios, { Axios } from 'axios';

import type { HttpAdapter, HttpRequest } from './http-adapter';

export class AxiosHandler implements HttpAdapter {
  private readonly api: Axios;

  constructor(config?: AxiosRequestConfig) {
    this.api = new Axios({
      transformRequest: axios.defaults.transformRequest,
      transformResponse: axios.defaults.transformResponse,
      validateStatus: (status) => status >= 200 && status < 300,
      ...config,
    });
  }

  async get<T>({
    config,
    url,
  }: {
    config?: AxiosRequestConfig;
    url: string;
  }): Promise<T> {
    const response: T = await this.api.get(url, config);

    return response;
  }

  async post<T>({ config, data, url }: HttpRequest): Promise<T> {
    const response: T = await this.api.post(url, data, config);

    return response;
  }
}
