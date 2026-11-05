import mongoose from 'mongoose';
import { ENV } from './env';

export let isConnectedToMongo = false;

export async function connectDB(): Promise<void> {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(ENV.MONGO_URI, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnectedToMongo = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnectedToMongo = false;
    console.log('[Database] MongoDB connection bypassed (running with in-memory resilient storage)');
  }
}
