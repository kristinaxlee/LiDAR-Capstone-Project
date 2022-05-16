const { extractValidFields } = require("../../lib/validation");
const mysqlPool = require("../../lib/mysqlPool");
import { getKeyByValue } from "../../lib/helper";

/**
 * Schema describing required/optional fields of a scan object.
 */
const scanSchema = {
  date: { required: true },
  building: { required: true },
  room: { required: true },
  department: { required: false },
  filename: { required: true },
};
exports.scanSchema = scanSchema;

const deptDictionary = {
  Engineering: ["Kelley Engineering Center", "Johnson Hall", "Dearborn Hall"],
  Agriculture: ["Strand Agricultural Hall"],
  Science: ["Weniger Hall"],
  Academic: ["Learning Innovation Center"],
};

/**
 * Get all scans and filter by query parameters
 * @returns list of scans
 */
async function getScans(params) {
  var query = "SELECT * FROM scans WHERE building = ? AND room = ? ";
  var queryParams = [params.building, params.room];

  // Append query params into SQL query if a parameter was provided
  if (params.toDate !== undefined || params.toDate !== "") {
    query = query.concat(" AND date <= ? ");
    queryParams.push(params.toDate);
  }

  if (params.fromDate !== undefined || params.fromDate !== "") {
    query = query.concat(" AND date >= ? ");
    queryParams.push(params.fromDate);
  }

  const [results] = await mysqlPool.query(query, queryParams);
  return results;
}
exports.getScans = getScans;

/**
 * Get all buildings and optionally filter by department
 * @returns a list of buildings
 */
async function getBuildings(department) {
  var query = "SELECT DISTINCT building FROM scans";
  var queryParams = [];

  if (department !== undefined || department !== "") {
    query = query.concat(" WHERE department = ? ");
    queryParams.push(department);
  }

  query = query.concat(" ORDER BY building ASC");

  const [results] = await mysqlPool.query(query, queryParams);

  return results;
}
exports.getBuildings = getBuildings;

/**
 * Get all rooms in a building
 * @returns a list of buildings
 */
async function getRooms(building) {
  const [results] = await mysqlPool.query(
    "SELECT DISTINCT room FROM scans WHERE building = ?",
    [building]
  );

  return results;
}
exports.getRooms = getRooms;

/**
 * Insert new scan into DB
 * @param {} scan
 * @returns new scan's database id
 */
async function insertScan(scan) {
  scan = extractValidFields(scan, scanSchema);
  scan.department = getKeyByValue(deptDictionary, scan.building);

  const [result] = await mysqlPool.query("INSERT INTO scans SET ? ", scan);
  console.log(" -- inserted id: ", result.insertId);

  return result.insertId;
}
exports.insertScan = insertScan;
