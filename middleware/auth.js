// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Obtiene el token del encabezado Authorization
  console.log("Token recibido:", token); // Log para verificar el token recibido

  if (!token) {
    return res.status(403).json({ message: "No se proporcionó un token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token no válido" });
    }
    req._id = decoded.id; // Asigna el ID del usuario decodificado a la solicitud
    next();
  });
};

module.exports = { verifyToken };
