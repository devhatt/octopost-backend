export abstract class HttpAdapter {
  abstract get<T extends object>(data: HttpRequest): Promise<HttpResponse<T>>;
  abstract post<T>(data: HttpRequest): Promise<HttpResponse<T>>;
}

export interface HttpRequest<T = object | string> {
  config?: {
    headers?: {
      Authorization?: string;
      'Content-Type'?: string;
    };
    params?: object;
  };
  data?: T;
  responseType?: ResponseType;
  url: string;
}

export interface HttpResponse<T> {
  config?: object;
  data: T;
  headers?: {
    'Content-Length'?: string;
    'Content-Type'?: string;
  };
  request?: object;
  status: number;
  statusText: string;
}
