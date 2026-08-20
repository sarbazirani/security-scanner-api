import { Request,Response,NextFunction } from "express";
import AppError from "../utils/app-error";
import { SCAN_STATUSES } from "../constants/scan-statuses";

export const validateCreateScan = (req:Request, res:Response, next:NextFunction) => {
  const target = req.body.target;

  if (typeof target !== "string" || target.trim() === "") {
    return next(new AppError("Target must be a non-empty string", 400));
  }
  const trimmedTarget = target.trim();

  try {
    const parsedUrl = new URL(trimmedTarget);

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return next(new AppError("Target must be a valid HTTP/HTTPS URL", 400));
    }
  } catch {
    return next(new AppError("Target must be a valid HTTP/HTTPS URL", 400));
  }
  req.body.target = trimmedTarget;
  next();
}

export const validateUpdateScanStatus = (req:Request, res:Response, next:NextFunction) => {
  const status = req.body.status;
  if(typeof status!=="string"||!SCAN_STATUSES.includes(status as any)){
    return next(new AppError(`Status must be one of: ${SCAN_STATUSES.join(", ")}`, 400));
  }
  next();
}
export const validateScanId= (req:Request,res:Response,next:NextFunction)=>{
  const scanId = Number(req.params.id);
  if (!Number.isInteger(scanId) || scanId <= 0) {
    return next(new AppError("Invalid scan id", 400));
  }
  next();
}
