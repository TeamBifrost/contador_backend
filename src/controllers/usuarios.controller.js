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

// Función para actualizar un usuario existente
export const putUser = async (req, res) => {
    const { id } = req.params; // Obtener el id del usuario desde los parámetros de la URL
    const { nombre, usuario, contrasena, correo } = req.body; // Obtener los datos a actualizar desde el cuerpo de la solicitud

    try {
        // Verificar que al menos uno de los campos a actualizar esté presente en la solicitud
        if (!nombre && !usuario && !contrasena && !correo) {
            return res.status(400).json({ error: "Se requiere al menos un campo para actualizar" });
        }

        // Construir la parte dinámica de la consulta SQL según los campos proporcionados
        let sql = "UPDATE usuarios SET ";
        const values = [];

        if (nombre) {
            sql += "nombre = ?, ";
            values.push(nombre);
        }
        if (usuario) {
            sql += "usuario = ?, ";
            values.push(usuario);
        }
        if (contrasena) {
            // Hashear la nueva contraseña antes de almacenarla
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            sql += "contrasena = ?, ";
            values.push(hashedPassword);
        }
        if (correo) {
            sql += "correo = ?, ";
            values.push(correo);
        }

        // Eliminar la última coma y espacio extra de la consulta SQL
        sql = sql.slice(0, -2);

        // Agregar el filtro WHERE para actualizar solo el usuario específico
        sql += " WHERE coduser = ?";
        values.push(id);

        // Ejecutar la consulta SQL para actualizar el usuario
        await pool.query(sql, values);

        // Devolver una respuesta exitosa
        res.json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({
            error: "Ocurrió un error en el servidor"
        });
    }
};

// Función para eliminar un usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params; // Obtener el id del usuario desde los parámetros de la URL

    try {
        // Construir la consulta SQL para eliminar el usuario
        const sql = "DELETE FROM usuarios WHERE coduser = ?";
        const [result] = await pool.query(sql, [id]);

        // Verificar si se eliminó correctamente
        if (result.affectedRows > 0) {
            res.json({ message: "Usuario eliminado correctamente" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).json({
            error: "Ocurrió un error en el servidor"
        });
    }
};
