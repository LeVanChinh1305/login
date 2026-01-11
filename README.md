

HƯỚNG DẪN CHI TIẾT - 
# BƯỚC 1: THIẾT LẬP DỰ ÁN
## Bước 1.1: Tạo thư mục dự án
Mở Terminal/CMD và gõ:
bashmkdir IoT_Dashboard
cd IoT_Dashboard
Giải thích:

mkdir IoT_Dashboard: Tạo thư mục mới tên là "IoT_Dashboard"
cd IoT_Dashboard: Di chuyển vào thư mục vừa tạo

## Bước 1.2: Khởi tạo project Node.js
npm init -y
Giải thích:

npm init: Khởi tạo một project Node.js
-y: Tự động chấp nhận tất cả các câu hỏi mặc định
Lệnh này sẽ tạo file package.json - file quản lý thông tin và dependencies của project

## Bước 1.3: Cài đặt các thư viện Backend
npm install express mongoose dotenv bcryptjs jsonwebtoken cors socket.io

Giải thích từng thư viện:

+ express: Framework web cho Node.js

Giúp tạo server và xử lý HTTP requests dễ dàng
VD: Xử lý GET, POST, PUT, DELETE


+ mongoose: Thư viện ODM (Object Data Modeling) cho MongoDB

Giúp tương tác với MongoDB dễ dàng hơn
Định nghĩa schema và models


+ dotenv: Quản lý biến môi trường

Đọc file .env và load các biến vào process.env
Bảo mật thông tin nhạy cảm (password, API keys)


+ bcryptjs: Mã hóa password

Hash password trước khi lưu vào database
So sánh password khi đăng nhập


+ jsonwebtoken: Tạo và xác thực JWT tokens

Dùng để authentication (xác thực người dùng)
Token được gửi kèm mỗi request để xác minh


+ cors: Cross-Origin Resource Sharing

Cho phép Frontend (port 3000) gọi API Backend (port 5000)


+ socket.io: WebSocket library

Giao tiếp real-time giữa server và client
Dữ liệu sensor được push ngay lập tức

Cài thêm nodemon cho development:
bashnpm install --save-dev nodemon
Giải thích:

nodemon: Tự động restart server khi code thay đổi
--save-dev: Chỉ dùng trong môi trường development

# BƯỚC 2: TẠO CẤU TRÚC THỨ MỤC

## Bước 2.1: Tạo các thư mục
mkdir config controllers middleware models routes utils scripts


**Giải thích cấu trúc:**
```
IoT_Dashboard/
├── config/         # Cấu hình (database, constants)
├── controllers/    # Logic xử lý business (login, sensor data)
├── middleware/     # Các hàm chạy giữa request và response
├── models/         # Định nghĩa schema database
├── routes/         # Định nghĩa API endpoints
├── utils/          # Các hàm tiện ích
├── scripts/        # Scripts hỗ trợ (tạo admin, seed data)
└── server.js       # File khởi chạy server
```

# BƯỚC 3: TẠO FILE CẤU HÌNH MÔI TRƯỜNG
## Bước 3.1: Tạo file .env
Tạo file .env trong thư mục gốc:
### Port cho server
PORT=5000

### MongoDB connection string
MONGO_URI= 

### Secret key để tạo JWT token
JWT_SECRET=my_super_secret_key_change_this_in_production
    + key bí mật để mã hóa JWT token
    + nên thay đổi khi deploy production 

### Môi trường
NODE_ENV=development
    + xác định môi trường : development hoặc production 
# BƯỚC 4: TẠO FILE KẾT NỐI DATABASE
## Bước 4.1: Tạo file config/db.js
 + Import thư viện mongoose để tương tác với MongoDB
 + Tạo function connectDB với async/await -> Function này sẽ được gọi khi khởi động server
 + Export function để dùng ở file khác

# BƯỚC 5: TẠO MODELS (SCHEMA DATABASE)
## Bước 5. : tạo User Model 
+ import thư viện mongoose 
+ định nghãi schema cho user 
+ export model 
+ cấu trúc của 1 Schema field 
fieldName: {
  type: String,      // Kiểu dữ liệu (String, Number, Date, Boolean, Array, Object)
  required: true,    // Bắt buộc (true/false)
  unique: true,      // Giá trị duy nhất trong collection
  default: 'value',  // Giá trị mặc định
  trim: true,        // Xóa khoảng trắng thừa
  lowercase: true,   // Chuyển thành chữ thường
  enum: ['a', 'b']   // Chỉ chấp nhận các giá trị trong mảng
}


## Bước 5.2: Tạo SensorData Model
tương tự 5.1 

# BƯỚC 6: TẠO MIDDLEWARE XÁC THỰC 
## Bước 6.1:  tạo Authentication Middleware

File: middleware/auth.js
+ import thư viện jsonwebtoken để xử lý JWT
+ thêm các hàm sử lý 
+ Xuất các middleware để sử dụng trong các phần khác của ứng dụng : module.export = {}; 
# Bước 7: TẠO CONTROLLERS
Controllers chứa logic xử lý business của ứng dụng. Mỗi function trong controller xử lý một tác vụ cụ thể.
## Bước 7.1: Tạo Auth Controller
## Bước 7.2: Tạo Sensor Controller

# Bước 8 : tạo ROUTES 
## Bước 7.1: Tạo Auth routes
## Bước 7.2: Tạo Sensor routes 

# BƯỚC 9: TẠO SERVER CHÍNH VỚI WEBSOCKET


# Bước 10: THIẾT LẬP DỰ ÁN REACT Frontend 
## Bước 12.1: Tạo React App

npx create-react-app frontend : tạo frontend với cấu trúc react 
+ giải thích : 
  - npx: chạy pagekage mà không cần cài global 
  - create-react-app: tool tạo react project
  - frontend: tên thư mục cho frontend 

## Bước 12.2: Cài đặt dependencies cho Frontend
npm install axios socket.io-client react-router-dom chart.js react-chartjs-2 @fortawesome/fontawesome-free

trong đó : 
+ axios: HTTP client để gọi API
+ socket.io-client: WebSocket client
+ react-router-dom: Điều hướng giữa các trang
+ chart.js + react-chartjs-2: Vẽ biểu đồ
+ @fortawesome/fontawesome-free: Icons

## Bước 12.3: Cấu hình Proxy
  "proxy": "http://localhost:5001",
giải thích
  + không có pproxy: phải viết URL đầy đủ 
    axios.post('http://localhost:5000/api/auth/login', data)
  + có proxy : Chỉ cần path
    axios.post('/api/auth/login', data)

# BƯỚC 13: TẠO CẤU TRÚC THƯ MỤC FRONTEND
## Bước 13.1: Tạo cấu trúc
cd src
mkdir components pages services utils contexts
trong đó 
  + components : các component tái sử dụng 
  + pages : các trang 
  + services : API calls 
  + utils : utility functions , các chức năng tiện ích 
  + contexts : react context , 
### Luồng đăng nhập 
```
1. User nhập username + password
   ↓
2. Frontend gửi đến Backend API
   ↓
3. Backend kiểm tra username/password
   ↓
4. Nếu đúng: Tạo JWT token và trả về
   ↓
5. Frontend lưu token vào localStorage
   ↓
6. Frontend chuyển user đến Dashboard
```
### luồng đăng xuất 
```
1. User click nút Logout
   ↓
2. Frontend xóa token khỏi localStorage
   ↓
3. Frontend chuyển user về trang Login
```
# BƯỚC 14 : TẠO SERVICES (API CALLS)
## Bước 14.1: Tạo Auth Service
File: frontend/src/services/authService.js
lý thuyết : 
+ localStrorage : 
  - lưu trữ trên browser 
  - không bị mất khi reload trang 
  - chỉ lưu được string 
  -> nếu muốn lưu object 
  ```
  localStorage.setItem('a', JSON.stringify(a)); 
  ```

  -> nếu muốn lấy 
  ```
  const b = localStorage.getItem('a'); 
  const a = JSON.parse(b); 
  ```
+ Axios response structure : 
Axios là một thư viện HTTP Client dựa trên Promise, được sử dụng để gửi các yêu cầu (requests) từ trình duyệt hoặc Node.js đến các máy chủ (Server) nhằm mục đích lấy hoặc gửi dữ liệu.
```
const res = await axios.post(url, data);
return response.data 
```
+ !! operator:
  !: NOT operator
  !!: Double NOT = chuyển về boolean
  ```
    !!null        // false
    !!undefined   // false
    !!''          // false
    !!'abc'       // true
    !!0           // false
    !!1           // true
  ```
## Bước 14.2: Tạo Sensor Service

File: frontend/src/services/sensorService.js

# BƯỚC 15: TẠO AUTH CONTEXT (GLOBAL STATE)
File: frontend/src/contexts/AuthContext.js

