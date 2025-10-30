// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🚀 Configura tu correo y contraseña de aplicación
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true para puerto 465 (SSL)
  auth: {
    user: "TU_CORREO@gmail.com", // reemplázalo por el tuyo
    pass: "TU_CONTRASEÑA_DE_APLICACIÓN", // contraseña de aplicación, no la normal
  },
});

// 📩 Ruta para recuperación de contraseña
app.post("/recuperar", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Correo requerido" });

  // Enlace de recuperación (puede apuntar a tu app en Vercel)
  const linkRecuperacion = `https://biocampus.vercel.app/recuperar.html?email=${encodeURIComponent(email)}`;

  const mailOptions = {
    from: '"BioCampus" <TU_CORREO@gmail.com>',
    to: email,
    subject: "🔐 Recupera tu contraseña - BioCampus",
    html: `
      <div style="font-family:Arial,sans-serif;padding:20px;background:#f5f5f5;">
        <h2 style="color:#3ddc84;">Recuperación de contraseña</h2>
        <p>Hola, recibimos una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para continuar:</p>
        <a href="${linkRecuperacion}" 
           style="background:#3ddc84;color:white;padding:10px 16px;
           border-radius:6px;text-decoration:none;">Restablecer contraseña</a>
        <p style="margin-top:20px;font-size:12px;color:#555;">
          Si no solicitaste este cambio, ignora este correo.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "📨 Correo de recuperación enviado exitosamente" });
  } catch (error) {
    console.error("❌ Error enviando el correo:", error);
    res.status(500).json({ message: "Error enviando el correo" });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Servidor activo en http://localhost:${PORT}`));
