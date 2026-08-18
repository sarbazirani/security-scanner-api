import { Scan } from "../interfaces/scan.interface";
const scans:Scan[]=[];
let nextId:number = 1;

export const getAllScans = async ():Promise<Scan[]> =>{
  // throw new Error("Async test error");
  return scans;
}

export const createScan = async (target:string):Promise<Scan> =>{
  const newScan:Scan = {
    id: nextId,
    target: target,
    status: "pending",
    createdAt: new Date(),
  };

  nextId++;
  scans.push(newScan);

  return newScan;
}

export const getScanById = async (id:number):Promise<Scan | undefined> =>{
  return scans.find((item) => item.id === id);
}

export const updateScanStatus = async (scanId:number,newStatus:Scan['status']):Promise<Scan | undefined | null> =>{
  const scan:Scan | undefined = scans.find((item) => item.id === scanId);
  if(!scan){
    return null;
  }
  scan.status=newStatus;
  return scan;
}