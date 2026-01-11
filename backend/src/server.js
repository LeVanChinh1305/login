import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { connectDB } from './libs/db.js';
import authRoute from './routes/authRoute.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001; 

// middleware
app.use(express.json()); // 

// public routes
app.use('/api/auth', authRoute);
// private routes

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
}); 