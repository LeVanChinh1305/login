import jwt from 'jsonwebtoken'
import {User} from '../models/User.js'

// protectedRoute là một middleware có nhiệm vụ 
    // xác thực jwt token từ client 
    // tìm user trong database 
    // gắn thông tin user vào req.user
    // cho phép hoặc từ chối request tiếp tục 

export const protectedRoute = async (req, res, next) => {
    try{
        //Bước 1: Lấy access Token từ Authorization Header
        const authHeader = req.headers["authorization"];
            //VD: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWE..."
        const token = authHeader&& authHeader.split(" ")[1];
            //  authHeader: kiểm tra header có tồn tại không
            //  &&: nếu tồn tại thì mới split
            //  .split(" ")[1]: cắt chuỗi theo dấu space, lấy phần thứ 2
            // VD:
            // Input:  "Bearer eyJhbGciOiJIUzI1..."
            // Output: "eyJhbGciOiJIUzI1..."
        if(!token){
            return res.status(401).json({message:"Khong tim thay access token"});
        }

        //Bước 2: Xác Thực Token (Verify JWT)
        let decodedUser;
        try {
            decodedUser = jwt.verify(
                token, 
                process.env.ACCESS_TOKEN_SECRET
            );
            // Nếu thành công, decodedUser sẽ có dạng:
            // {
            //   userId: "507f1f77bcf86cd799439011",
            //   iat: 1609459200,    // Issued At (thời điểm tạo)
            //   exp: 1609461000     // Expiration (hết hạn)
            // }
        } catch (jwtError) {
            // CÁC LỖI CÓ THỂ XẢY RA:
            // - TokenExpiredError: Token đã hết hạn
            // - JsonWebTokenError: Token không hợp lệ (sai format, sai signature)
            // - NotBeforeError: Token chưa được sử dụng (nbf claim)
            return res.status(403).json({
                message: 'Access token khong hop le hoac da het han'
            });
        }
        // BƯỚC 3: Tìm User trong Database
        const user = await User.findById(decodedUser.userId).select('-hashedPassword');
            // GIẢI THÍCH .select('-hashedPassword'):
            // - Dấu trừ (-) có nghĩa là loại trừ field đó
            // - Kết quả: user object có tất cả fields NGOẠI TRỪ hashedPassword
        if(!user){
            return res.status(404).json({message: "nguoi dung khong ton tai"});
        }

        // BƯỚC 4: Gắn User vào Request & Chuyển sang Controller
        req.user = user; // Giờ tất cả controllers sau middleware này có thể dùng req.user
        next();
    }catch(error){
        console.error("loi khi xac minh jwt trong authMiddleware", error);
        return  res.status(500).json({message: "loi he thong"}); 
    }
}