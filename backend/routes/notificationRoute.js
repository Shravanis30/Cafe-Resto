import express from 'express';
import { getAdminNotifications, markNotificationAsRead } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', getAdminNotifications);
router.patch('/:id/read', markNotificationAsRead);

export default router;
