require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;

const mongoDBURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoDBURL)
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.error("Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Connected to MongoDB!");
});
