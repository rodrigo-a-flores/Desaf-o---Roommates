import express from 'express';
import { getGastos, addGasto, updateGasto, deleteGasto } from '../controllers/gastoController.js';

const router = express.Router();

router.get('/', getGastos);
router.post('/', addGasto);
router.put('/', updateGasto);
router.delete('/', deleteGasto);

export default router;