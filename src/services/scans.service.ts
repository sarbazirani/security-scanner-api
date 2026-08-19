import { Scan } from "../interfaces/scan.interface";
import { pool } from "../config/database";

export const getAllScans = async ():Promise<Scan[]> =>{
  const result = await pool.query<{
    id: number;
    target: string;
    status: Scan["status"];
    created_at: Date;
  }>(
    `
      SELECT id, target, status, created_at
      FROM scans
      ORDER BY id ASC
    `
  );

  return result.rows.map((row) => ({
    id: row.id,
    target: row.target,
    status: row.status,
    createdAt: row.created_at,
  }));
}

export const createScan = async (target:string):Promise<Scan> =>{
  const result = await pool.query<{
    id: number;
    target: string;
    status: Scan["status"];
    created_at: Date;
  }>(
    `
      INSERT INTO scans (target)
      VALUES ($1)
      RETURNING id, target, status, created_at
    `,
    [target]
  );
  const row = result.rows[0];

  if (!row) {
    throw new Error("Scan was not created");
  }

  return {
    id: row.id,
    target: row.target,
    status: row.status,
    createdAt: row.created_at,
  };
};

export const getScanById = async (id:number):Promise<Scan | undefined> =>{
  const result = await pool.query<{
    id:number;
    target:string;
    status: Scan['status'];
    created_at:Date;
  }>(`
    SELECT id,target,status,created_at FROM scans
    WHERE id=$1
    `,
    [id]
  );
  const row=result.rows[0]; 
  if(!row) return  undefined;
  return{
    id:row.id,
    target:row.target,
    status:row.status,
    createdAt:row.created_at,
  }
}

export const updateScanStatus = async (scanId:number,newStatus:Scan['status']):Promise<Scan | undefined | null> =>{
  const updateResult = await pool.query<{
    id:number;
    target:string;
    status: Scan['status'];
    created_at: Date;
  }>(`
    UPDATE scans
    SET status = $1
    WHERE id=$2
    RETURNING id, target, status, created_at
    `,
    [newStatus,scanId]
  );
  const updatedScan=updateResult.rows[0];
  if (!updatedScan) return null;
  return {
    id:updatedScan.id,
    target:updatedScan.target,
    status:updatedScan.status,
    createdAt:updatedScan.created_at,
  }
}