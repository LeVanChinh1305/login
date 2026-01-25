// kết nối mongodb 
import mongoose from 'mongoose';
export const connectDB = async (mongoURL) => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit (1) ;
    }
};
