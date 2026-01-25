import express from 'express'
import { authMe } from '../controllers/userController.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/me', protectedRoute, authMe ); 
//     ↑    ↑     ↑               ↑
//     │    │     │               └─ Controller (cuối cùng)
//     │    │     └─ Middleware (chạy trước)
//     │    └─ Path endpoint
//     └─ HTTP Method

export default router; 

/*
HTTP Method: GET
Path: /me
    Đường dẫn đầy đủ: http://localhost:5000/api/users/me
Middleware: protectedRoute
    Chạy trước controller
    Verify JWT token
    Gắn req.user
Controller: authMe
    Chạy sau middleware
    Sử dụng req.user để trả về thông tin
*/