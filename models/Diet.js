// const mongoose = require("mongoose");

// const dietSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   items: [{ type: String }],
// });

// module.exports = mongoose.model("Diet", dietSchema);

const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [{ type: String, required: true }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Diet = mongoose.model("Diet", dietSchema);
module.exports = Diet;
