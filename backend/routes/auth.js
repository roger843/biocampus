import express from "express";
import bcrypt from "bcrypt";
import { db } from "../db.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req,res)=>{
    try{
        const { nombre, email, password, telefono, fecha_nacimiento } = req.body;

        if(!nombre || !email || !password){
            return res.status(400).json({msg:"Campos obligatorios"});
        }

        const [userExist] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if(userExist.length > 0) return res.status(400).json({msg:"Email ya registrado"});

        const hash = await bcrypt.hash(password,10);

        await db.query(`
            INSERT INTO usuarios (nombre,email,password,telefono,fecha_nacimiento) 
            VALUES (?,?,?,?,?)
        `,[nombre,email,hash,telefono,fecha_nacimiento]);

        return res.json({msg:"Usuario registrado con éxito"});
    }catch(e){
        return res.status(500).json({msg:"Error en servidor",error:e});
    }
});

// LOGIN
router.post("/login", async (req,res)=>{
    try{
        const { email, password } = req.body;

        const [user] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if(user.length === 0) return res.status(400).json({msg:"Usuario no encontrado"});

        const valid = await bcrypt.compare(password,user[0].password);
        if(!valid) return res.status(400).json({msg:"Contraseña incorrecta"});

        return res.json({msg:"Login correcto", usuario:{id:user[0].id, nombre:user[0].nombre, rol:user[0].rol}});
    }catch(e){
        return res.status(500).json({msg:"Error servidor"});
    }
});

export default router;
