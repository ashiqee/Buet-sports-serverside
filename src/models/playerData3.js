const mongoose = require("mongoose");

const playerDataSchema = new mongoose.Schema({
  playerId: {
    type: Number,
    require: true,
  },
  userEmail: {
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
  officeSortName: {
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
  },
  transactionID: {
    type: String,
  },
  cashPayment: {
    type: String,
  },
  amountFee: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "Paid"],
  },
});

const playerData_s3 = mongoose.model("players_s3", playerDataSchema);

module.exports = playerData_s3;
