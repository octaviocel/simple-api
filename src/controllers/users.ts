import { Request, Response } from 'express';
import User from '../models/users';

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' });
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' });
    }
}

export { getUsers, updateUser, deleteUser };