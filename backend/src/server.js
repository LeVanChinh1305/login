import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './libs/db.js';
import cookieParser from 'cookie-parser'; 
import { authMe } from './controllers/userController.js';
import { protectedRoute } from './middlewares/authMiddleware.js';
import cors from "cors";
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';



dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001; 

// middleware
app.use(express.json()); // 
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true})) // cho phép frontend gọi API

// public routes
app.use('/api/auth', authRoute);

// private routes
app.use(protectedRoute) ;
app.use('/api/user', userRoute);



connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
}); 