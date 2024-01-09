var express = require("express");

const playerData = require("../../models/playerData");

var router = express.Router();

router.get("/player", async (req, res) => {
  const result = await playerData.find();
  res.send;
});

router.post("/player", async (req, res) => {
  const player = await playerData.insertOne();
});

module.exports = router;
