import express from 'express';
import { login, register } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema, loginUserSchema } from '../validation/auth.js';

const router = express.Router();
// Маршрут для реєстрації користувача
router.post('/register', validateBody(registerSchema), register);
// Маршрут для логіну користувача
router.post('/login', validateBody(loginUserSchema), login);

export default router;