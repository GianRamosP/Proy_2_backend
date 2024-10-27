const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar usuario
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body; // Asegúrate de que 'role' está incluido si es necesario

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const lastUser = await User.findOne().sort({ userId: -1 });
    const newUserId = (lastUser ? lastUser.userId : 0) + 1;

    const user = new User({
      userId: newUserId,
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role, // Incluye el rol si es necesario
    });

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
    // Verificar si el usuario que hace la solicitud es administrador
    const adminUser = await User.findById(req.userId);
    if (adminUser.role !== "admin") {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Generar un nuevo userId si es necesario
    const lastUser = await User.findOne().sort({ userId: -1 });
    const newUserId = (lastUser ? lastUser.userId : 0) + 1;

    const user = new User({
      userId: newUserId,
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role, // Definir el rol del usuario
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
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Crear token JWT
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
