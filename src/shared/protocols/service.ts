import type { HttpRequest } from './http';

export interface Service<P = any, R = any> {
  execute(params: P): Promise<R>;
}
