import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { SEED_USER } from '../seeds/seedData';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, mobile, pan, password } = req.body;
    const investorId = `MV${Math.floor(10000 + Math.random() * 90000)}`;

    const newUser = {
      ...SEED_USER,
      name: name || SEED_USER.name,
      email: email || SEED_USER.email,
      mobile: mobile || SEED_USER.mobile,
      pan: pan || SEED_USER.pan,
      investorId,
    };

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, ENV.JWT_SECRET, {
      expiresIn: '15m',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = jwt.sign({ id: SEED_USER.id, email: SEED_USER.email }, ENV.JWT_SECRET, {
      expiresIn: '15m',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: 'Logged in successfully',
      user: SEED_USER,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  return res.json({ success: true, message: 'Logged out successfully' });
};

export const verifyOtp = async (req: Request, res: Response) => {
  return res.json({ success: true, message: 'OTP verified successfully' });
};
