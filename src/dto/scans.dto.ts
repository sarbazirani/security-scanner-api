import { ScanStatus } from "../constants/scan-statuses";
import{ParamsDictionary} from "express-serve-static-core";

export interface CreateScanBody {
  target: string;
}

export interface UpdateScanStatusBody {
  status: ScanStatus;
}

export interface ScanIdParams extends ParamsDictionary{
  id: string;
}
