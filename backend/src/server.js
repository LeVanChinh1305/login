import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { connectDB } from './libs/db.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser'; 
import { authMe } from './controllers/userController.js';
import { protectedRoute } from './middlewares/authMiddleware.js';
import cors from "cors"

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001; 

// middleware
app.use(express.json()); // 
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))

// public routes
app.use('/api/auth', authRoute);
// private routes
app.use(protectedRoute) ;
app.use('/api/user', authMe);


connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
}); 