import express from 'express';
import {
    createContrato,
    getContratos,
    getContratoById,
    updateContrato,
    deleteContrato
} from "../controllers/contrato.controller.js";

const router = express.Router();

router.post('/contratos', createContrato);
router.get('/contratos', getContratos);
router.get('/contratos/:id', getContratoById);
router.put('/contratos/:id', updateContrato);
router.delete('/contratos/:id', deleteContrato);

export default router;
