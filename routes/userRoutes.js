// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { registerUser, loginUser } = require("../controllers/userController");
const { protect, verifyRole } = require("../middleware/authMiddleware");
const { check } = require("express-validator");

// Route to get all users
router.get("/users", protect, verifyRole("admin"), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/users/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req._id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Unprotected route for registration
router.post("/register", registerUser);

// Unprotected route for login
// router.post("/login", loginUser);
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("El correo electrónico es inválido"),
    check("password").notEmpty().withMessage("La contraseña es requerida"),
  ],
  loginUser
);

// Admin access route
router.get("/admin", protect, verifyRole("admin"), (req, res) => {
  res.json({ message: "Acceso concedido al admin" });
});

// Protected route to create users
router.post("/admin/users", protect, verifyRole("admin"), async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(
  "/admin/users/me",
  protect,
  verifyRole("admin"),
  async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req._id, req.body, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/admin/users/me",
  protect,
  verifyRole("admin"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req._id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json({ message: "Usuario eliminado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.put("/users/:id", protect, verifyRole("admin"), async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
