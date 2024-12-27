import express, { Router } from 'express'
import { login, signUp } from '../controllers/auth.controller';

const router:Router = express.Router();

 router.post('/signup', signUp);
 router.post('/login', login);

export default router;