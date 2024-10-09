// const mongoose = require("mongoose");

// const routineSchema = new mongoose.Schema({
//   name: { type: String, required: true }, // Ejm: Rutina Marcos
//   exercises: [{ type: String }], // Ejm: Lista de ejercicios
// });

// module.exports = mongoose.model("Routine", routineSchema);

const mongoose = require("mongoose");

const routineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [{ type: String, required: true }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Routine = mongoose.model("Routine", routineSchema);
module.exports = Routine;
