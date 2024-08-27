import User from './../models/users';
import e, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hash,
            username
        });

        await newUser.save();

        const token = jwt.sign({ email, username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.cookie('_token', token, { httpOnly: true });
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email, username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.cookie('_token', token, { httpOnly: true });
        res.status(200).send({ message: 'User logged in successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' });
    }
}

const logout = (_req: Request, res: Response) => {
    res.clearCookie('_token');
    res.status(200).send({ message: 'User logged out successfully' });
}

export { register, login, logout };