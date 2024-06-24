/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';

export type AsyncRequestHandler<
  Req = Request,
  Res = Response,
  Next = NextFunction,
> = (req: Req, res: Res, next: Next) => Promise<any>;
