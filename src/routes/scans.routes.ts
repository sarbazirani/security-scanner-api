import { Router } from "express";
import { createScan, getAllScans, getScanById, updateScanStatus } from '../controllers/scans.controller'
import { validateCreateScan, validateUpdateScanStatus, validateScanId } from '../middlewares/scans.validation';

const scansRouter = Router();
/**
 * @openapi
 * /scans:
 *   get:
 *     summary: Get all scans
 *     tags:
 *       - Scans
 *     responses:
 *       200:
 *         description: List of scans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Scan"
 */

scansRouter.get("/", getAllScans);
/**
 * @openapi
 * /scans:
 *   post:
 *     summary: Create a new scan
 *     tags:
 *       - Scans
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - target
 *             properties:
 *               target:
 *                 type: string
 *                 example: https://example.com
 *     responses:
 *       201:
 *         description: Scan created successfully
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: "#/components/schemas/Scan" 
 *       400:
 *         description: Invalid request body
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: "#/components/schemas/Error"
 *                 example:
 *                     error: "Target must be a valid string"
 */
scansRouter.post("/", validateCreateScan, createScan);
/**
 * @openapi
 * /scans/{id}/status:
 *   patch:
 *     summary: update status a scan by ID
 *     tags:
 *       - Scans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Scan ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 $ref: "#/components/schemas/ScanStatus"
 *     responses:
 *       200:
 *         description: Scan status updated
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: "#/components/schemas/Scan" 
 *       400:
 *         description: Invalid status
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: "#/components/schemas/Error"
 *                 example:
 *                     error: "Status must be valid"
 *       404:
 *         description: Scan not found
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: "#/components/schemas/Error"
 */
scansRouter.patch("/:id/status", validateScanId, validateUpdateScanStatus, updateScanStatus);
/**
 * @openapi
 * /scans/{id}:
 *   get:
 *     summary: Get a scan by ID
 *     tags:
 *       - Scans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Scan ID
 *     responses:
 *       200:
 *         description: Scan found
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: "#/components/schemas/Scan" 
 *       400:
 *         description: Invalid scan ID
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: "#/components/schemas/Error"
 *                 example:
 *                     error: "Scan ID must be a valid integer"
 *       404:
 *         description: Scan not found
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: "#/components/schemas/Error"
 */
scansRouter.get("/:id", validateScanId, getScanById);

export default scansRouter;