import DashboardLayout from "@/components/layout/DashboardLayout"
import { ChartRadialShape } from "@/components/ui/charts/Chart_radial_shape"
import { ChartBarDefault } from "@/components/ui/charts/ChartBarDefault"

const DashboardPage = () => {
  return (
    <DashboardLayout>
    <div className="space-y-6">
      {/* ===== TIÊU ĐỀ ===== */}
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-500 text-sm">Tổng quan hệ thống của bạn</p>
      </div>

      {/* ===== THỐNG KÊ NHANH (CARDS) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Users</p>
          <h3 className="text-2xl font-bold mt-2">1,245</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Orders</p>
          <h3 className="text-2xl font-bold mt-2">320</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h3 className="text-2xl font-bold mt-2">$8,430</h3>
        </div>
      </div>

      {/* ===== NỘI DUNG CHÍNH ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• User John vừa đăng ký</li>
          <li>• Đơn hàng #1024 đã thanh toán</li>
          <li>• User Anna cập nhật hồ sơ</li>
        </ul>
      </div>
      <div className="p-4 max-w-2xl">
        <ChartBarDefault />
        <br></br>
        <ChartRadialShape/>
      </div>
    </div>
    </DashboardLayout>

  )
}

export default DashboardPage
