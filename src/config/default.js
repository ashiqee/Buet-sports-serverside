require("dotenv").config();

const config = {
  LOCAL_CLIENT: (process.env.LOCAL_CLIENT || "").trim(),
  CLIENT: (process.env.CLIENT || "").trim(),
};

module.exports = config;
