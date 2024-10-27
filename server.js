const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const helmet = require("helmet");

const userRoutes = require("./routes/userRoutes");
const dietRoutes = require("./routes/dietRoutes");
const routineRoutes = require("./routes/routineRoutes");
const authRoutes = require("./routes/authRoutes"); // Importa el archivo de rutas de autenticación

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Usa las rutas
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", dietRoutes);
app.use("/api", routineRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
