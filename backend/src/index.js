import app from './server.js';
import { connectDB } from './config/database.js';

const PORT = process.env.BACKEND_PORT || 5000;

// For local development
if (process.env.NODE_ENV !== 'production') {
  // Initialize database connection on startup for local
  async function startServer() {
    try {
      console.log('🚀 Starting TOP SPEED Backend...');
      
      // Connect to MongoDB before starting the server
      await connectDB();
      console.log('✅ Database initialized at startup');
      
      // Start the Express server
      app.listen(PORT, () => {
        console.log(`✅ Backend server running on port ${PORT}`);
        console.log(`🌍 Health check: http://localhost:${PORT}/api/health`);
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error.message);
      // Try to start server anyway for health checks
      app.listen(PORT, () => {
        console.log(`⚠️  Backend running on port ${PORT} (database connection pending)`);
      });
    }
  }

  startServer();
}

// For Vercel serverless
export default app;
