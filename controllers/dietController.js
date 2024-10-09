const Diet = require("../models/Diet");

// Crear nueva dieta
const createDiet = async (req, res) => {
  const { name, items } = req.body;
  const diet = new Diet({ name, items, user: req.user._id });
  await diet.save();
  res.status(201).json(diet);
};

// Obtener todas las dietas de un usuario
const getDiets = async (req, res) => {
  const diets = await Diet.find({ user: req.user._id });
  res.json(diets);
};

// Actualizar dieta
const updateDiet = async (req, res) => {
  const diet = await Diet.findById(req.params.id);
  if (diet.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }
  diet.name = req.body.name || diet.name;
  diet.items = req.body.items || diet.items;
  await diet.save();
  res.json(diet);
};

// Eliminar dieta
const deleteDiet = async (req, res) => {
  const diet = await Diet.findById(req.params.id);
  if (diet.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }
  await diet.remove();
  res.json({ message: "Diet removed" });
};

module.exports = { createDiet, getDiets, updateDiet, deleteDiet };
