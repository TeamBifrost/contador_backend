import { pool } from "../db.js";

// Obtener todos los tipos de productos
export const getTiposProductos = async (req, res) => {
    try {
        const sql = "SELECT * FROM tipoproducto";
        const [rows, fields] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los tipos de productos:", error);
        res.status(500).json({
            error: "Ocurrió un error al obtener los tipos de productos"
        });
    }
};

// Obtener un tipo de producto por su ID
export const getTipoProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = "SELECT * FROM tipoproducto WHERE codtipo = ?";
        const [rows, fields] = await pool.query(sql, [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "Tipo de producto no encontrado"
            });
        }
    } catch (error) {
        console.error("Error al obtener el tipo de producto:", error);
        res.status(500).json({
            error: "Ocurrió un error al obtener el tipo de producto"
        });
    }
};

// Crear un nuevo tipo de producto
export const createTipoProducto = async (req, res) => {
    const { descripciontipo } = req.body;

    try {
        // Verificar que el campo requerido esté presente
        if (!descripciontipo) {
            return res.status(400).json({ error: "El campo 'descripciontipo' es requerido" });
        }

        // Insertar tipo de producto en la base de datos
        const sql = "INSERT INTO tipoproducto (descripciontipo) VALUES (?)";
        const [result] = await pool.query(sql, [descripciontipo]);

        // Devolver respuesta exitosa
        res.status(201).json({
            codtipo: result.insertId,
            descripciontipo
        });
    } catch (error) {
        console.error("Error al crear el tipo de producto:", error);
        res.status(500).json({
            error: "Ocurrió un error al crear el tipo de producto"
        });
    }
};

// Actualizar un tipo de producto existente
export const updateTipoProducto = async (req, res) => {
    const { id } = req.params;
    const { descripciontipo } = req.body;

    try {
        // Verificar que el campo requerido esté presente
        if (!descripciontipo) {
            return res.status(400).json({ error: "El campo 'descripciontipo' es requerido" });
        }

        // Actualizar tipo de producto en la base de datos
        const sql = "UPDATE tipoproducto SET descripciontipo = ? WHERE codtipo = ?";
        await pool.query(sql, [descripciontipo, id]);

        // Devolver una respuesta exitosa
        res.json({ message: "Tipo de producto actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el tipo de producto:", error);
        res.status(500).json({
            error: "Ocurrió un error al actualizar el tipo de producto"
        });
    }
};

// Eliminar un tipo de producto
export const deleteTipoProducto = async (req, res) => {
    const { id } = req.params;

    try {
        // Eliminar tipo de producto de la base de datos
        const sql = "DELETE FROM tipoproducto WHERE codtipo = ?";
        await pool.query(sql, [id]);

        // Devolver una respuesta exitosa
        res.json({ message: "Tipo de producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el tipo de producto:", error);
        res.status(500).json({
            error: "Ocurrió un error al eliminar el tipo de producto"
        });
    }
};