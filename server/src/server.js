import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import { connectDB } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env, root .env, or process env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[Free Book Store Server] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`[Free Book Store Server] Health check available at: http://localhost:${PORT}/api/health`);
  });
};

startServer();
