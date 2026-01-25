import { Home, Cpu, Users, Settings } from "lucide-react"
import { NavLink } from "react-router-dom"

const menu = [
  { name: "Esp32-C6", icon: Home, path: "/Esp32-c6" },
  { name: "Esp8266", icon: Cpu, path: "/Esp8266" },
  { name: "Arduino", icon: Users, path: "/Arduino" },
  { name: "Esp32-s3", icon: Settings, path: "/Esp32-s3" },
]

export default function Sidebar() {
  return (
    <div className="h-screen w-60 border-r shadow-sm p-4">
      <h1 className="text-xl font-bold mb-8">IoT Devices</h1>

      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
