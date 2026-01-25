import Sidebar from "./Sidebar"

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 px-8 py-6 overflow-y-auto">
            {children}
        </main>
    </div>
  )
}
