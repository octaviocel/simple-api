import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies._token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export default isAuth;