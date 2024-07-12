import { pool } from "../db.js";
import bcrypt from "bcrypt";


//aqui se hace las acciones de Get, put y delete.
 export const getUsers = async(req, res) =>{
    try{
        const sql = "SELECT * FROM usuarios";
        const [rows, fields] = await pool.query(sql);
        res.json(rows)
    }
    catch(error){
        console.error("Error al obtener los usuarios:",error);
        res.status(500).json({
            error: ERROR_MESSAGES.internalServerError

        });      

    }
 };
 
 export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = "SELECT * FROM usuarios WHERE coduser = ?";
        const [rows, fields] = await pool.query(sql, [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "Usuario no encontrado"
            });
        }
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({
            error: "Ocurrió un error en el servidor"
        });
    }
};
 // Función para crear un nuevo usuario
 export const createUser = async (req, res) => {
    const { nombre, usuario, contrasena, correo } = req.body;

    try {
        // Verificar que todos los campos requeridos estén presentes
        if (!nombre || !usuario || !contrasena || !correo) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }

        // Hashear la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Insertar usuario en la base de datos
        const sql = "INSERT INTO usuarios (nombre, usuario, contrasena, correo) VALUES (?, ?, ?, ?)";
        const [result] = await pool.query(sql, [nombre, usuario, hashedPassword, correo]);

        // Devolver respuesta exitosa
        res.status(201).json({
            coduser: result.insertId,
            nombre,
            usuario,
            contrasena,
            correo
        });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({
            error: "Ocurrió un error en el servidor"
        });
    }
};

