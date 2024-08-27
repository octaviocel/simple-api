import express from 'express';
import { login, register, logout } from '../controllers/auth';
import isAuth from '../middleware/auth';

const router = express.Router();

router.post('/login',login);
router.post('/register', register);
router.post('/logout', isAuth, logout);

export default router;