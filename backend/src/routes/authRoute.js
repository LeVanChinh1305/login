import express from 'express';
import { signIn, signOut, signUp } from '../controllers/authController.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/signup', signUp);  // đăng ký 

router.post('/signin', signIn); // đăng nhập 

router.post('/signout', signOut); // đăng xuất 
export default router;
