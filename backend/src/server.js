import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/auth.js';

import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';
import modificationRoutes from './routes/modificationRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import configuratorRoutes from './routes/configuratorRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

dotenv.config();

const app = express();

// Global database connection status
let dbConnected = false;

// 1. CORS
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 2. ✅ الـ Health Check (نقلناها هنا عشان ترد فوراً قبل أي تعليقة داتا بيز)
app.get('/', (req, res) => {
  res.json({ status: 'Success', message: 'Top Speed API is Live!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', db: dbConnected ? 'connected' : 'connecting' });
});

// 3. 🔥 Middleware للتحقق من اتصال قاعدة البيانات (بدون انتظار اتصال جديد)
app.use(async (req, res, next) => {
  // Skip database check for health endpoints
  if (req.path === '/' || req.path === '/api/health') {
    return next();
  }
  
  try {
    // Only connect if not already connected
    if (!dbConnected) {
      await connectDB();
      dbConnected = true;
      console.log('Database connected successfully');
    }
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    // Still proceed but log the error - don't block requests
    next();
  }
});

// 4. Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/modifications', modificationRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/configurator', configuratorRoutes);
app.use('/api/service', serviceRoutes);

app.use(errorHandler);

export default app;