import swaggerJsdoc from "swagger-jsdoc";
import { SCAN_STATUSES } from "../constants/scan-statuses";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Security Scanner API",
            version: "1.0.0",
            description: "API documentation for the Security Scanner service.",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
        components: {
            schemas: {
                ScanStatus: {
                    type: "string",
                    enum: [...SCAN_STATUSES],
                },
                Scan: {
                    type: "object",
                    required: ["id", "target", "status", "createdAt"],
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        target: {
                            type: "string",
                            example: "https://example.com",
                        },
                        status: {
                            $ref: "#/components/schemas/ScanStatus",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                        },
                    },
                },
                Error: {
                    type: "object",
                    required: ["error"],
                    properties: {
                        error: {
                            type: "string",
                            example: "Scan not found",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
});
