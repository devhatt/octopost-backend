import type { HttpRequest } from './http.js';

export interface Service<P = any, R = any> {
  execute(params: P): Promise<R>;
}
