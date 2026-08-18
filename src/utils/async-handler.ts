import { Request, Response, NextFunction, RequestHandler } from "express";
import { ParamsDictionary } from 'express-serve-static-core';
import {ParsedQs} from 'qs'

type AsyncController<P,Q> = (
  req:Request<P,any,any,Q>,
  res:Response,
  next: NextFunction
)=>Promise<void>;

const asyncHandler = <P=ParamsDictionary, Q=ParsedQs>(
  fn:AsyncController<P,Q>
):RequestHandler<P,any,any,Q>=>{
  return (req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next);
  };
};

export default asyncHandler;
