const express = require("express");
const {
  createRoutine,
  getRoutines,
  updateRoutine,
  deleteRoutine,
} = require("../controllers/routineController");
const router = express.Router();

router.post("/routines", createRoutine);
router.get("/routines", getRoutines);
router.put("/routines/:id", updateRoutine);
router.delete("/routines/:id", deleteRoutine);

module.exports = router;
