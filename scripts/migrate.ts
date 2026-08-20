import fs from "node:fs/promises";
import path from "node:path";
import { pool } from "../src/config/database";

async function main() {
  const migrationPath = path.resolve(
    process.cwd(),
    "database/migrations/001_create_scans.sql"
  );

  const migrationSql = await fs.readFile(migrationPath, "utf8");

  try {
    await pool.query(migrationSql);
    console.log("Migration applied successfully.");
  } finally {
    await pool.end();
  }
}

main();
