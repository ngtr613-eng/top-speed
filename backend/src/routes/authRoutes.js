import express from 'express';
import { login, createAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', createAdmin);

export default router;
