import express from 'express';
import {
    createFacturacion,
    getFacturaciones,
    getFacturacionById,
    updateFacturacion,
    deleteFacturacion
} from "../controllers/facturacion.controller.js";

const router = express.Router();

router.post('/facturaciones', createFacturacion);
router.get('/facturaciones', getFacturaciones);
router.get('/facturaciones/:id', getFacturacionById);
router.put('/facturaciones/:id', updateFacturacion);
router.delete('/facturaciones/:id', deleteFacturacion);

export default router;