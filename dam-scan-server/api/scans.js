const router = require("express").Router();
const { validateAgainstSchema } = require("../lib/validation");
const {
  scanSchema,
  getScans,
  insertScan,
  getBuildings,
  getRooms,
} = require("./models/scans");
const fs = require("fs");
const multer = require("multer");

exports.router = router;

const acceptedFileTypes = {
  "application/octet-stream": "ply",
};

function flattenList(list, variableName) {
  var results = [];
  list.forEach((item) => {
    results.push(item[variableName]);
  });
  return results;
}

const upload = multer({
  storage: multer.diskStorage({
    destination: `${__dirname}/uploads`,
    filename: (req, file, callback) => {
      const filename = file.originalname.split(".")[0];
      const extension = acceptedFileTypes[file.mimetype];
      callback(null, `${filename}.${extension}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    callback(null, !!acceptedFileTypes[file.mimetype]);
  },
});

/**
 * Route to get a list of scans
 */
router.get("/", async function (req, res) {
  try {
    const params = {
      toDate: req.query.toDate,
      fromDate: req.query.fromDate,
      category: req.query.category,
      building: req.query.building,
      room: req.query.room,
      date: req.query.date,
    };

    const scans = await getScans(params);
    console.log(" -- scans: ", scans);

    res.status(200).send(scans);
  } catch (err) {
    console.error(" -- error: ", err);
    res.status(500).send({
      err: "Error fetching scans from DB. Try again later.",
    });
  }
});

/**
 * Route to get a list of buildings
 */
router.get("/buildings", async (req, res) => {
  try {
    const results = await getBuildings(req.query.category);
    const buildings = flattenList(results, "building");

    res.status(200).send(buildings);
  } catch (err) {
    console.error(" -- error: ", err);
    res.status(500).send({
      err: "Error fetching results from DB. Try again later.",
    });
  }
});

/**
 * Route to get a list of rooms in a building
 */
router.get("/rooms", async (req, res) => {
  try {
    const results = await getRooms(req.query.building);
    const rooms = flattenList(results, "room");

    res.status(200).send(rooms);
  } catch (err) {
    console.error(" -- error: ", err);
    res.status(500).send({
      err: "Error fetching results from DB. Try again later.",
    });
  }
});

/**
 * Route to get send PLY file contents
 */
router.get("/:file", (req, res) => {
  const filepath = "./api/uploads/" + req.params.file + ".ply";
  try {
    const contents = fs.readFileSync(filepath);
    res.send(contents.toString());
  } catch (err) {
    console.log(" -- error: ", err);
    res.status(500).send({
      err: "Error fetching file contents for file: " + filepath,
    });
  }
});

/**
 * Route to insert a new scan into the DB. File is stored locally.
 */
router.post("/", upload.single("file"), async (req, res, next) => {
  console.log("== req.body:", req.body);
  console.log("== req.file:", req.file);
  if (validateAgainstSchema(req.body, scanSchema)) {
    const scan = {
      date: req.body.date,
      building: req.body.building,
      room: req.body.room,
      filename: req.file.filename,
    };

    try {
      const id = await insertScan(scan);
      res.status(201).send({
        id: id,
      });
    } catch (err) {
      res.status(500).send({
        err: "Error inserting scan into DB. Try again later",
      });
    }
  } else {
    console.log(" -- request body: ", req.body);
    res.status(400).json({
      error: "Request body is not a valid scan object",
    });
  }
});
