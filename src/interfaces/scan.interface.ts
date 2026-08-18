import { ScanStatus } from "../constants/scan-statuses";
export interface Scan{
    id: number;
    target: string;
    status: ScanStatus;
    createdAt:Date;
}