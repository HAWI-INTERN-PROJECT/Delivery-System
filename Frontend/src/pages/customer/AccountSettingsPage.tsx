import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Lock, Bell } from 'lucide-react'

export default function AccountSettingsPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-6">
      {/* Top Header */}
      <header className="px-6 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Account Settings</h1>
        </div>
      </header>

      {/* Main Settings List */}
      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
        <div className="bg-white rounded-3xl p-2.5 border border-gray-50 space-y-0.5 shadow-sm">
          {/* Change Password */}
          <button
            onClick={() => navigate('/profile/account-settings/change-password')}
            className="flex items-center gap-3.5 w-full p-4 hover:bg-gray-50 rounded-2xl transition-colors group text-left"
          >
            <div className="p-2 bg-pink-50 text-pink-500 rounded-xl group-hover:bg-pink-100 transition-colors">
              <Lock className="h-4.5 w-4.5" />
            </div>
            <span className="text-xs font-bold text-gray-700 flex-1">Change Password</span>
            <ChevronRight className="h-4.5 w-4.5 text-gray-300" />
          </button>

          {/* Notification Preferences */}
          <button
            onClick={() => navigate('/profile/notification-settings')}
            className="flex items-center gap-3.5 w-full p-4 hover:bg-gray-50 rounded-2xl transition-colors group text-left"
          >
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl group-hover:bg-blue-100 transition-colors">
              <Bell className="h-4.5 w-4.5" />
            </div>
            <span className="text-xs font-bold text-gray-700 flex-1">Notification Preferences</span>
            <ChevronRight className="h-4.5 w-4.5 text-gray-300" />
          </button>

        </div>
      </div>
    </div>
  )
}
