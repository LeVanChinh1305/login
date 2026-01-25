import { Outlet, NavLink } from "react-router"
import Logout from "@/components/auth/Logout.tsx"

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* ===== HEADER ===== */}
      <header className="h-14 border-b flex items-center justify-between px-6 bg-green-150 shadow-sm">
        <h2 className="font-bold text-emerald-400 text-4xl">My App</h2>
        <Logout />
      </header>

      {/* ===== BODY ===== */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* ===== SIDEBAR ===== */}
        <aside className="w-56 border-r p-4 bg-gray-50">
          <nav className="flex flex-col gap-2 text-sm">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `p-2 rounded hover:bg-green-100 ${
                  isActive ? "bg-green-300 text-white" : ""
                }`
              }
            >
              Home
            </NavLink>
            
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `p-2 rounded hover:bg-green-100 ${
                  isActive ? "bg-green-300 text-white" : ""
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `p-2 rounded hover:bg-green-100 ${
                  isActive ? "bg-green-300 text-white" : ""
                }`
              }
            >
              Profile
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `p-2 rounded hover:bg-green-100 ${
                  isActive ? "bg-green-300 text-white" : ""
                }`
              }
            >
              Settings
            </NavLink>

          </nav>
        </aside>

        {/* ===== CONTENT (các trang sẽ hiện ở đây) ===== */}
        <main className="flex-1  overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
