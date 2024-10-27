// routes/authRoutes.js

const express = require("express");
const { verifyToken } = require("../middleware/auth"); // Ensure the path is correct
const User = require("../models/User");

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req._id); // Fetch the user by ID from the token
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user); // Send back the user's information
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
