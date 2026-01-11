import bcrypt from 'bcrypt'
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken'
import Session from '../models/Session.js';
const ACCESS_TOKEN_TTL = '30m'; 
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;  // 14 ngay  



export const signUp = async(req, res) => {
    // Sign-up logic here
    try {
        // lay thong tin tu body 
        const {username, password, email, displayName} = req.body; 

        // kiem tra day du thong tin khong 
        if(!username || !password || !email) {
            return res.status(400).json({message: "khong duoc thieu thong tin"}); 
        }
        // kiem tra username da ton tai chua 
        const userA = await User.findOne({username}); 
        if(userA){ // neu ton tai roi 
            return res.status(409).json({message: "username da ton tai"}); 
        }
        // ma hoa password 
        const hashedPassword = await bcrypt.hash(password, 10); 
        
        // tao user moi 
        await User.create({
            username,
            hashedPassword,
            email,
            displayName
        })
        // return 
        return res.sendStatus(204); 
    } catch (error) {
        console.error('loi khi goi signUp', error);
        return res.status(500).json({message: "loi he thong"});
    }
}

export const signIn = async(req, res) => {
    try{
        // lấy inputs 
        const {email, password} = req.body; 
        if(!email || !password) {
            return res.status(401).json({message: " thieu mk hoac email"});
        };
        // lấy hashedpassword trong db để so với password input
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "email hoac mk khong chinh xac"});
        }
        // kieemr tra password 
        const passCorrect = await bcrypt.compare(password, user.hashPassword); 

        if(!passCorrect){
            return res.status(401).json({message: "user hoac pass khong chính xác "})
        };

        // nếu khớp, tạo accessToken với JWT 
        const accessToken = jwt.sign({usetId: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_TTL} ); 
        
        // tạo refresh token 
        const refreshToken = crypto.randomBytes(64).toString("hex");
        // tạo session mới để lưu trong refresh token 
        await Session.create({
            userId: user_id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
        }); 
        // trả reresh token về client thông qua cookie 
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'nonw',
            maxAge: REFRESH_TOKEN_TTL,
        }); 

        // trả access token trong res 
        return res.status(200).json({message:`User ${user.displayName} ddax log in`}, accessToken)
    }catch(error){
        console.error("Loi khi goi signIn", error); 
        return res.status(500).json({message: "loi he thong"});
    }
};
 