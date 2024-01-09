const express = require("express");
const app = express();
const connectDB = require("./db/connectDB");
const applyMiddleWare = require("./middleware/middleware");

require("dotenv").config();
const port = process.env.PORT || 5000;

const playerRoutes = require("./routes/Player");

applyMiddleWare(app);

app.use(playerRoutes);

app.get("/", (req, res) => {
  res.send("Buet Cricket Server is Running");
});

app.all("*", (req, res, next) => {
  const err = new Error(`The requested url is invalid: [${req.err}]`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

const main = async () => {
  await connectDB();
  app.listen(port, (req, res) => {
    console.log(`Buet Cricket Server Running On Port: ${port}`);
  });
};

main();
