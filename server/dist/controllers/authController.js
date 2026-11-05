"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.logout = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const seedData_1 = require("../seeds/seedData");
const register = async (req, res) => {
    try {
        const { name, email, mobile, pan, password } = req.body;
        const investorId = `MV${Math.floor(10000 + Math.random() * 90000)}`;
        const newUser = {
            ...seedData_1.SEED_USER,
            name: name || seedData_1.SEED_USER.name,
            email: email || seedData_1.SEED_USER.email,
            mobile: mobile || seedData_1.SEED_USER.mobile,
            pan: pan || seedData_1.SEED_USER.pan,
            investorId,
        };
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, env_1.ENV.JWT_SECRET, {
            expiresIn: '15m',
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: env_1.ENV.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000,
        });
        return res.status(201).json({
            success: true,
            message: 'Account created successfully',
            user: newUser,
            token,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error during registration' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = jsonwebtoken_1.default.sign({ id: seedData_1.SEED_USER.id, email: seedData_1.SEED_USER.email }, env_1.ENV.JWT_SECRET, {
            expiresIn: '15m',
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: env_1.ENV.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000,
        });
        return res.json({
            success: true,
            message: 'Logged in successfully',
            user: seedData_1.SEED_USER,
            token,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error during login' });
    }
};
exports.login = login;
const logout = async (req, res) => {
    res.clearCookie('token');
    return res.json({ success: true, message: 'Logged out successfully' });
};
exports.logout = logout;
const verifyOtp = async (req, res) => {
    return res.json({ success: true, message: 'OTP verified successfully' });
};
exports.verifyOtp = verifyOtp;
