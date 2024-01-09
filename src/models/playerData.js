const mongoose = require("mongoose");

const playerDataSchema = new mongoose.Schema({
  playerEmail: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  profileImg: {
    type: String,
    require: true,
  },
  designation: {
    type: String,
    require: true,
  },
  office: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  playerRole: {
    type: String,
    require: true,
  },
  jersyName: {
    type: String,
    require: true,
  },
  jersyNumber: {
    type: String,
    require: true,
  },
  jersySize: {
    type: String,
    require: true,
  },
  bkashNumber: {
    type: String,
    require: true,
  },
  transactionID: {
    type: String,
    require: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "done"],
  },
});

const playerData = mongoose.model("players", playerDataSchema);

module.exports = playerData;
