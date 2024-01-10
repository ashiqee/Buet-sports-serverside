var express = require("express");

const officeData = require("../../models/officeData");

var router = express.Router();

router.get("/office", async (req, res) => {
  const result = await officeData.find();
  res.send(result);
});

module.exports = router;
