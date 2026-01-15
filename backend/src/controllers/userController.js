export const authMe = async(req,res) =>{
    try {
        const a = req.user;
         
        return res.status(200).json({message: a});
    } catch (error) {
        console.error('loi khi goi authme', error);
        return res.status(500).json({message: "loi he thong"});
    }
}