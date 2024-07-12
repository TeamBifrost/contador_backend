import { pool } from "../db.js";

// Obtener todos los clientes
export const getClientes = async (req, res) => {
    try {
        const sql = "SELECT * FROM cliente";
        const [rows, fields] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).json({
            error: "Ocurrió un error al obtener los clientes"
        });
    }
};

// Obtener un cliente por su ID
export const getClienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = "SELECT * FROM cliente WHERE codCliente = ?";
        const [rows, fields] = await pool.query(sql, [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "Cliente no encontrado"
            });
        }
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        res.status(500).json({
            error: "Ocurrió un error al obtener el cliente"
        });
    }
};

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
    const { nombre } = req.body;

    try {
        // Verificar que el campo requerido esté presente
        if (!nombre) {
            return res.status(400).json({ error: "El campo 'nombre' es requerido" });
        }

        // Insertar cliente en la base de datos
        const sql = "INSERT INTO cliente (nombre) VALUES (?)";
        const [result] = await pool.query(sql, [nombre]);

        // Devolver respuesta exitosa
        res.status(201).json({
            codCliente: result.insertId,
            nombre
        });
    } catch (error) {
        console.error("Error al crear el cliente:", error);
        res.status(500).json({
            error: "Ocurrió un error al crear el cliente"
        });
    }
};

// Actualizar un cliente existente
export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        // Verificar que al menos uno de los campos a actualizar esté presente en la solicitud
        if (!nombre) {
            return res.status(400).json({ error: "Se requiere al menos el campo 'nombre' para actualizar" });
        }

        // Actualizar cliente en la base de datos
        const sql = "UPDATE cliente SET nombre = ? WHERE codCliente = ?";
        await pool.query(sql, [nombre, id]);

        // Devolver una respuesta exitosa
        res.json({ message: "Cliente actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).json({
            error: "Ocurrió un error al actualizar el cliente"
        });
    }
};

// Eliminar un cliente
export const deleteCliente = async (req, res) => {
    const { id } = req.params;

    try {
        // Eliminar cliente de la base de datos
        const sql = "DELETE FROM cliente WHERE codCliente = ?";
        await pool.query(sql, [id]);

        // Devolver una respuesta exitosa
        res.json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        res.status(500).json({
            error: "Ocurrió un error al eliminar el cliente"
        });
    }
};