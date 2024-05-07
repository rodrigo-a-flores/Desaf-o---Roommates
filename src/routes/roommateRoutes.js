import express from 'express';
import { getRoommates, addRoommate, recalcularGastos } from '../controllers/roommateController.js';
const router = express.Router();

router.get('/', getRoommates);
router.post('/', addRoommate);
router.put('/', recalcularGastos);

export default router;