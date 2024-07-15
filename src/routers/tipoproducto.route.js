import express from 'express';
import {
    getTiposProductos,
    getTipoProductoById,
    createTipoProducto,
    updateTipoProducto,
    deleteTipoProducto
} from '../controllers/tipoproducto.Controller.js';

const router = express.Router();

router.get('/tipoproductos', getTiposProductos);
router.get('/tipoproductos/:id', getTipoProductoById);
router.post('/tipoproductos', createTipoProducto);
router.put('/tipoproductos/:id', updateTipoProducto);
router.delete('/tipoproductos/:id', deleteTipoProducto);

export default router;