import { Router } from 'express';
import { signup, login, logout, refresh } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);

export default router;
