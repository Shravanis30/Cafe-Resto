import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrders, placeOrder,updateStatus,userOrders, verifyOrder, placeOrderCod, verifyOrderGet } from '../controllers/orderController.js';
import { authenticateUser } from '../middleware/auth.js';

const orderRouter = express.Router();

// orderRouter.get("/list",listOrders);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.post("/place",authMiddleware,placeOrder);
// orderRouter.post("/status",updateStatus);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/placecod",authMiddleware,placeOrderCod);
orderRouter.get("/verify", verifyOrderGet);

orderRouter.get('/list', authenticateUser, listOrders);
orderRouter.post('/status', authenticateUser, updateStatus);

export default orderRouter;