import dotenv from "dotenv";
import path from "path";

type NodeEnvironment =
  | "development"
  | "test"
  | "production";

const readNodeEnvironment = (): NodeEnvironment => {
  const value = process.env.NODE_ENV?.trim() || "development";

  if (
    value !== "development" &&
    value !== "test" &&
    value !== "production"
  ) {
    throw new Error(
      "Invalid configuration: NODE_ENV must be development, test, or production",
    );
  }

  return value;
};

const envFile =
  process.env.NODE_ENV === "test"
    ? ".env.test"
    : ".env";

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

const readRequiredString = (name: string): string => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Invalid configuration: ${name} is required`);
  }

  return value;
};

const readPort = (name: string): number => {
  const rawValue = readRequiredString(name);
  const value = Number(rawValue);

  if (!Number.isInteger(value) || value < 1 || value > 65535) {
    throw new Error(
      `Invalid configuration: ${name} must be a valid TCP port`,
    );
  }

  return value;
};

export const config = Object.freeze({
  port: readPort("PORT"),
  nodeEnv: readNodeEnvironment(),

  database: {
    host: readRequiredString("DB_HOST"),
    port: readPort("DB_PORT"),
    name: readRequiredString("DB_NAME"),
    user: readRequiredString("DB_USER"),
    password: readRequiredString("DB_PASSWORD"),
  },
} as const);
