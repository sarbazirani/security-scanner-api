import request from 'supertest';
import { describe,expect,it } from 'vitest';
import app from '../src/app'
import { SCAN_STATUSES } from '../src/constants/scan-statuses';

const createTestScan = async () => {
  const response = await request(app)
    .post("/scans")
    .send({
      target: "http://example.com",
    });

  expect(response.status).toBe(201);

  return response.body;
};

describe("GET /", ()=>{
    it("should respond with the home page", async()=>{
        const response = await request(app).get("/");

        expect(response.status).toBe(200);
        expect(response.text).toBe("Home Page");
    });
});

describe("Unknown routes",()=>{
    it("should return a 404 response.",async()=>{
        const response = await request(app).get("/unknown_route");

        expect(response.status).toBe(404);
    });
});

describe("Get /Scans",()=>{
    it("should return a JSON array of scans",async()=>{
        await createTestScan();
        const response = await request(app).get("/scans");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.type).toBe("application/json");
        for (const scan of response.body){
            expect(scan).toEqual(
                expect.objectContaining({
                  id:expect.any(Number),
                  target:expect.any(String),
                  status:expect.any(String)
                })
            );
             expect(SCAN_STATUSES).toContain(scan.status);
        }
    });
});

describe("POST /scans",()=>{
    it("should respond with the newly created scan and a 201 status",async()=>{
        const targetUrl = "http://example.com";
        const response = await request(app)
        .post("/scans")
        .send({
            target:targetUrl,
        });

        expect(response.status).toBe(201);
        expect(response.type).toBe("application/json");
        expect(response.body).toEqual(
            expect.objectContaining({
                id:expect.any(Number),
                target:targetUrl,
                status:expect.any(String)
            })
        );
        expect(SCAN_STATUSES).toContain(response.body.status);
    });
});

describe("PATCH /scans/:id/status",()=>{
    it(`should change status to ${SCAN_STATUSES[1]}`,async()=>{
        const newScan = await createTestScan();

        const scanId = newScan.id;
        const response = await request(app)
        .patch(`/scans/${scanId}/status`)
        .send({
            status:SCAN_STATUSES[1],
        });

        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body).toEqual(
            expect.objectContaining({
                id:scanId,
                target:newScan.target,
                status:SCAN_STATUSES[1]
            })
        );
    });
    it(`should return 400 for an invalid status`,async()=>{
        const newScan = await createTestScan();

        const scanId = newScan.id;
        const response = await request(app)
        .patch(`/scans/${scanId}/status`)
        .send({
            status:"unknown_status",
        });

        expect(response.status).toBe(400);
        expect(response.type).toBe("application/json");
        expect(response.body).toEqual(
            expect.objectContaining({
                error: expect.any(String),
            })
        );
    });
});

describe("GET /scans/:id",()=>{
    it("should return a scan by id", async()=>{
        const newScan = await createTestScan();
        const scanId = newScan.id;
        const response = await request(app).get(`/scans/${scanId}`);

        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body).toEqual(
        expect.objectContaining({
            id:scanId,
            target:newScan.target,
            status:SCAN_STATUSES[0]
            })
        );
    });    
    it("should return a 404 status", async()=>{
        // const newScan = await createTestScan();
        // const nonExistingScanId = newScan.id + 1;
        const nonExistingScanId = 9999999;
        const response = await request(app).get(`/scans/${nonExistingScanId}`);

        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body).toEqual(
            expect.objectContaining({
                error: expect.any(String),
            })
        );
    });    
    it("should return a 400 status", async()=>{
        const response = await request(app).get(`/scans/1a`);

        expect(response.status).toBe(400);
        expect(response.type).toBe("application/json");
        expect(response.body).toEqual(
            expect.objectContaining({
                error: expect.any(String),
            })
        );
    });    
});
