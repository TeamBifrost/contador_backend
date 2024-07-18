import { pool } from "../db.js";

export const createFacturacion = async (req, res) => {
    const { contrato, producto, preciofob, porcentajeflete, flete, margen, precioventa, tonermensual, toneranual, costoToner, facturacionToner } = req.body;

    try {
        const sql = `
            INSERT INTO facturacion (contrato, producto, preciofob, porcentajeflete, flete, margen, precioventa, tonermensual, toneranual, costoToner, facturacionToner)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(sql, [contrato, producto, preciofob, porcentajeflete, flete, margen, precioventa, tonermensual, toneranual, costoToner, facturacionToner]);

        const sqlSelect = `
            SELECT * FROM facturacion WHERE facturaproducto = ?
        `;
        const [rows] = await pool.query(sqlSelect, [result.insertId]);

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Error al crear la facturación:", error);
        res.status(500).json({
            error: "Ocurrió un error al crear la facturación"
        });
    }
};
export const getFacturaciones = async (req, res) => {
    try {
        const sql = `SELECT * FROM facturacion`;
        const [rows] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener las facturaciones:", error);
        res.status(500).json({
            error: "Ocurrió un error al obtener las facturaciones"
        });
    }
};
export const getFacturacionById = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `SELECT * FROM facturacion WHERE facturaproducto = ?`;
        const [rows] = await pool.query(sql, [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "Facturación no encontrada"
            });
        }
    } catch (error) {
        console.error("Error al obtener la facturación:", error);
        res.status(500).json({
            error: "Ocurrió un error al obtener la facturación"
        });
    }
};
export const updateFacturacion = async (req, res) => {
    const { id } = req.params;
    const { contrato, producto, preciofob, porcentajeflete, flete, margen, precioventa, tonermensual, toneranual, costoToner, facturacionToner } = req.body;

    try {
        const sql = `
            UPDATE facturacion
            SET contrato = ?, producto = ?, preciofob = ?, porcentajeflete = ?, flete = ?, margen = ?, precioventa = ?, tonermensual = ?, toneranual = ?, costoToner = ?, facturacionToner = ?
            WHERE facturaproducto = ?
        `;
        await pool.query(sql, [contrato, producto, preciofob, porcentajeflete, flete, margen, precioventa, tonermensual, toneranual, costoToner, facturacionToner, id]);

        const sqlSelect = `SELECT * FROM facturacion WHERE facturaproducto = ?`;
        const [rows] = await pool.query(sqlSelect, [id]);

        res.json(rows[0]);
    } catch (error) {
        console.error("Error al actualizar la facturación:", error);
        res.status(500).json({
            error: "Ocurrió un error al actualizar la facturación"
        });
    }
};
export const deleteFacturacion = async (req, res) => {
    const { id } = req.params;
    try {
        const sqlDelete = `DELETE FROM facturacion WHERE facturaproducto = ?`;
        await pool.query(sqlDelete, [id]);
        res.json({ message: "Facturación eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la facturación:", error);
        res.status(500).json({
            error: "Ocurrió un error al eliminar la facturación"
        });
    }
};