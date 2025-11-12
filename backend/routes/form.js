import express from "express";
import connection from "../db.js";

const router = express.Router();

// 🧾 Formulario principal
router.post("/formulario-secundario", async (req, res) => {
  const { nombre, tipo, codigo, fecha } = req.body;
  try {
    await connection.promise().query(
      "INSERT INTO formulario_secundario (nombre, tipo, codigo, fecha) VALUES (?, ?, ?, ?)",
      [nombre, tipo, codigo, fecha]
    );
    res.json({ message: "Formulario guardado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al guardar el formulario" });
  }
});

// 🧩 Agregar implemento
router.post("/agregar", async (req, res) => {
  const { codigo, nombre, estado, usuario } = req.body;
  try {
    await connection.promise().query(
      "INSERT INTO agregar (codigo, nombre, estado, usuario) VALUES (?, ?, ?, ?)",
      [codigo, nombre, estado, usuario]
    );
    res.json({ message: "Implemento agregado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al agregar el implemento" });
  }
});

// 📦 Registrar préstamo
router.post("/prestamo", async (req, res) => {
  const { usuario, codigo, implemento, fecha } = req.body;
  try {
    await connection.promise().query(
      "INSERT INTO prestamo (usuario, codigo, implemento, fecha) VALUES (?, ?, ?, ?)",
      [usuario, codigo, implemento, fecha]
    );
    res.json({ message: "Préstamo registrado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al registrar el préstamo" });
  }
});

export default router;
