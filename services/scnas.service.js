const scans = [];
let nextId = 1;

async function getAllScans() {
  return scans;
}

async function createScan(target) {
  const newScan = {
    id: nextId,
    target: target,
    status: "pending",
    createdAt: new Date(),
  };

  nextId++;
  scans.push(newScan);

  return newScan;
}

async function getScanById(id) {
  return scans.find((item) => item.id === id);
}

async function updateScanStatus(scanId,newStatus){
  const scan = scans.find((item) => item.id === scanId);
  if(!scan){
    return null;
  }
  scan.status=newStatus;
  return scan;
}

module.exports = {
  getAllScans,
  createScan,
  getScanById,
  updateScanStatus,
};
