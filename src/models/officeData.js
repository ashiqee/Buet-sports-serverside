const mongoose = require("mongoose");

const officeDataSchema = new mongoose.Schema({
  deptID: {
    type: Number,
    require: true,
  },
  Department_office: {
    type: String,
    require: true,
  },
  sortName: {
    type: String,
    require: true,
  },
  sortNameBangla: {
    type: String,
  },
});

const officeData = mongoose.model("offices", officeDataSchema);

module.exports = officeData;
