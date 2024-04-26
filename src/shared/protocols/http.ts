/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequest<Q = object, P = object, B = object> {
  body?: B;
  pathParams?: P;
  queryParams?: Q;
}

export interface HttpResponse {
  body: any;
  statusCode: number;
}
