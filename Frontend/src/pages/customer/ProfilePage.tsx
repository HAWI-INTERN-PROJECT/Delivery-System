import { useNavigate } from 'react-router-dom'
import { ChevronRight, MapPin, ClipboardList, Bell, Settings, LogOut } from 'lucide-react'
import { useAuthStore } from '@/stores/auth'
import { useQueryClient } from '@tanstack/react-query'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const queryClient = useQueryClient()

  const handleLogout = async () => {
    await logout()
    queryClient.clear()
    navigate('/login')
  }

  // Get user initials
  const getInitials = () => {
    if (!user?.name) return 'U'
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-b-[40px] px-6 pt-8 pb-10 shadow-sm border-b border-gray-50 shrink-0">
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
          <button
            onClick={() => navigate('/profile/edit')}
            className="text-xs text-orange-600 font-bold hover:underline"
          >
            Edit
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-4 mt-6">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-xl border-4 border-orange-50 shadow-sm">
            {getInitials()}
          </div>
          <div>
            <h2 className="text-lg font-black text-gray-900 leading-none">{user?.name}</h2>
            <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">{user?.phone}</p>
          </div>
        </div>
      </div>

      {/* Profile Links list */}
      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
        <div className="bg-white rounded-3xl p-2.5 border border-gray-50 space-y-0.5">
          <button
            onClick={() => navigate('/profile/addresses')}
            className="flex items-center gap-3.5 w-full p-3.5 hover:bg-gray-50 rounded-2xl transition-colors group text-left"
          >
            <div className="p-2 bg-pink-50 text-pink-500 rounded-xl group-hover:bg-pink-100 transition-colors">
              <MapPin className="h-4.5 w-4.5" />
            </div>
            <span className="text-xs font-bold text-gray-700 flex-1">My Addresses</span>
            <ChevronRight className="h-4.5 w-4.5 text-gray-300" />
          </button>

          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-3.5 w-full p-3.5 hover:bg-gray-50 rounded-2xl transition-colors group text-left"
          >
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl group-hover:bg-blue-100 transition-colors">
              <ClipboardList className="h-4.5 w-4.5" />
            </div>
            <span className="text-xs font-bold text-gray-700 flex-1">Order History</span>
            <ChevronRight className="h-4.5 w-4.5 text-gray-300" />
          </button>

          <button
            onClick={() => navigate('/profile/notification-settings')}
            className="flex items-center gap-3.5 w-full p-3.5 hover:bg-gray-50 rounded-2xl transition-colors group text-left"
          >
            <div className="p-2 bg-amber-50 text-amber-500 rounded-xl group-hover:bg-amber-100 transition-colors">
              <Bell className="h-4.5 w-4.5" />
            </div>
            <span className="text-xs font-bold text-gray-700 flex-1">Notification Settings</span>
            <ChevronRight className="h-4.5 w-4.5 text-gray-300" />
          </button>

          <button
            onClick={() => navigate('/profile/account-settings')}
            className="flex items-center gap-3.5 w-full p-3.5 hover:bg-gray-50 rounded-2xl transition-colors group text-left"
          >
            <div className="p-2 bg-purple-50 text-purple-500 rounded-xl group-hover:bg-purple-100 transition-colors">
              <Settings className="h-4.5 w-4.5" />
            </div>
            <span className="text-xs font-bold text-gray-700 flex-1">Account Settings</span>
            <ChevronRight className="h-4.5 w-4.5 text-gray-300" />
          </button>

        </div>

        {/* Log Out button */}
        <button
          onClick={handleLogout}
          className="w-full py-4 bg-white hover:bg-red-50 text-red-500 font-bold border border-red-100 rounded-3xl flex items-center justify-center gap-2 transition-colors text-sm"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  )
}
