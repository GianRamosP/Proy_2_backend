const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { registerUser, loginUser } = require("../controllers/userController");

// Ruta para obtener todos los usuarios
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener un usuario por su ObjectId (MongoDB _id)
router.get("/users/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }); // Buscar por userId
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rutas login register
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
