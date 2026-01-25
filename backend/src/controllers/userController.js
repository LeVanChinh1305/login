// lấy thông tin user hiện tại đang đăng nhập 
export const authMe = async(req,res) =>{
    try {
        const a = req.user; // lấy thông tin user từ req.user
        // req.user lấy từ middleware authMiddleware.js 
        return res.status(200).json({message: a}); // trả thông tin user
    } catch (error) {
        console.error('loi khi goi authme', error);
        return res.status(500).json({message: "loi he thong"});
    }
}
