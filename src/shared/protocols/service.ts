export interface Service<P = unknown, R = unknown> {
  execute(params: P): Promise<R>;
}
