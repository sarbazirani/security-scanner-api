import { Router } from "express";
import {createScan,getAllScans,getScanById,updateScanStatus} from '../controllers/scans.controller'
import {validateCreateScan, validateUpdateScanStatus, validateScanId}  from '../middlewares/scans.validation';

const scansRouter = Router();

scansRouter.get("/", getAllScans);
scansRouter.post("/", validateCreateScan, createScan);
scansRouter.patch("/:id/status",validateScanId,validateUpdateScanStatus,updateScanStatus);
scansRouter.get("/:id",validateScanId, getScanById);

export default scansRouter;