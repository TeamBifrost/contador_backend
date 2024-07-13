import express from "express";
import cors from "cors";
import rutaUsuario  from "./routers/usuarios.route.js";
import rutaClientes from "./routers/cliente.route.js";
import tipoProductos from "./routers/tipoproducto.route.js";
import productoRoutes from './routers/producto.route.js';
import contratoRoutes from './routers/contrato.route.js'; 
const app = express();
// Middleware para CORS
app.use(cors());

// Middleware para parsear JSON y datos urlencoded
app.use(express.json());

//Rutas .
app.use("/api", rutaUsuario);
app.use("/api", rutaClientes);
app.use("/api", tipoProductos);
app.use("/api", productoRoutes);
app.use("/api", contratoRoutes);


// Manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        message: "endpoint no encontrado"
    });
});

export default app;

