var express = require("express");
const { isObjectIdOrHexString } = require("mongoose");

const playerData = require("../../models/playerData");

var router = express.Router();

router.get("/player", async (req, res) => {
  try {
    const searchText = req.query.search;
    // console.log(searchText);
    const searchRegex = new RegExp(searchText, "i");
    const result = await playerData
      .find({
        $or: [
          { name: searchRegex },
          { playerRole: searchRegex },
          { office: searchRegex },
        ],
      })
      .then((player) => {
        // res.send(result);
        res.status(200).json({ player });
        // console.log(player);
      })
      .catch((error) => {
        res.status(500).json({ msg: "Unable to find player" });
      });
  } catch (error) {
    res.status(500).json({ msg: "No matching records found" });
  }
});

router.get("/regPlayer/:email", async (req, res) => {
  const email = req.params.email;
  // console.log(email);
  const result = await playerData.find({ userEmail: email });
  res.send(result);
});

router.get("/player/:id", async (req, res) => {
  const id = req.params.id;

  const result = await playerData.findOne({ playerId: id });
  // console.log(result);
  res.send(result);
});

router.get("/playerCount", async (req, res) => {
  const totalPlayer = await playerData.estimatedDocumentCount();
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

router.patch("/paymentUpdate/:id", async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const query = { _id: id };
  const result = playerData.updateOne(query);
  console.log(result);
});

module.exports = router;
