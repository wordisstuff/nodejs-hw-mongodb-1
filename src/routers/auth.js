import express from 'express';
import { register } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema } from '../schemas/auth.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

export default router;