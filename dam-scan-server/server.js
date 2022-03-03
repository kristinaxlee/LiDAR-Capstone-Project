const express = require("express");
const app = express();
const port = 8888;
const cors = require("cors");
const fs = require("fs");
const mysqlPool = require("./lib/mysqlPool");

//const room1Scan = fs.readFileSync("./data/Kelley_1_1645660509.ply");

app.use(cors());

app.get("/", (req, res) => {
  res.send("root url");
});

app.get("/scans/:file", (req, res) => {
  const filepath = "./data/" + req.params.file + ".ply";
  try {
    const contents = fs.readFileSync(filepath);
    res.send(contents.toString());
  } catch (err) {
    console.log(" -- error: ", err);
    res.status(500).send({
      err: "Error fetching file contents for file: " + req.params.file,
    });
  }
});

async function getAllScans() {
  const [results] = await mysqlPool.query("SELECT * FROM scans");

  console.log(" -- scans: ", results);
  return results;
}

app.get("/scans/", async function (req, res) {
  try {
    const scans = await getAllScans();
    res.status(200).send(scans);
  } catch (err) {
    console.error(" -- error: ", err);
    res.status(500).send({
      err: "Error fetching scans from DB. Try again later.",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
