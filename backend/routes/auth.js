import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";

const router = express.Router();

// ✅ Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password, telefono, rol, fecha_nacimiento } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Nombre, correo y contraseña son obligatorios." });
    }

    // Verificar si el usuario ya existe
    const [existe] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (existe.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario
    await db.query(
      `INSERT INTO usuarios (nombre, email, password, telefono, rol, fecha_nacimiento)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, email, hashedPassword, telefono, rol || "usuario", fecha_nacimiento]
    );

    res.status(201).json({ message: "✅ Usuario registrado correctamente." });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ message: "❌ Error interno al registrar el usuario." });
  }
});


// ✅ Inicio de sesión
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Correo y contraseña requeridos." });
    }

    // Buscar usuario
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const user = rows[0];

    // Comparar contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // Si todo está bien
    res.json({
      message: "✅ Inicio de sesión exitoso.",
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "❌ Error interno al iniciar sesión." });
  }
});

export default router;
