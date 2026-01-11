import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    refreshToken:{
        unique: true
    },
    expireAt:{
        type: Date,
        required: true
    } 
},{
    timestamps: true, 
})

// tu dong xoa khi het han 
sessionSchema.index({expiresAt:1}, {})