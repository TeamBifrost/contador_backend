import express from "express";
import cors from "cors";
import getUsers  from "./routers/usuarios.route.js";
import getUserById from "./routers/usuarios.route.js";
import createUser from "./routers/usuarios.route.js";
import  putUser from "./routers/usuarios.route.js";

const app = express();

// Middleware para CORS
app.use(cors());

// Middleware para parsear JSON y datos urlencoded
app.use(express.json());

app.use("/api", getUsers);
app.use("/api", getUserById);
app.use("/api", createUser);
app.use("/api", putUser);

// Manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        message: "endpoint no encontrado"
    });
});

export default app;

