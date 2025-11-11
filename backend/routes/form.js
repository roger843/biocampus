import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Ruta para formulario principal
router.post("/formulario", async (req, res) => {
  try {
    const { nombre, correo, mensaje } = req.body;
    await db.query("INSERT INTO formulario (nombre, correo, mensaje) VALUES (?, ?, ?)", [nombre, correo, mensaje]);
    res.json({ success: true, message: "Formulario guardado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error al guardar formulario" });
  }
});

// Ruta para agregar
router.post("/agregar", async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    await db.query("INSERT INTO agregar (nombre, descripcion) VALUES (?, ?)", [nombre, descripcion]);
    res.json({ success: true, message: "Registro agregado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error al agregar registro" });
  }
});

// Ruta para préstamo
router.post("/prestamo", async (req, res) => {
  try {
    const { usuario, libro, fecha } = req.body;
    await db.query("INSERT INTO prestamo (usuario, libro, fecha) VALUES (?, ?, ?)", [usuario, libro, fecha]);
    res.json({ success: true, message: "Préstamo registrado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error al registrar préstamo" });
  }
});

// Ruta para formulario secundario
router.post("/formulario-secundario", async (req, res) => {
  try {
    const { nombre, detalle } = req.body;
    await db.query("INSERT INTO formulario_secundario (nombre, detalle) VALUES (?, ?)", [nombre, detalle]);
    res.json({ success: true, message: "Formulario secundario guardado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error al guardar formulario secundario" });
  }
});

export default router;
