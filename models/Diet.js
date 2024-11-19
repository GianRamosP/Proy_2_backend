// models/Diet.js
const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dietName: { type: String, required: true },
  description: { type: String, required: true },
});

const Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
