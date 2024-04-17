import type { HttpRequest } from './http';

export interface Service<R> {
  execute(httpRequest: HttpRequest): Promise<R>;
}

export type ServiceRedirect = Service<string>;
