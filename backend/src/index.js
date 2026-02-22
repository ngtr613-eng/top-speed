import app from './server.js';
import { connectDB } from './config/database.js';

const PORT = process.env.BACKEND_PORT || 5000;

// Initialize database connection on startup
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

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});
