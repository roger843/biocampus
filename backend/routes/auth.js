import express from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../models/User.js";

const router = express.Router();

// 📩 Solicitar enlace de recuperación
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await transporter.sendMail({
      to: user.email,
      subject: "Recuperación de contraseña",
      html: `<p>Haz clic aquí para restablecer tu contraseña:</p>
             <a href="${link}">${link}</a>`
    });

    res.json({ message: "Correo enviado para restablecer contraseña" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al enviar correo" });
  }
});

// 🔑 Restablecer contraseña con token
router.post("/reset-password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ message: "Token inválido o expirado" });

    const hashed = await bcrypt.hash(req.body.password, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al restablecer contraseña" });
  }
});

export default router;
