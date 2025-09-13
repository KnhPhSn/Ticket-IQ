import { Router } from 'express';
import { getOnlineUsers, getUsers, updateUser } from '../controllers/usersController';
import authorize from '../middleware/authorize';

const router = Router();

router.get('/', authorize(['admin']), getUsers);
router.get('/online', authorize(['admin']), getOnlineUsers);
router.patch('/update', authorize(['admin']), updateUser);

export default router;
