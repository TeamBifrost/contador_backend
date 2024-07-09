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


