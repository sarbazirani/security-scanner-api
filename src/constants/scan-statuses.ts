export const SCAN_STATUSES = [
  "pending",
  "in-progress",
  "completed",
  "failed",
] as const;

export type ScanStatus = (typeof SCAN_STATUSES)[number];
