import { pool } from "../db.js";

// Crear un nuevo contrato y obtener información del cliente
export const createContrato = async (req, res) => {
    const { cliente, cantMeses } = req.body;

    try {
        // Verificar que los campos requeridos estén presentes
        if (!cliente || !cantMeses) {
            return res.status(400).json({ error: "Los campos 'cliente' y 'cantMeses' son requeridos" });
        }

        // Insertar contrato en la base de datos
        const sqlInsert = "INSERT INTO contrato (cliente, cantMeses) VALUES (?, ?)";
        const [result] = await pool.query(sqlInsert, [cliente, cantMeses]);

        // Obtener información del contrato y del cliente
        const sqlSelect = `
            SELECT 
                contrato.codContrato, 
                contrato.cliente, 
                cliente.nombre, 
                contrato.cantMeses
            FROM 
                contrato
            JOIN 
                cliente ON contrato.cliente = cliente.codCliente
            WHERE
                contrato.codContrato = ?;
        `;
        const [rows] = await pool.query(sqlSelect, [result.insertId]);

        // Devolver respuesta exitosa con la información del contrato y del cliente
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Error al crear el contrato:", error);
        res.status(500).json({
            error: "Ocurrió un error al crear el contrato"
        });
    }
};

// Obtener todos los contratos con información del cliente
export const getContratos = async (req, res) => {
    try {
        const sql = `
            SELECT 
                contrato.codContrato, 
                contrato.cliente, 
                cliente.nombre, 
                contrato.cantMeses
            FROM 
                contrato
            JOIN 
                cliente ON contrato.cliente = cliente.codCliente;
        `;
        const [rows] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los contratos:", error);
        res.status(500).json({
            error: "Ocurrió un error al obtener los contratos"
        });
    }
};

// Obtener un contrato por su ID con información del cliente
export const getContratoById = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `
            SELECT 
                contrato.codContrato, 
                contrato.cliente, 
                cliente.nombre, 
                contrato.cantMeses
            FROM 
                contrato
            JOIN 
                cliente ON contrato.cliente = cliente.codCliente
            WHERE 
                contrato.codContrato = ?;
        `;
        const [rows] = await pool.query(sql, [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "Contrato no encontrado"
            });
        }
    } catch (error) {
        console.error("Error al obtener el contrato:", error);
        res.status(500).json({
            error: "Ocurrió un error al obtener el contrato"
        });
    }
};

// Actualizar un contrato existente
export const updateContrato = async (req, res) => {
    const { id } = req.params;
    const { cliente, cantMeses } = req.body;

    try {
        // Verificar que al menos uno de los campos a actualizar esté presente en la solicitud
        if (!cliente && !cantMeses) {
            return res.status(400).json({ error: "Se requiere al menos un campo para actualizar" });
        }

        // Crear la consulta de actualización dinámica
        let sql = "UPDATE contrato SET ";
        const fields = [];
        const values = [];
        if (cliente) {
            fields.push("cliente = ?");
            values.push(cliente);
        }
        if (cantMeses) {
            fields.push("cantMeses = ?");
            values.push(cantMeses);
        }
        sql += fields.join(", ") + " WHERE codContrato = ?";
        values.push(id);

        await pool.query(sql, values);

        // Obtener información actualizada del contrato y del cliente
        const sqlSelect = `
            SELECT 
                contrato.codContrato, 
                contrato.cliente, 
                cliente.nombre, 
                contrato.cantMeses
            FROM 
                contrato
            JOIN 
                cliente ON contrato.cliente = cliente.codCliente
            WHERE 
                contrato.codContrato = ?;
        `;
        const [rows] = await pool.query(sqlSelect, [id]);

        // Devolver una respuesta exitosa con la información del contrato y del cliente
        res.json(rows[0]);
    } catch (error) {
        console.error("Error al actualizar el contrato:", error);
        res.status(500).json({
            error: "Ocurrió un error al actualizar el contrato"
        });
    }
};

// Eliminar un contrato
export const deleteContrato = async (req, res) => {
    const { id } = req.params;

    try {
        // Eliminar contrato de la base de datos
        const sqlDelete = "DELETE FROM contrato WHERE codContrato = ?";
        await pool.query(sqlDelete, [id]);

        // Devolver una respuesta exitosa
        res.json({ message: "Contrato eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el contrato:", error);
        res.status(500).json({
            error: "Ocurrió un error al eliminar el contrato"
        });
    }
};
