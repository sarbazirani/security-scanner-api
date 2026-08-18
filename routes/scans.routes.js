const express = require("express");

const router = express.Router();
const {createScan,getAllScans,getScanById, updateScanStatus} = require("../controllers/scans.controller");
const {validateCreateScan, validateUpdateScanStatus, validateScanId} = require("../middlewares/scans.validation");

router.get("/", getAllScans);
router.post("/", validateCreateScan, createScan);
router.patch("/:id/status",validateScanId,validateUpdateScanStatus,updateScanStatus);
router.get("/:id",validateScanId, getScanById);


module.exports = router;