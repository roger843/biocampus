import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'

// Configuración para poder usar __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

// Rutas de autenticación (API)
app.use('/auth', authRoutes)

// Servir los archivos del frontend
app.use(express.static(path.join(__dirname, '../frontend')))

// Ruta por defecto: si alguien entra al servidor sin especificar un archivo, que muestre index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

app.listen(3000, () => {
  console.log('Servidor backend listo en puerto 3000')
})