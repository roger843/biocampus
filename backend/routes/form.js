// backend/routes/form.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// 🟢 Ruta para el formulario principal (index.html)
router.post("/formulario", async (req, res) => {
  try {
    const { nombre, correo, asunto, mensaje } = req.body;

    await db.query(
      "INSERT INTO formularios (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)",
      [nombre, correo, asunto, mensaje]
    );

    res.json({ message: "✅ Formulario guardado correctamente." });
  } catch (error) {
    console.error("❌ Error en /formulario:", error);
    res.status(500).json({ message: "Error al guardar el formulario." });
  }
});

// 🟢 Ruta para agregar recursos (agregar.html)
router.post("/agregar", async (req, res) => {
  try {
    const { codigo, nombre, descripcion, estado } = req.body;

    await db.query(
      "INSERT INTO recursos (codigo, nombre, descripcion, estado) VALUES (?, ?, ?, ?)",
      [codigo, nombre, descripcion, estado]
    );

    res.json({ message: "✅ Recurso agregado correctamente." });
  } catch (error) {
    console.error("❌ Error en /agregar:", error);
    res.status(500).json({ message: "Error al agregar recurso." });
  }
});

// 🟢 Ruta para registrar préstamo (prestamo.html)
router.post("/prestamo", async (req, res) => {
  try {
    const { codigoImplemento, usuario, fechaPrestamo, fechaDevolucion } = req.body;

    await db.query(
      "INSERT INTO prestamos (codigoImplemento, usuario, fechaPrestamo, fechaDevolucion) VALUES (?, ?, ?, ?)",
      [codigoImplemento, usuario, fechaPrestamo, fechaDevolucion]
    );

    res.json({ message: "✅ Préstamo registrado correctamente." });
  } catch (error) {
    console.error("❌ Error en /prestamo:", error);
    res.status(500).json({ message: "Error al registrar préstamo." });
  }
});

// 🟢 Ruta para formulario secundario (formulario.html)
router.post("/formulario-secundario", async (req, res) => {
  try {
    const { campo1, campo2, campo3 } = req.body;

    await db.query(
      "INSERT INTO formularios_secundarios (campo1, campo2, campo3) VALUES (?, ?, ?)",
      [campo1, campo2, campo3]
    );

    res.json({ message: "✅ Formulario secundario guardado correctamente." });
  } catch (error) {
    console.error("❌ Error en /formulario-secundario:", error);
    res.status(500).json({ message: "Error al guardar formulario secundario." });
  }
});

export default router;
