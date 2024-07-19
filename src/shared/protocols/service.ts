export interface Service<P, R> {
  execute(params: P): Promise<R> | R;
}
