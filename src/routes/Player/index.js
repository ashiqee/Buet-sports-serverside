var express = require("express");

const playerData = require("../../models/playerData");

var router = express.Router();

router.get("/player", async (req, res) => {
  const filter = req.query;
  console.log(filter);

  const result = await playerData.find();
  res.send(result);
});

router.get("/player/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const result = await playerData.findOne({ playerId: id });
  // console.log(result);
  res.send(result);
});

router.get("/playerCount", async (req, res) => {
  const totalPlayer = await playerData.estimatedDocumentCount();
  // const filter = req.query;
  // console.log(filter);
  // const query = { mobile: req.query };
  // const exitsPlayer = await playerData.findOne(query);
  res.send({ totalPlayer });
});

router.post("/player", async (req, res) => {
  const player = req.body;

  const query = { mobile: player.mobile };
  const exitsPlayer = await playerData.findOne(query);
  if (exitsPlayer) {
    return res.send({
      message: "Player Already Exits",
      insertedId: null,
      email: exitsPlayer?.userEmail,
    });
  }
  try {
    const result = await playerData.create(player);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
