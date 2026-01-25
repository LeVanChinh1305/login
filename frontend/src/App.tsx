// bộ định tuyến routing chính của app react - nó quyết định URL mở trang nào và trang nào cần đăng nhập mới vào được 
import {BrowserRouter, Navigate, Route, Routes} from 'react-router'
import SignInPage from './pages/SignInPage'
import {Toaster} from 'sonner'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import MainLayout from './components/layout/MainLayout'
import DashboardPage from './pages/DashboardPage.tsx'
function App() {
  return <>
    
    <BrowserRouter>{/*bật chế độ spa routing dùng url bình thường(không reload trang)-> mọi điều hướng trong app sẽ chạy qua đây*/}
      <Toaster/>{/* hiển thị thông báo nối -> đặt đây để toàn app dùng được */}
      <Routes> {/*  chứa tất cả đường dẫn */}
        {/* public routes : khong can xac thuc */}
        <Route
          path='/signin'
          element={<SignInPage></SignInPage>}
        />
        <Route
          path='/signup'
          element={<SignUpPage></SignUpPage>}
        />
        {/* Khi vào "/" sẽ tự nhảy tới /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* private routes: can xac thuc moi vao duoc */}
        <Route element = {<ProtectedRoute/>}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<div>Profile page</div>} />
            <Route path="/settings" element={<div>Settings page</div>} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  
  
  </>
}

export default App
