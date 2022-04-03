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

/**
 * Search dictionary to find specific value in a value array
 *    Example usage: Get building category by building name
 *      getKeyByValue(categoryDictionary,"Johnson Hall");
 *      @returns: "Engineering"
 */
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key].includes(value));
}

const categoryDictionary = {
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
  var query = "SELECT * FROM scans";
  var queryParams = [];
  var firstParam = true;

  // Append query params into SQL query if a parameter was provided
  // NOTE: there is probably a more efficient way to do this... writing it in a messy way for the time being
  if (params.toDate != undefined) {
    if (firstParam) {
      firstParam = false;
      query = query.concat(" WHERE ");
    }
    query = query.concat("date <= ? ");
    queryParams.push(params.toDate);
  }

  if (params.fromDate != undefined) {
    if (firstParam) {
      firstParam = false;
      query = query.concat(" WHERE ");
    } else {
      query = query.concat(" AND ");
    }
    query = query.concat("date >= ? ");
    queryParams.push(params.fromDate);
  }

  if (params.category != undefined) {
    if (firstParam) {
      firstParam = false;
      query = query.concat(" WHERE ");
    } else {
      query = query.concat(" AND ");
    }
    query = query.concat("category = ? ");
    queryParams.push(params.category);
  }

  if (params.building != undefined) {
    if (firstParam) {
      firstParam = false;
      query = query.concat(" WHERE ");
    } else {
      query = query.concat(" AND ");
    }
    query = query.concat("building = ? ");
    queryParams.push(params.building);
  }

  if (params.room != undefined) {
    if (firstParam) {
      firstParam = false;
      query = query.concat(" WHERE ");
    } else {
      query = query.concat(" AND ");
    }
    query = query.concat("room = ? ");
    queryParams.push(params.room);
  }

  if (params.date != undefined) {
    if (firstParam) {
      firstParam = false;
      query = query.concat(" WHERE ");
    } else {
      query = query.concat(" AND ");
    }
    query = query.concat("date = ? ");
    queryParams.push(params.date);
  }

  const [results] = await mysqlPool.query(query, queryParams);

  return results;
}
exports.getScans = getScans;

/**
 * Get all buildings and optionally filter by category
 * @returns a list of buildings
 */
async function getBuildings(category) {
  var query = "SELECT DISTINCT building FROM scans";
  var queryParams = [];

  if (category != undefined) {
    query = query.concat(" WHERE category = ? ");
    queryParams.push(category);
  }

  query = query.concat(" ORDER BY building ASC");

  const [results] = await mysqlPool.query(query, queryParams);

  return results;
}
exports.getBuildings = getBuildings;

/**
 * Get all rooms in a building and optionally filter by date and category
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
  scan.category = getKeyByValue(categoryDictionary, scan.building);

  const [result] = await mysqlPool.query("INSERT INTO scans SET ? ", scan);
  console.log(" -- inserted id: ", result.insertId);

  return result.insertId;
}
exports.insertScan = insertScan;
