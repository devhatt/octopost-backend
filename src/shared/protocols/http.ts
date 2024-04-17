/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequest<Q = object, P = object, B = object> {
  queryParams?: Q;
  pathParams?: P;
  body?: B;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}
