import axios from "axios"
// import thư viện axios để gửi HTTP request (GET,POST,PUT,DELETE) từ frontend lên backend

const api = axios.create({
    baseURL:
        import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
        // khi dev : frontend (vite chạy port 5173) sẽ gọi backend ở port 5001
        // khi deploy: frontend và backend chung domain -> chỉ cần /api
    withCredentials: true,
    // cho phép trình duyệt gửi cookia lên server
});
export default api;
// tạo 1 cấu hình Axios dùng chung 
// tự đổi API URL theo môi trường 
// hỗ trợ login bằng cookia 