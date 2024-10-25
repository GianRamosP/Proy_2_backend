// routes/authRoutes.js (o el archivo donde tengas el endpoint)

const express = require("express");
const { verifyToken } = require("../middleware/auth"); // Asegúrate de que el path sea correcto
const User = require("../models/User");

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Busca el usuario por ID
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user); // Envía la información del usuario
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
