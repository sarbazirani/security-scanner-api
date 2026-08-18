const AppError = require("../utils/app-error");

function validateCreateScan(req, res, next) {
  const target = req.body.target;

  if (typeof target !== "string" || target.trim() === "") {
    return next(new AppError("Target must be a non-empty string", 400));
  }
  req.body.target = target.trim();
  next();
}
function validateUpdateScanStatus(req, res, next) {
  const allowedStatuses = ["pending", "running", "completed", "failed"];
  const status = req.body.status;
  if(typeof status!=="string"||!allowedStatuses.includes(status)){
    return next(new AppError("Status must be one of: pending, running, completed, failed", 400));
  }
  next();
}
function validateScanId(req,res,next){
  const scanId = Number(req.params.id);
  if (!Number.isInteger(scanId) || scanId <= 0) {
    return next(new AppError("Invalid scan id", 400));
  }
  next();
}
module.exports = {
  validateCreateScan,
  validateUpdateScanStatus,
  validateScanId,
};
