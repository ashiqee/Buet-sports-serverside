const mongoose = require("mongoose");
require("dotenv").config();

const getConnectionString = () => {
  let connectionURI;

  if (process.env.NODE_ENV) {
    connectionURI = process.env.DB_SECRET;
    connectionURI = connectionURI.replace("<username>", process.env.DB_USER);
    connectionURI = connectionURI.replace("<password>", process.env.DB_PASS);
  } else {
    connectionURI = process.env.DATABASE_PROD;
  }
  return connectionURI;
};

const connectDB = async () => {
  const uri = getConnectionString();
  await mongoose.connect(uri, { dbName: process.env.DB_NAME });
  console.log("Connected to Database");
};

module.exports = connectDB;
