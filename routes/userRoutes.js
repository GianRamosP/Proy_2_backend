// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { registerUser, loginUser } = require("../controllers/userController");
const { protect, verifyRole } = require("../middleware/authMiddleware");

// Ruta users
router.get("/users", protect, verifyRole("admin"), async (req, res) => {
  // router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta users id
router.get("/users/:userId", protect, async (req, res) => {
  // router.get("/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta no protegida registro
router.post("/register", registerUser);

// Ruta login no protegida
router.post("/login", loginUser);

router.get("/admin", protect, verifyRole("admin"), (req, res) => {
  res.json({ message: "Acceso concedido al admin" });
});

// Crear usuarios protegida
router.post("/admin/users", protect, verifyRole("admin"), async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update protegida
router.put(
  "/admin/users/:userId",
  protect,
  verifyRole("admin"),
  async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Eliminacino protegida
router.delete(
  "/admin/users/:userId",
  protect,
  verifyRole("admin"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json({ message: "Usuario eliminado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
