/* eslint-disable @typescript-eslint/no-misused-promises */
import type { RequestHandler } from 'express';
import type { HttpRequest, HttpResponse } from '../protocols/http';

type Method = (httpRequest: HttpRequest) => Promise<HttpResponse>;

export function redirectRouteAdapter(method: Method): RequestHandler {
  return async (req, res) => {
    const httpRequest: HttpRequest = {
      body: req.body as object,
      pathParams: req.params as Record<string, string | number>,
      queryParams: req.query as Record<string, string | number>,
    };

    const httpResponse = await method(httpRequest);

    if (httpResponse.statusCode !== 200) {
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    }

    res.status(httpResponse.statusCode).redirect(httpResponse.body);
  };
}
