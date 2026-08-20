"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
const app_1 = __importDefault(require("../src/app"));
const scan_statuses_1 = require("../src/constants/scan-statuses");
const createTestScan = async () => {
    const response = await (0, supertest_1.default)(app_1.default)
        .post("/scans")
        .send({
        target: "http://example.com",
    });
    (0, vitest_1.expect)(response.status).toBe(201);
    return response.body;
};
(0, vitest_1.describe)("GET /", () => {
    (0, vitest_1.it)("should respond with the home page", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get("/");
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.text).toBe("Home Page");
    });
});
(0, vitest_1.describe)("Unknown routes", () => {
    (0, vitest_1.it)("should return a 404 response.", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get("/unknown_route");
        (0, vitest_1.expect)(response.status).toBe(404);
    });
});
(0, vitest_1.describe)("Get /Scans", () => {
    (0, vitest_1.it)("should return a JSON array of scans", async () => {
        await createTestScan();
        const response = await (0, supertest_1.default)(app_1.default).get("/scans");
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(Array.isArray(response.body)).toBe(true);
        (0, vitest_1.expect)(response.type).toBe("application/json");
        for (const scan of response.body) {
            (0, vitest_1.expect)(scan).toEqual(vitest_1.expect.objectContaining({
                id: vitest_1.expect.any(Number),
                target: vitest_1.expect.any(String),
                status: vitest_1.expect.any(String)
            }));
            (0, vitest_1.expect)(scan_statuses_1.SCAN_STATUSES).toContain(scan.status);
        }
    });
});
(0, vitest_1.describe)("POST /scans", () => {
    (0, vitest_1.it)("should respond with the newly created scan and a 201 status", async () => {
        const targetUrl = "http://example.com";
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/scans")
            .send({
            target: targetUrl,
        });
        (0, vitest_1.expect)(response.status).toBe(201);
        (0, vitest_1.expect)(response.type).toBe("application/json");
        (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
            id: vitest_1.expect.any(Number),
            target: targetUrl,
            status: vitest_1.expect.any(String)
        }));
        (0, vitest_1.expect)(scan_statuses_1.SCAN_STATUSES).toContain(response.body.status);
    });
});
(0, vitest_1.describe)("PATCH /scans/:id/status", () => {
    (0, vitest_1.it)(`should change status to ${scan_statuses_1.SCAN_STATUSES[1]}`, async () => {
        const newScan = await createTestScan();
        const scanId = newScan.id;
        const response = await (0, supertest_1.default)(app_1.default)
            .patch(`/scans/${scanId}/status`)
            .send({
            status: scan_statuses_1.SCAN_STATUSES[1],
        });
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.type).toBe("application/json");
        (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
            id: scanId,
            target: newScan.target,
            status: scan_statuses_1.SCAN_STATUSES[1]
        }));
    });
    (0, vitest_1.it)(`should return 400 for an invalid status`, async () => {
        const newScan = await createTestScan();
        const scanId = newScan.id;
        const response = await (0, supertest_1.default)(app_1.default)
            .patch(`/scans/${scanId}/status`)
            .send({
            status: "unknown_status",
        });
        (0, vitest_1.expect)(response.status).toBe(400);
        (0, vitest_1.expect)(response.type).toBe("application/json");
        (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
            error: vitest_1.expect.any(String),
        }));
    });
});
(0, vitest_1.describe)("GET /scans/:id", () => {
    (0, vitest_1.it)("should return a scan by id", async () => {
        const newScan = await createTestScan();
        const scanId = newScan.id;
        const response = await (0, supertest_1.default)(app_1.default).get(`/scans/${scanId}`);
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.type).toBe("application/json");
        (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
            id: scanId,
            target: newScan.target,
            status: scan_statuses_1.SCAN_STATUSES[0]
        }));
    });
    (0, vitest_1.it)("should return a 404 status", async () => {
        // const newScan = await createTestScan();
        // const nonExistingScanId = newScan.id + 1;
        const nonExistingScanId = 9999999;
        const response = await (0, supertest_1.default)(app_1.default).get(`/scans/${nonExistingScanId}`);
        (0, vitest_1.expect)(response.status).toBe(404);
        (0, vitest_1.expect)(response.type).toBe("application/json");
        (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
            error: vitest_1.expect.any(String),
        }));
    });
    (0, vitest_1.it)("should return a 400 status", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get(`/scans/1a`);
        (0, vitest_1.expect)(response.status).toBe(400);
        (0, vitest_1.expect)(response.type).toBe("application/json");
        (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
            error: vitest_1.expect.any(String),
        }));
    });
});
//# sourceMappingURL=app.test.js.map