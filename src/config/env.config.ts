import dotenv from "dotenv";
import path from "path";

const envFile =
  process.env.NODE_ENV === "test"
    ? ".env.test"
    : ".env";

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

export const config = Object.freeze({
  port: parseInt(process.env.PORT || "3000", 10),
  nodeEnv: process.env.NODE_ENV || "development",

  database: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    name: process.env.DB_NAME || "security_scanner_dev",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
  },
} as const);
