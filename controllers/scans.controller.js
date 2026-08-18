const scansService = require("../services/scnas.service");
const AppError = require("../utils/app-error");
const asyncHandler = require("../utils/async-handler");

const getAllScans = asyncHandler(async (req, res, next) => {
  const scans = await scansService.getAllScans();
  //throw new Error("Async test error");
  res.status(200).json(scans);
});

const createScan = asyncHandler(async (req, res, next) => {
  const newScan = await scansService.createScan(req.body.target);
  res.status(201).json(newScan);
});

const getScanById = asyncHandler(async (req, res, next) => {
  const scan = await scansService.getScanById(Number(req.params.id));
  if (!scan) {
    return next(new AppError("Scan not found", 404));
  }
  res.status(200).json(scan);
});

const updateScanStatus = asyncHandler(async (req, res, next) => {
  const updatedScan = await scansService.updateScanStatus(
    Number(req.params.id),
    req.body.status
  );
  if (!updatedScan) {
    return next(new AppError("Scan not found", 404));
  }
  res.status(200).json(updatedScan);
});

module.exports = {
  getAllScans,
  createScan,
  getScanById,
  updateScanStatus,
};
