import express from 'express';
import isAuth from '../middleware/auth';
import { getUsers, updateUser, deleteUser } from '../controllers/users';

const router = express.Router();

router.get('/', isAuth, getUsers);
router.put('/:id', isAuth, updateUser);
router.delete('/:id', isAuth, deleteUser);

export default router;