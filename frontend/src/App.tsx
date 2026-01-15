import {BrowserRouter, Route, Routes} from 'react-router'
import SignInPage from './pages/SignInPage'
import {Toaster} from 'sonner'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/auth/ProtectedRoute'
function App() {
  return <>
    
    <BrowserRouter>
      <Toaster/>
      <Routes>
        {/* public routes : khong can xac thuc */}
        <Route
          path='/signin'
          element={<SignInPage></SignInPage>}
        />
        <Route
          path='/signup'
          element={<SignUpPage></SignUpPage>}
        />

        {/* private routes: can xac thuc moi vao duoc */}
        <Route element = {<ProtectedRoute/>}>
          <Route
            path='/'
            element={<HomePage/>}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  
  
  </>
}

export default App
