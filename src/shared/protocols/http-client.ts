/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpClientRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
};

export interface HttpClient {
  request: <T>(data: HttpClientRequest) => Promise<HttpClientResponse<T>>;
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete';

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpClientResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};
