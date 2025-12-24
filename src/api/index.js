const express = require("express");
const app = express();
const connectDB = require("../db/connectDB");
const applyMiddleWare = require("../middleware/middleware");

require("dotenv").config();

// Connect DB
connectDB();

// Middleware
applyMiddleWare(app);

// Routes
app.use(require("../routes/Player"));
app.use(require("../routes/Player-s4"));
app.use(require("../routes/Player-s3"));
app.use(require("../routes/Office"));

// Health check
app.get("/", (req, res) => {
  res.send("BUET Cricket Server is Running 🚀");
});

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({ message: `Invalid URL: ${req.originalUrl}` });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
