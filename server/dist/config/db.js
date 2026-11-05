"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConnectedToMongo = void 0;
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
exports.isConnectedToMongo = false;
async function connectDB() {
    try {
        mongoose_1.default.set('strictQuery', false);
        const conn = await mongoose_1.default.connect(env_1.ENV.MONGO_URI, {
            serverSelectionTimeoutMS: 2000,
        });
        exports.isConnectedToMongo = true;
        console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        exports.isConnectedToMongo = false;
        console.log('[Database] MongoDB connection bypassed (running with in-memory resilient storage)');
    }
}
