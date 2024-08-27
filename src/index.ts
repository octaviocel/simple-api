import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

dotenv.config();



function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URI!, {

        })
            .then(() => {
                console.log('Connected to the database');
            });
    } catch (error) {
        console.log(error);
    }
}


function makeApp() {
    connectDB();

    const app = express();
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World');
    });
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);

    app.listen(+process.env.PORT!, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}

makeApp();