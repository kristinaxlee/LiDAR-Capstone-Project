const router = require("express").Router();
const { validateAgainstSchema } = require("../lib/validation");
const { scanSchema, getScans, insertScan } = require("./models/scans");
const fs = require("fs");

exports.router = router;

/**
 * Route to get a list of scans
 */
router.get("/", async function (req, res) {
  try {
    const scans = await getScans();
    res.status(200).send(scans);
  } catch (err) {
    console.error(" -- error: ", err);
    res.status(500).send({
      err: "Error fetching scans from DB. Try again later.",
    });
  }
});

/**
 * Route to get send PLY file contents
 */
router.get("/:file", (req, res) => {
  const filepath = "./data/" + req.params.file + ".ply";
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
 * Route to insert a new scan into the DB
 * (TO DO: ADD FILE STORAGE AND MULTER)
 */
router.post("/", async function (req, res) {
  if (validateAgainstSchema(req.body, scanSchema)) {
    try {
      const id = await insertScan(req.body);
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
