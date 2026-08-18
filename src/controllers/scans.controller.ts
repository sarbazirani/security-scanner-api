import * as scansService from '../services/scans.service'
import asyncHandler from '../utils/async-handler';
import AppError from '../utils/app-error';
import { Request,Response,NextFunction } from "express";
import { ScanStatus } from '../constants/scan-statuses';
import { CreateScanBody,ScanIdParams,UpdateScanStatusBody } from '../dto/scans.dto';

export const getAllScans = asyncHandler(async (req, res, next) => {
  const scans = await scansService.getAllScans();
  res.status(200).json(scans);
});

export const createScan = asyncHandler(
  async (req:Request<{},{},CreateScanBody>, res, next) => {
  const newScan = await scansService.createScan(req.body.target);
  res.status(201).json(newScan);
});

export const getScanById = asyncHandler(
  async (req, res, next) => {
  const scan = await scansService.getScanById(Number(req.params.id));
  if (!scan) {
    return next(new AppError("Scan not found", 404));
  }
  res.status(200).json(scan);
});

export const updateScanStatus = asyncHandler(
  async (req:Request<ScanIdParams,{},UpdateScanStatusBody>, res, next) => {
  const updatedScan = await scansService.updateScanStatus(
    Number(req.params.id),
    req.body.status
  );
  if (!updatedScan) {
    return next(new AppError("Scan not found", 404));
  }
  res.status(200).json(updatedScan);
});