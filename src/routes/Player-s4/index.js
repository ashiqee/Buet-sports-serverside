var express = require("express");
const { isObjectIdOrHexString } = require("mongoose");
const playerData_s4 = require("../../models/playerData4");
const { isRegistrationOpen, REGISTRATION_DEADLINE } = require("../../config/deadline");
const { encryptPayload } = require("../../utils/cipher");

var router = express.Router();

router.get("/player-s4", async (req, res) => {
  try {
    const searchText = req.query.search;
    const searchRegex = new RegExp(searchText, "i");
    const player = await playerData_s4
      .find({
        $or: [
          { name: searchRegex },
          { playerRole: searchRegex },
          { office: searchRegex },
        ],
      })
      .select("-bkashNumber -transactionID -amountFee -userEmail -__v");

    res.status(200).json({
      securePayload: encryptPayload({ player }),
    });
  } catch (error) {
    res.status(500).json({ msg: "No matching records found" });
  }
});

router.get("/regPlayer/:email", async (req, res) => {
  const email = req.params.email;
  const result = await playerData_s4.find({ userEmail: email });
  res.send({ securePayload: encryptPayload(result) });
});

router.get("/player/:id", async (req, res) => {
  const id = req.params.id;
  const result = await playerData_s4
    .findOne({ playerId: id })
    .select("-bkashNumber -transactionID -amountFee -userEmail -__v");
  res.send({ securePayload: encryptPayload(result) });
});

router.get("/playerCount", async (req, res) => {
  const totalPlayer = await playerData_s4.estimatedDocumentCount();
  res.send({ totalPlayer });
});

router.post("/player", async (req, res) => {
  if (!isRegistrationOpen()) {
    return res.status(403).json({
      message: "Registration deadline has expired (Deadline: 11 November 2026). Registration is closed.",
      insertedId: null,
      closed: true,
      deadline: REGISTRATION_DEADLINE,
    });
  }

  const player = req.body;

  const query = { mobile: player.mobile };
  const exitsPlayer = await playerData_s4.findOne(query);
  if (exitsPlayer) {
    return res.send({
      message: "Player Already Exits",
      insertedId: null,
      email: exitsPlayer?.userEmail,
    });
  }
  try {
    const result = await playerData_s4.create(player);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/paymentUpdate/:id", async (req, res) => {
  const result = await playerData_s4.updateOne(
    { _id: req.params.id },
    {
      $set: {
        paymentStatus: "Paid",
      },
    }
  );
  res.send(result);
});

router.patch("/playerUpdate/:id", async (req, res) => {
  const updateData = req.body;
  const result = await playerData_s4.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        profileImg: updateData.profileImg,
        jersyName: updateData.jersyName,
        jersyNumber: updateData.jersyNumber,
        playerRole: updateData.playerRole,
      },
    }
  );
  res.send(result);
});

module.exports = router;
