import { randomBytes } from 'crypto';
// crypto.randomBytes: Tạo chuỗi ngẫu nhiên (dùng cho refresh token)
import bcrypt from 'bcrypt';  
// Hash và compare password
import { User } from '../models/User.js';
// Model MongoDB cho User
import jwt from 'jsonwebtoken'
// Tạo và verify JWT access token
import Session from '../models/Session.js';
// Model MongoDB cho Session (lưu refresh token)
const ACCESS_TOKEN_TTL = '30m';  // Access token sống 30 phút
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;  // Refresh token sống 14 ngày (ms) 

export const signUp = async(req, res) => {
    // Sign-up logic here
    try {
        // lay thong tin tu body 
        const {username, email, password, displayName} = req.body;
        // kiem tra day du thong tin khong 
        if(!username || !email || !password || !displayName){
            return res.status(400).json({message: "Thiếu thông tin đăng ký ! vui lòng nhập đủ"});
        }
        // kiem tra username da ton tai chua 
        const userA = await User.findOne({email});
        if(userA){
            return res.status(409).json({message: "Tài khoản đã tồn tại"});
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
        // lấy thông tin đăng nhập từ body
        const {email, password} = req.body
        // validate 
        if(!email || !password){
            return res.status(400).json({message: "Chưa nhập đủ thông tin"});
        }
        // tìm tk theo email 
        const userA = await  User.findOne({email});
        if(!userA) {
            return res.status(401).json({message: "Thông tin xác thực không hợp lệ"});
        }
        // kiểm tra password
        const checkPassword = await bcrypt.compare(password, userA.hashedPassword);
        if(!checkPassword){
            return res.status(401).json({message: "Thông tin đăng nhập không chính xác"})
        }
        // tạo access token (jwt)
        const accessToken = jwt.sign(
            {userId : userA._id}, // payload: thông tin muốn lưu
            // không được chứa passqowd, email, dữ liệu nhạy cảm 
            process.env.ACCESS_TOKEN_SECRET, // secret key để mã hoá
            {expiresIn: ACCESS_TOKEN_TTL} // thời gian hết hạn: 
        )
        // tạo refresh token (chuỗi random 64 bytes)
        const refreshToken = randomBytes(64).toString("hex");
        // lưu session vào database 
        await Session.create({
            userId: userA._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL), 
        })
        // gửi refresh token quan cookie 
        res.cookie(
            'refreshToken', 
            refreshToken, 
            {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_TTL, 
            }
        ); 
        // trả access token trong response body 
        return res.status(200).json({
            message:`${userA.displayName} đã login thành công`,
            accessToken // client sẽ lưu token này vào localStorage
        })

    }catch(error){
        console.error("Loi khi goi signIn", error); 
        return res.status(500).json({message: "loi he thong"});
    }
};
 
export const signOut = async(req,res) =>{
    try{
        // lấy refresh token từ cookie 
        const tokenA = req.cookies?.refreshToken;
        if(tokenA){
            // xoá session trong database  
            await Session.deleteOne({refreshToken: tokenA})
            // xoá cookie
            res.clearCookie("refreshToken");
        }

        // trả response thành công 
        return res.sendStatus(204); 

    }catch(error){
        console.error("lỗi khi gọi signout", error);
        return res.status(500).json({message: "lỗi hệ thống"}); 
    }
}

/*
 + authController.js 
    - file này xử lý 3 chức năng authentication chính 
      - signUp: đăng ký tài khoản 
      - signIn: đăng nhập 
      - signOut: đăng xuất
*/