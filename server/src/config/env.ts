import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/moneyverse',
  JWT_SECRET: process.env.JWT_SECRET || 'moneyverse_jwt_secret_key_2026_super_secure',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'moneyverse_refresh_secret_key_2026',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};
