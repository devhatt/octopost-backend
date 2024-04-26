/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpClientRequest = {
  body?: any;
  headers?: any;
  method: HttpMethod;
  url: string;
};

export interface HttpClient {
  request: <T>(data: HttpClientRequest) => Promise<HttpClientResponse<T>>;
}

export type HttpMethod = 'delete' | 'get' | 'post' | 'put';

export enum HttpStatusCode {
  badRequest = 400,
  forbidden = 403,
  noContent = 204,
  notFound = 404,
  ok = 200,
  serverError = 500,
  unauthorized = 401,
}

export type HttpClientResponse<T = any> = {
  body?: T;
  statusCode: HttpStatusCode;
};
