const { extractValidFields } = require("../../lib/validation");
const mysqlPool = require("../../lib/mysqlPool");

/**
 * Schema describing required/optional fields of a scan object.
 */
const scanSchema = {
  date: { required: true },
  building: { required: true },
  room: { required: true },
  category: { required: false },
  filename: { required: true },
};
exports.scanSchema = scanSchema;

// Search dictionary to find specific value in a value array
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key].includes(value));
}

// Example usage: Get building category by building name
// getKeyByValue(categoryDictionary,"Johnson Hall");

const categoryDictionary = {
  Engineering: ["Kelley Engineering Center", "Johnson Hall", "Dearborn Hall"],
  Agriculture: ["Strand Agricultural Hall"],
  Science: ["Weniger Hall"],
  Academic: ["Learning Innovation Center"],
};

/**
 * Get all scans
 * @returns list of scans
 */
async function getScans() {
  const [results] = await mysqlPool.query("SELECT * FROM scans");

  console.log(" -- scans: ", results);
  return results;
}
exports.getScans = getScans;

/**
 * Insert new scan into DB
 * @param {} scan
 * @returns new scan's database id
 */
async function insertScan(scan) {
  scan = extractValidFields(scan, scanSchema);
  scan.category = getKeyByValue(categoryDictionary, scan.building);

  const [result] = await mysqlPool.query("INSERT INTO scans SET ? ", scan);
  console.log(" -- inserted id: ", result.insertId);

  return result.insertId;
}
exports.insertScan = insertScan;
