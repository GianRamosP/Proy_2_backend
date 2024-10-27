const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// Registrar usuario
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hash de la contraseña almacenada:", hashedPassword);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    console.log("Hash de la contraseña almacenada:", user.password);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// Crear usuario desde el panel de administrador
const createUserAsAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const adminUser = await User.findById(req._id);
    if (adminUser.role !== "admin") {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error al crear usuario como administrador:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  await check("email", "El correo electrónico es inválido").isEmail().run(req);
  await check("password", "La contraseña es requerida").notEmpty().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    console.log("Email:", email);
    console.log("Password:", password);

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log("Contraseña ingresada:", password);
    console.log("Hash de la base de datos:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("¿Las contraseñas coinciden?", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Error en el login:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = { registerUser, loginUser, createUserAsAdmin };
