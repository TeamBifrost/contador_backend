//funcion que permite crear el protocolo http y enrutado web
import {Router} from "express";
// exportando las consultas de nuestro controlador
import {getUsers, getUserById, createUser, putUser, deleteUser} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/usuarios", getUsers);
router.get("/usuarios/:id", getUserById);
router.post("/usuarios", createUser);
router.put("/usuarios/:id", putUser);
router.delete("/usuarios/:id", deleteUser);

export default router;