import { useAuthStore } from "@/store/useAuthStore"

const HomePage = () => {
  const { user } = useAuthStore()

  return (
    <div className="space-y-8 p-6">
      
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.displayName || "User"} 👋
        </h1>
        <p className="text-muted-foreground">
          This is your home overview page.
        </p>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="font-semibold mb-4">Your Account Info</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Username</p>
            <p className="font-medium">{user?.username}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">Feature 1</div>
        <div className="bg-white p-6 rounded-xl shadow">Feature 2</div>
        <div className="bg-white p-6 rounded-xl shadow">Feature 3</div>
      </div>

    </div>
  )
}

export default HomePage
