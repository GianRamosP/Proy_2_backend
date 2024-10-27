// adminRoutes.js
const express = require("express");
const { createUserAsAdmin } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Ruta protegida para crear usuario como administrador
router.post("/users", authMiddleware, createUserAsAdmin);

module.exports = router;
