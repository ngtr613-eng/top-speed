import express from 'express';
import {
  trackVisitor,
  getVisitorStats,
  getAllVisitors,
  deleteOldVisitors,
} from '../controllers/visitorController.js';
import { adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public route to track visitors
router.post('/track', trackVisitor);

// Admin routes
router.get('/admin/stats', adminMiddleware, getVisitorStats);
router.get('/admin/all', adminMiddleware, getAllVisitors);
router.delete('/admin/cleanup', adminMiddleware, deleteOldVisitors);

export default router;
