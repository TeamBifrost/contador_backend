import express from "express";
import cors from "cors";
import getUsers  from "./routers/usuarios.route.js";
const app = express();

// Middleware para CORS
app.use(cors());

// Middleware para parsear JSON y datos urlencoded
app.use(express.json());

app.use("/api", getUsers);
// Manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        message: "endpoint no encontrado"
    });
});

export default app;

