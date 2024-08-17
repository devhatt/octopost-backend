/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import type { NextFunction, Request, Response } from 'express';

export type AsyncRequestHandler<
  Req = Request,
  Res = Response,
  Next = NextFunction,
> = (req: Req, res: Res, next: Next) => any | Promise<any>;
