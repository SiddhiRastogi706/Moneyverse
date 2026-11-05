import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { connectDB } from './config/db';
import { ENV } from './config/env';
import { apiRouter } from './routes/apiRoutes';

const app = express();

// Security & Parsing Middleware
app.use(helmet({ contentSecurityPolicy: false })); // allow swagger cdn
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'MoneyVerseAI.com Backend',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', apiRouter);

// Serve Static Frontend Assets (Production Full-Stack Unified Mode)
const possibleDistPaths = [
  path.resolve(__dirname, '../../client/dist'),
  path.resolve(__dirname, '../client/dist'),
  path.resolve(process.cwd(), 'client/dist'),
  path.resolve(process.cwd(), 'dist'),
];
const clientDistPath = possibleDistPaths.find((p) => fs.existsSync(p));

if (clientDistPath) {
  app.use(express.static(clientDistPath));
  console.log(`[Frontend] Serving static client build from: ${clientDistPath}`);

  // React Router SPA Catch-all
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Start Server
async function startServer() {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`[MoneyVerse Server] Running on http://localhost:${ENV.PORT}`);
    console.log(`[OpenAPI Docs] Available at http://localhost:${ENV.PORT}/api/docs`);
  });
}

startServer();
