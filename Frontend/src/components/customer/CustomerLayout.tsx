import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5] pb-16 max-w-md mx-auto relative shadow-xl overflow-x-hidden border-x border-gray-200">
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
