import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import formRoutes from './routes/form.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


app.use("/", formRoutes);
app.use("/auth", authRoutes);


app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Servidor backend listo en puerto", PORT);
});

