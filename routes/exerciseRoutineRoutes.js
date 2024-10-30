const express = require("express");
const {
  addExerciseRoutine,
  getUserExerciseRoutines,
  getAllExerciseRoutines,
} = require("../controllers/exerciseRoutineController");
const { protect, verifyRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/routines", protect, verifyRole("admin"), addExerciseRoutine);
router.get("/routines", protect, getAllExerciseRoutines);
router.get("/routines/:userId", protect, getUserExerciseRoutines);

module.exports = router;
