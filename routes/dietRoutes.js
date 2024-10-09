const express = require("express");
const {
  createDiet,
  getDiets,
  updateDiet,
  deleteDiet,
} = require("../controllers/dietController");
const router = express.Router();

router.post("/diets", createDiet);
router.get("/diets", getDiets);
router.put("/diets/:id", updateDiet);
router.delete("/diets/:id", deleteDiet);

module.exports = router;
