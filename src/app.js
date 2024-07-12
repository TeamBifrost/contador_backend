import express from "express";
import cors from "cors";
import getUsers  from "./routers/usuarios.route.js";
import getUserById from "./routers/usuarios.route.js";
import createUser from "./routers/usuarios.route.js";
import  putUser from "./routers/usuarios.route.js";
import deleteUser from "./routers/usuarios.route.js";

//importaciones clientes
import getClientes from "./routers/cliente.route.js";
import getClienteById from "./routers/cliente.route.js";
import createCliente from "./routers/cliente.route.js";
import updateCliente from "./routers/cliente.route.js";
import deleteCliente from "./routers/cliente.route.js";
 

const app = express();

// Middleware para CORS
app.use(cors());

// Middleware para parsear JSON y datos urlencoded
app.use(express.json());

//Rutas para endpoint usuario.
app.use("/api", getUsers);
app.use("/api", getUserById);
app.use("/api", createUser);
app.use("/api", putUser);
app.use("/api", deleteUser);

//rutas para endpoint clientes.
app.use("/api", getClientes);
app.use("/api", getClienteById);
app.use("/api", createCliente);
app.use("/api",updateCliente);
app.use("/api", deleteCliente);

// Manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        message: "endpoint no encontrado"
    });
});

export default app;

