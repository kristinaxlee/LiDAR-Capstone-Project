const express = require("express");
const app = express();
const port = 8888;
const cors = require("cors");
const api = require("./api");

app.use(cors());
app.use(express.json());

/*
 * All routes for the API are written in modules in the api/ directory.  The
 * top-level router lives in api/index.js.  That's what we include here, and
 * it provides all of the routes.
 */
app.use("/", api);

app.get("/", (req, res) => {
  res.send("root url");
});

app.use("*", function (req, res, next) {
  res.status(404).json({
    error: "Requested resource " + req.originalUrl + " does not exist",
  });
});

app.listen(port, () => {
  console.log("== Server is running on port", port);
});
