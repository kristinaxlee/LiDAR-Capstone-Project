const router = (module.exports = require("express").Router());

router.use("/scans", require("./scans").router);
