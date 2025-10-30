// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Ruta para recuperar contraseña
app.post("/recuperar", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Correo requerido" });

  // Aquí podrías buscar en tu base de datos si el correo existe
  // (por ahora, simulamos que sí)
  const linkRecuperacion = `http://localhost:5500/recuperar.html?email=${encodeURIComponent(email)}`;

  // Configura el envío de correo
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "TU_CORREO@gmail.com", // reemplaza por tu correo
      pass: "TU_CONTRASEÑA_DE_APLICACIÓN", // no tu contraseña normal
    },
  });

  const mailOptions = {
    from: "BioCampus <no-reply@biocampus.com>",
    to: email,
    subject: "Recupera tu contraseña - BioCampus",
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${linkRecuperacion}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Correo de recuperación enviado exitosamente" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({ message: "Error enviando el correo" });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor backend activo en http://localhost:${PORT}`));
