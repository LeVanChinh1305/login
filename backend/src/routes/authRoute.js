import express from 'express';
import { signIn, signUp } from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', signUp);  // đăng ký 

router.post('/signin', signIn); // đăng nhập 

export default router;