
import express from 'express';
import { bookTable, getTables, verifyReservation, listReservations , createTable} from '../controllers/reservationController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/tables', getTables);
router.post('/book', authMiddleware, bookTable);
router.post('/verify-reservation', verifyReservation);
router.get('/admin/all', listReservations); // Admin route
router.post('/admin/table/create', createTable); // Admin create table


export default router;
