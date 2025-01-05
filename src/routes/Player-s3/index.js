var express = require("express");
const { isObjectIdOrHexString } = require("mongoose");
const playerData_s3 = require("../../models/playerData3");


var router = express.Router();

router.get("/player", async (req, res) => {
  try {
    const searchText = req.query.search;
    // console.log(searchText);
    const searchRegex = new RegExp(searchText, "i");
    const result = await playerData_s3
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
  const result = await playerData_s3.find({ userEmail: email });
  res.send(result);
});

router.get("/player/:id", async (req, res) => {
  const id = req.params.id;

  const result = await playerData_s3.findOne({ playerId: id });
  // console.log(result);
  res.send(result);
});

router.get("/playerCount", async (req, res) => {
  const totalPlayer = await playerData_s3.estimatedDocumentCount();
  res.send({ totalPlayer });
});

router.post("/player", async (req, res) => {
  const player = req.body;

  

  const query = { mobile: player.mobile };
  const exitsPlayer = await playerData_s3.findOne(query);
  if (exitsPlayer) {
    return res.send({
      message: "Player Already Exits",
      insertedId: null,
      email: exitsPlayer?.userEmail,
    });
  }
  try {
    const result = await playerData_s3.create(player);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/paymentUpdate/:id", async (req, res) => {
  const result = await playerData_s3.updateOne(
    { _id: req.params.id },
    {
      $set: {
        paymentStatus: "Paid",
      },
    }
  );
  // console.log(result);
  res.send(result);
});

router.patch("/playerUpdate/:id", async (req, res) => {
  const updateData = req.body;
  console.log(updateData);
  const result = await playerData_s3.updateOne(
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
