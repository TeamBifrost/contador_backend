import { pool } from "../db.js";

// Obtener todos los productos
export const getProductos = async (req, res) => {
    const { tipo } = req.query; // Obtener el parámetro tipo de la consulta
    
    try {
        let sql = "SELECT * FROM productos";
        let params = [];

        if (tipo) {
            sql += " WHERE tipo = ?";
            params.push(tipo);
        }

        const [rows, fields] = await pool.query(sql, params);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({
            error: "Ocurrió un error al obtener los productos"
        });
    }
};

// Obtener un producto por su ID
export const getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = "SELECT * FROM productos WHERE pn = ?";
        const [rows, fields] = await pool.query(sql, [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "Producto no encontrado"
            });
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({
            error: "Ocurrió un error al obtener el producto"
        });
    }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
    const { pn, tipo, descripcion, price, rendimiento, rmvp, dutycycle } = req.body;

    try {
        // Verificar que los campos requeridos estén presentes
        if (!pn || !tipo || !descripcion || !price) {
            return res.status(400).json({ error: "Los campos 'pn', 'tipo', 'descripcion' y 'price' son requeridos" });
        }

        // Insertar producto en la base de datos
        const sql = "INSERT INTO productos (pn, tipo, descripcion, price, rendimiento, rmvp, dutycycle) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const [result] = await pool.query(sql, [pn, tipo, descripcion, price, rendimiento, rmvp, dutycycle]);

        // Devolver respuesta exitosa
        res.status(201).json({
            pn,
            tipo,
            descripcion,
            price,
            rendimiento,
            rmvp,
            dutycycle
        });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({
            error: "Ocurrió un error al crear el producto"
        });
    }
};

// Actualizar un producto existente
export const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { pn, tipo, descripcion, price, rendimiento, rmvp, dutycycle } = req.body;

    try {
        // Verificar que al menos uno de los campos a actualizar esté presente en la solicitud
        if (!pn && !tipo && !descripcion && !price && !rendimiento && !rmvp && !dutycycle) {
            return res.status(400).json({ error: "Se requiere al menos un campo para actualizar" });
        }

        // Crear la consulta de actualización dinámica
        let sql = "UPDATE productos SET ";
        const fields = [];
        const values = [];
        if (pn) {
            fields.push("pn = ?");
            values.push(pn);
        }
        if (tipo) {
            fields.push("tipo = ?");
            values.push(tipo);
        }
        if (descripcion) {
            fields.push("descripcion = ?");
            values.push(descripcion);
        }
        if (price) {
            fields.push("price = ?");
            values.push(price);
        }
        if (rendimiento) {
            fields.push("rendimiento = ?");
            values.push(rendimiento);
        }
        if (rmvp) {
            fields.push("rmvp = ?");
            values.push(rmvp);
        }
        if (dutycycle) {
            fields.push("dutycycle = ?");
            values.push(dutycycle);
        }
        sql += fields.join(", ") + " WHERE pn = ?";
        values.push(id);

        await pool.query(sql, values);

        // Devolver una respuesta exitosa
        res.json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({
            error: "Ocurrió un error al actualizar el producto"
        });
    }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
    const { id } = req.params;

    try {
        // Eliminar producto de la base de datos
        const sql = "DELETE FROM productos WHERE pn = ?";
        await pool.query(sql, [id]);

        // Devolver una respuesta exitosa
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({
            error: "Ocurrió un error al eliminar el producto"
        });
    }
};
